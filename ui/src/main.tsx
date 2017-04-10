import _ = require('lodash');
import React = require('preact');
import { render } from 'preact';

import Page from './views/Page';

import micropythonWs from './micropython-ws';
import getIo from './io';

function main() {
  const ws = initWebsocket();

  const app: App = {
    runCode(code) {
      console.log('App runCode', code);

      return ws.runCode(code);
    },

    listFiles() {
      console.log('App listFiles');

      return ws.listFiles();
    },

    getFileAsText(file) {
      console.log('App getFileAsText');

      return ws.getFileAsText(file);
    },

    sendFileAsText(file, text) {
      console.log('App sendFileAsText');

      return ws.sendFileAsText(file, text);
    },

    sendFile(f) {
      console.log('App sendFile');

      return ws.sendFile(f);
    },
  };

  const Blockly = (self as any).Blockly;
  const pageDiv = getElementByIdSafe('page');

  if (!pageDiv.parentElement) { return; }

  render(<Page app={app} ref={rendered} />, pageDiv.parentElement, pageDiv);

  function rendered(page: Page) {
    ws.setTerminal(page.terminalView);
  }

  setTimeout(() => {
    // const fileName = 'main.py';

    // ws.getFile(fileName).then((blob) => {
    //   saveAs(blob, fileName);
    // });

    // ====

    // ws.scanNetworks().then((networks) => {
    //   console.log(networks);
    // });

    // ====

    // ws.listFiles().then((files) => {
    //   console.log(files);
    // });

  }, 1000);

  document.addEventListener('keydown', onkeypress);

  function getElementByIdSafe(id: string): HTMLElement {
    const element = document.getElementById(id);

    if (!element) { throw new Error(`Could not find element with "${id}"`); }

    return element;
  }

  function downloadPython() {
    const code = Blockly.Python.workspaceToCode();

    const io = getIo();
    io.saveFile(code, 'py', 'Python Script');
  }

  function initWebsocket() {
    console.log('Opening Websocket');

    const ws = micropythonWs();

    ws.connect(`ws://${getHost()}`);

    return ws;
  }

  function openCode() {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = '.xml';
    fileInput.addEventListener('change', readSingleFile, false);
    fileInput.click();

    function readSingleFile(e: Event) {
      const file = (e.target as any).files[0];

      if (!file) { return; }

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

  function getHost() {
    // Running of localhost means that we're debugging so connect to remote ESP
    if (location.hostname === 'localhost') {
      return '192.168.4.1:8266';
    }

    // Otherwise assume the IP of the websocket is the same as the UI
    return `${location.hostname}:8266`;
  }

  return {
    downloadPython,
    openCode,
    saveCode,
  };
}

window.addEventListener('load', () => {
  const functions = main();

  // Export the EduBlocks functions as globals...
  _.extend(window, functions);
});
