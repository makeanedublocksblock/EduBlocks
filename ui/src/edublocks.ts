/// <reference path="../node_modules/@types/lodash/index.d.ts" />

function edublocks() {
  const Blockly = (self as any).Blockly;
  const getIo = (self as any).getIo;
  const ace = (self as any).ace;
  const Terminal: { new (args: TermNewArgs): Terminal } = (self as any).Terminal;

  const termContainer = getElementByIdSafe('term');
  const blockly = getElementByIdSafe('blockly');
  const python = getElementByIdSafe('python');

  const workspace = initBlockly();
  const term = initTerminal();
  const ws = initWebsocket();
  const editor = initEditor();

  window.addEventListener('resize', onresize);
  window.addEventListener('resize', resizeTerminal);

  document.addEventListener('keydown', onkeypress);

  let terminalOpen = false;

  function getElementByIdSafe(id: string): HTMLElement {
    const element = document.getElementById(id);

    if (!element) throw new Error(`Could not find element with "${id}"`);

    return element;
  }

  function initBlockly() {
    const workspace = Blockly.inject(blockly, {
      media: 'blockly/media/',
      toolbox: getElementByIdSafe('toolbox'),
    });

    Blockly.svgResize(workspace);

    return workspace;
  }

  function changeTab(mode: 'blockly' | 'python') {
    if (mode === 'blockly') {
      if (blockly) blockly.style.display = 'block';
      if (python) python.style.display = 'none';
    }

    if (mode === 'python') {
      if (blockly) blockly.style.display = 'none';
      if (python) python.style.display = 'block';
    }
  }

  function showPython() {
    const code = Blockly.Python.workspaceToCode();

    editor.setValue(code);

    changeTab('python');
  }

  function downloadPython() {
    const code = Blockly.Python.workspaceToCode();

    const io = getIo();
    io.saveFile(code, 'py', 'Python Script');
  }

  function onresize() {
    Blockly.svgResize(workspace);
  }

  function onkeypress(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      // ws.send(String.fromCharCode(3));

      toggleTerminal();
    }
  }

  function calculateSize(): [number, number] {
    const cols = Math.max(80, Math.min(300, termContainer.clientWidth / 6.7)) | 0;
    const rows = Math.max(10, Math.min(80, termContainer.clientHeight / 20.5)) | 0;

    return [cols, rows];
  }

  function resizeTerminal() {
    const [x, y] = calculateSize();

    term.resize(x, y);
  }

  function initTerminal() {
    const size = calculateSize();

    const term = new Terminal({
      cols: size[0],
      rows: size[1],
      useStyle: true,
      screenKeys: true,
      cursorBlink: false,
    });

    term.open(termContainer);

    term.on('data', (data) => {
      if (data.charCodeAt(0) === 27) {
        toggleTerminal(false);
      }
    });

    return term;
  }

  function initWebsocket() {
    console.log('Opening Websocket');

    const ws = micropythonWs(term);

    ws.connect(`ws://${getHost()}`);

    return ws;
  }

  function initEditor() {
    const editor = ace.edit('editor');

    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/python');

    let warningShown = false;

    editor.on('change', () => {
      if (!warningShown) {
        alert('Warning, return to block view will overwrite your changes');

        warningShown = true;
      }
    });

    return editor;
  }

  function toggleTerminal(show = !terminalOpen) {
    const terminal = getElementByIdSafe('terminal-dialog');

    terminal.style.display = show ? 'block' : 'none';
    terminalOpen = show;

    if (show) resizeTerminal();
  }

  function openCode() {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = '.xml';
    fileInput.addEventListener('change', readSingleFile, false);
    fileInput.click();

    function readSingleFile(e: Event) {
      const file = (e.target as any).files[0];

      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = (e.target as any).result;
        gotContents(contents);
      };
      reader.readAsText(file);
    }

    function gotContents(text: string) {
      const textToDom = Blockly.Xml.textToDom(text);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, textToDom);
    }
  }

  function saveCode() {
    const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    const text = Blockly.Xml.domToPrettyText(xml);

    const io = getIo();

    io.saveFile(text, 'xml', 'EduBlocks XML');
  }

  function sendCode() {
    toggleTerminal(true);

    const code = Blockly.Python.workspaceToCode();

    ws.send(code);
  }

  function getHost() {
    // Running of localhost means that we're debugging so connect to remote ESP
    if (location.hostname === 'localhost') {
      return '192.168.4.1:8266';
    }

    // Otherwise assume the IP of the websocket is the same as the UI
    return `${location.host}:8266`;
  }

  return {
    showPython,
    changeTab,
    downloadPython,
    openCode,
    saveCode,
    sendCode,
  };
}

window.addEventListener('load', () => {
  const eb = edublocks();

  // Export the EduBlocks functions as globals...
  _.extend(window, eb);
});
