import micropythonWs from './micropython-ws';

function files() {
  const ws = initWebsocket();

  const filesElement = getElementByIdSafe('files');

  function initWebsocket() {
    console.log('Opening Websocket');

    const ws = micropythonWs();

    ws.on('open', showFiles);

    ws.connect(`ws://${getHost()}`);

    return ws;
  }

  function showFiles() {
    ws.listFiles().then((files) => {
      filesElement.innerHTML = `<li>${files.join('</li><li>')}</li>`;
    });
  }

  function getElementByIdSafe(id: string): HTMLElement {
    const element = document.getElementById(id);

    if (!element) { throw new Error(`Could not find element with "${id}"`); }

    return element;
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
    showFiles,
  };
}

window.addEventListener('load', () => {
  files();

  // const functions = files();

  // _.extend(window, functions);
});
