window.addEventListener("load", initBlockly);
window.addEventListener("load", initTerminal);
window.addEventListener("load", initWebsocket);
window.addEventListener("load", initEditor);
window.addEventListener("resize", onresize, false);

document.addEventListener("keydown", onkeypress);

window.addEventListener("resize", resizeTerminal);

// var term = document.getElementById("term");
var termContainer = document.getElementById("term");
var term;
// var inp = document.getElementById("inp");

// term.parentNode.addEventListener("click", ontermclick);
// inp.addEventListener("keyup", oninputkey);

var blockly = document.getElementById("blockly");
var python = document.getElementById("python");

var workspace;
var ws;
var editor;
var terminalOpen = false;

function initBlockly() {
  workspace = Blockly.inject(blockly, {
    media: "blockly/media/",
    toolbox: document.getElementById("toolbox")
  });

  onresize();
}

function changeTab(mode) {
  if (mode === "blockly") {
    blockly.style.display = "block";
    python.style.display = "none";
  }

  if (mode === "python") {
    blockly.style.display = "none";
    python.style.display = "block";
  }
}

function showPython() {
  var code = Blockly.Python.workspaceToCode();

  // python.innerText = code || 'No code';
  editor.setValue(code);

  changeTab("python");
}

function downloadPython() {
  var code = Blockly.Python.workspaceToCode();

  const io = getIo();
  io.saveFile(code, "py", "Python Script");
}

function onresize(e) {
  Blockly.svgResize(workspace);
}

function onkeypress(e) {
  if (e.keyCode === 27) {
    ws.send(String.fromCharCode(3));

    toggleTerminal();
  }
}

function ontermclick(e) {
  // inp.focus();
}

function oninputkey(e) {
  if (e.keyCode === 13) {
    ws.send(inp.value);
    // inp.value = "";
  }

  // Detect Ctrl-C
  if (e.keyCode === 67 && e.ctrlKey) {
    ws.send(String.fromCharCode(3));
  }
}

function calculateSize(win) {
  var cols = Math.max(80, Math.min(300, termContainer.clientWidth / 6.7)) | 0;
  var rows = Math.max(10, Math.min(80, termContainer.clientHeight / 20.5)) | 0;

  return [cols, rows];
}

function resizeTerminal() {
  var size = calculateSize(self);

  term.resize(size[0], size[1]);
}

function initTerminal() {
  var size = calculateSize(self);

  term = new Terminal({
    cols: size[0],
    rows: size[1],
    useStyle: true,
    screenKeys: true,
    cursorBlink: false
  });

  term.open(document.getElementById("term"));
  // term.write("Hello world!");
}

function initWebsocket() {
  console.log("Opening Websocket");

  // ws = new WebSocket("ws://" + getHost() + "/terminal");

  // ws.onmessage = function(evt) {
  //   term.value += evt.data + "\n";
  //   term.scrollTop = term.scrollHeight;
  // };

  // ws.onclose = function() {
  //   setTimeout(initWebsocket, 5000);
  // };

  ws = micropythonWs(term);

  ws.connect("ws://192.168.4.1:8266");
}

function initEditor() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/python");

  var warningShown = false;

  editor.on("change", function() {
    if (!warningShown) {
      alert("Warning, return to block view will overwrite your changes");

      warningShown = true;
    }
  });
}

function toggleTerminal(show) {
  if (typeof show === "undefined") {
    show = !terminalOpen;
  }

  var terminal = document.getElementById("terminal-dialog");

  terminal.style.display = show ? "block" : "none";
  terminalOpen = show;

  if (show) resizeTerminal();

  // inp.focus();
}

function changeTheme(themeName) {
  var header = document.getElementById("header");
  var classNames = header.className.replace(/[a-z]+\-header\ /, "");
  header.className = classNames + " " + themeName + "-header";
}

function openCode() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".xml";
  fileInput.addEventListener("change", readSingleFile, false);
  fileInput.click();

  function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(e) {
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

  const io = getIo();
  io.saveFile(text, "xml", "EduBlocks XML");
}

function sendCode() {
  toggleTerminal(true);

  var code = Blockly.Python.workspaceToCode();

  ws.send(code);
  // var xhttp = new XMLHttpRequest();
  // var postUrl = "http://" + getHost() + "/runcode";
  // xhttp.open("POST", postUrl, true);
  // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.send("code=" + encodeURIComponent(code));
}

function getHost() {
  if (location.protocol === "file:") {
    return "127.0.0.1:8080";
  }

  if (location.protocol === "http:") {
    return location.host;
  }

  return "";
}

function checkForUpdates() {
  var childProcess = require("child_process");
  var path = require("path");

  childProcess.spawn("lxterminal", [
    "-e",
    path.join(__dirname, "..", "check.sh")
  ]);
}
