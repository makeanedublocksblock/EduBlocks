/// <reference path="../node_modules/@types/lodash/index.d.ts" />
"use strict";
function edublocks() {
    var Blockly = self.Blockly;
    var getIo = self.getIo;
    var ace = self.ace;
    var Terminal = self.Terminal;
    var termContainer = getElementByIdSafe('term');
    var blockly = getElementByIdSafe('blockly');
    var python = getElementByIdSafe('python');
    var workspace = initBlockly();
    var term = initTerminal();
    var ws = initWebsocket();
    var editor = initEditor();
    window.addEventListener('resize', onresize);
    window.addEventListener('resize', resizeTerminal);
    document.addEventListener('keydown', onkeypress);
    var terminalOpen = false;
    function getElementByIdSafe(id) {
        var element = document.getElementById(id);
        if (!element)
            throw new Error("Could not find element with \"" + id + "\"");
        return element;
    }
    function initBlockly() {
        var workspace = Blockly.inject(blockly, {
            media: 'blockly/media/',
            toolbox: getElementByIdSafe('toolbox'),
        });
        Blockly.svgResize(workspace);
        return workspace;
    }
    function changeTab(mode) {
        if (mode === 'blockly') {
            if (blockly)
                blockly.style.display = 'block';
            if (python)
                python.style.display = 'none';
        }
        if (mode === 'python') {
            if (blockly)
                blockly.style.display = 'none';
            if (python)
                python.style.display = 'block';
        }
    }
    function showPython() {
        var code = Blockly.Python.workspaceToCode();
        editor.setValue(code);
        changeTab('python');
    }
    function downloadPython() {
        var code = Blockly.Python.workspaceToCode();
        var io = getIo();
        io.saveFile(code, 'py', 'Python Script');
    }
    function onresize() {
        Blockly.svgResize(workspace);
    }
    function onkeypress(e) {
        if (e.keyCode === 27) {
            // ws.send(String.fromCharCode(3));
            toggleTerminal();
        }
    }
    function calculateSize() {
        var cols = Math.max(80, Math.min(300, termContainer.clientWidth / 6.7)) | 0;
        var rows = Math.max(10, Math.min(80, termContainer.clientHeight / 20.5)) | 0;
        return [cols, rows];
    }
    function resizeTerminal() {
        var _a = calculateSize(), x = _a[0], y = _a[1];
        term.resize(x, y);
    }
    function initTerminal() {
        var size = calculateSize();
        var term = new Terminal({
            cols: size[0],
            rows: size[1],
            useStyle: true,
            screenKeys: true,
            cursorBlink: false,
        });
        term.open(termContainer);
        term.on('data', function (data) {
            if (data.charCodeAt(0) === 27) {
                toggleTerminal(false);
            }
        });
        return term;
    }
    function initWebsocket() {
        console.log('Opening Websocket');
        var ws = micropythonWs(term);
        ws.connect("ws://" + getHost());
        return ws;
    }
    function initEditor() {
        var editor = ace.edit('editor');
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/python');
        var warningShown = false;
        editor.on('change', function () {
            if (!warningShown) {
                alert('Warning, return to block view will overwrite your changes');
                warningShown = true;
            }
        });
        return editor;
    }
    function toggleTerminal(show) {
        if (show === void 0) { show = !terminalOpen; }
        var terminal = getElementByIdSafe('terminal-dialog');
        terminal.style.display = show ? 'block' : 'none';
        terminalOpen = show;
        if (show)
            resizeTerminal();
    }
    function openCode() {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.xml';
        fileInput.addEventListener('change', readSingleFile, false);
        fileInput.click();
        function readSingleFile(e) {
            var file = e.target.files[0];
            if (!file)
                return;
            var reader = new FileReader();
            reader.onload = function (e) {
                var contents = e.target.result;
                gotContents(contents);
            };
            reader.readAsText(file);
        }
        function gotContents(text) {
            var textToDom = Blockly.Xml.textToDom(text);
            Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, textToDom);
        }
    }
    function saveCode() {
        var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        var text = Blockly.Xml.domToPrettyText(xml);
        var io = getIo();
        io.saveFile(text, 'xml', 'EduBlocks XML');
    }
    function sendCode() {
        toggleTerminal(true);
        var code = Blockly.Python.workspaceToCode();
        ws.send(code);
    }
    function getHost() {
        // Running of localhost means that we're debugging so connect to remote ESP
        if (location.hostname === 'localhost') {
            return '192.168.4.1:8266';
        }
        // Otherwise assume the IP of the websocket is the same as the UI
        return location.host + ":8266";
    }
    return {
        showPython: showPython,
        changeTab: changeTab,
        downloadPython: downloadPython,
        openCode: openCode,
        saveCode: saveCode,
        sendCode: sendCode,
    };
}
window.addEventListener('load', function () {
    var eb = edublocks();
    // Export the EduBlocks functions as globals...
    _.extend(window, eb);
});
