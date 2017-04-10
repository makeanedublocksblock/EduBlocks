/// <reference path="../node_modules/@types/es6-promise/index.d.ts" />

const WebReplPassword = 'shrimping';

const RT_PutFile = 1;
const RT_GetFile = 2;
const RT_GetVer = 3;

type RequestType = typeof RT_PutFile | typeof RT_GetFile | typeof RT_GetVer;

const BM_None = 0;
const BM_FirstResponseForPut = 11;
const BM_FinalResponseForPut = 12;
const BM_FirstResponseForGet = 21;
const BM_FileData = 22;
const BM_FinalResponseForGet = 23;
const BM_ResponseForGetVer = 31;

type BinaryModes = typeof BM_None | typeof BM_FirstResponseForPut | typeof BM_FinalResponseForPut | typeof BM_FirstResponseForGet | typeof BM_FileData | typeof BM_FinalResponseForGet | typeof BM_ResponseForGetVer;

interface Events {
  open: () => void;
  line: (line: string) => void;
}

interface MicropythonWs {
  setTerminal(term: TerminalInterface): void;

  connect(url: string): void;
  runCode(code: string): void;

  getVer(): void;
  sendFile(f: File): void;
  getFile(src_fname: string): Promise<Blob>;

  sendFileAsText(file: string, text: string): void;
  getFileAsText(src_fname: string): Promise<string>;

  scanNetworks(): Promise<string[]>;
  listFiles(): Promise<string[]>;

  on<K extends keyof Events>(eventType: K, handler: Events[K]): void;
}

export default function micropythonWs(): MicropythonWs {
  let term: TerminalInterface | null = null;
  let ws: WebSocket;
  let connected = false;

  let binaryState: BinaryModes = BM_None;

  let putFileName: string | null = null;
  let putFileData: Uint8Array | null = null;
  let getFileName: string | null = null;
  let getFileData: Uint8Array | null = null;

  // Oneshot handlers called in WS receive
  let getFileHandler: ((blob: Blob) => void) | null = null;
  let jsonHandler: ((json: object | any[]) => void) | null = null;

  function setTerminal(t: TerminalInterface) {
    term = t;

    // term.removeAllListeners('data');

    // term.on('data', (data) => {
    //   // Pasted data from clipboard will likely contain
    //   // LF as EOL chars.
    //   data = data.replace(/\n/g, '\r');
    //   ws.send(data);
    // });

    // term.on('title', (title) => {
    //   document.title = title;
    // });

    term.onData((data) => {
      // Pasted data from clipboard will likely contain
      // LF as EOL chars.
      data = data.replace(/\n/g, '\r');
      ws.send(data);
    });

    term.focus();
    // term.element.focus();
  }

  const eventHandlers: Events = {
    'open': () => void 0,
    'line': () => void 0,
  };

  function prepareForConnect() {
    console.log('prepare_for_connect');
  }

  function updateFileStatus(s: string) {
    console.log(s);
  }

  function on<K extends keyof Events>(eventType: K, handler: Events[K]) {
    eventHandlers[eventType] = handler;
  }

  function connect(url: string) {
    ws = new WebSocket(url);

    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      let receiveBuffer = '';

      // The default login password for the terminal
      ws.send(`${WebReplPassword}\r`);

      eventHandlers.open();

      ws.onmessage = (event) => {
        if (event.data instanceof ArrayBuffer) {
          const data = new Uint8Array(event.data);

          switch (binaryState) {
            case BM_FirstResponseForPut:
              // first response for put
              if (decodeResponse(data) === 0) {
                if (!putFileData) { throw new Error('put_file_data is empty'); }

                // send file data in chunks
                for (let offset = 0; offset < putFileData.length; offset += 1024) {
                  ws.send(putFileData.slice(offset, offset + 1024));
                }

                binaryState = BM_FinalResponseForPut;
              }

              break;

            case BM_FinalResponseForPut:
              // final response for put
              if (decodeResponse(data) === 0) {
                if (!putFileData) { throw new Error('put_file_data is empty'); }

                updateFileStatus(`Sent ${putFileName}, ${putFileData.length} bytes`);
              } else {
                updateFileStatus(`Failed sending ${putFileName}`);
              }

              binaryState = BM_None;

              break;

            case BM_FirstResponseForGet:
              // first response for get
              if (decodeResponse(data) === 0) {
                binaryState = BM_FileData;
                const rec = new Uint8Array(1);
                rec[0] = 0;
                ws.send(rec);
              }

              break;

            case BM_FileData:
              // file data
              const sz = data[0] | data[1] << 8;

              if (data.length === 2 + sz) {
                // we assume that the data comes in single chunks
                if (sz === 0) {
                  // end of file
                  binaryState = BM_FinalResponseForGet;
                } else {
                  if (!getFileData) { throw new Error('get_file_data is empty'); }

                  // accumulate incoming data to get_file_data
                  const new_buf = new Uint8Array(getFileData.length + sz);

                  new_buf.set(getFileData);
                  new_buf.set(data.slice(2), getFileData.length);

                  getFileData = new_buf;

                  updateFileStatus(`Getting ${getFileName}, ${getFileData.length} bytes`);

                  const rec = new Uint8Array(1);
                  rec[0] = 0;
                  ws.send(rec);
                }
              } else {
                binaryState = BM_None;
              }

              break;

            case BM_FinalResponseForGet:
              // final response
              if (decodeResponse(data) === 0) {
                if (!getFileName) { throw new Error('get_file_name is empty'); }
                if (!getFileData) { throw new Error('get_file_data is empty'); }

                updateFileStatus(`Got ${getFileName}, ${getFileData.length} bytes`);

                if (getFileHandler) {
                  getFileHandler(new Blob([getFileData], { type: 'application/octet-stream' }));

                  getFileHandler = null;
                }
              } else {
                updateFileStatus(`Failed getting ${getFileName}`);
              }

              binaryState = BM_None;

              break;

            case BM_ResponseForGetVer:
              // first (and last) response for GET_VER
              console.log('GET_VER', data);
              binaryState = BM_None;

              break;
          }

          return;
        }

        const result: string = event.data;

        // console.log(`[${result}]`, result.charCodeAt(0));

        if (!jsonHandler && term) {
          term.write(result);
        }

        // Data is send one character at a time
        receiveBuffer += result;

        // Only when we receive a new line character do we have a complete JSON message
        while (receiveBuffer.indexOf('\n') !== -1) {
          const [line, ...remaining] = receiveBuffer.split('\n');

          eventHandlers.line(line);

          receiveBuffer = remaining.join('\n');

          // Crude but effective...
          const isJson = line[0] === '[' || line[0] === '{';

          if (isJson && jsonHandler) {
            try {
              jsonHandler(JSON.parse(line));
            } catch (e) {
              console.error('Failed to parse JSON', line, e);
            }

            jsonHandler = null;
          }
        }
      };
    };

    ws.onclose = () => {
      connected = false;

      if (term) {
        term.write('\x1b[31mDisconnected\x1b[m\r\n');
      }

      prepareForConnect();
    };
  }

  function send(data: string) {
    data = `${data.replace(/\n/g, '\r')}`;

    try {
      ws.send(data);

      if (term) {
        term.focus();
        // term.element.focus();
      }
    } catch (e) {
      if (e instanceof DOMException) {
        alert('I could not connect to the ESP8266. :-(');
      }

      console.error(e);
    }
  }

  function runCode(code: string) {
    send(`\r${code}\r\r\r`);
  }

  function decodeResponse(data: Uint8Array) {
    if (data[0] === 'W'.charCodeAt(0) && data[1] === 'B'.charCodeAt(0)) {
      const code = data[2] | data[3] << 8;
      return code;
    } else {
      return -1;
    }
  }

  function getRequestRecord(rt: RequestType, fsize?: number, fname?: string) {
    // WEBREPL_FILE = "<2sBBQLH64s"
    const rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);

    rec[0] = 'W'.charCodeAt(0);
    rec[1] = 'A'.charCodeAt(0);
    rec[2] = rt;
    rec[3] = 0;
    rec[4] = 0;
    rec[5] = 0;
    rec[6] = 0;
    rec[7] = 0;
    rec[8] = 0;
    rec[9] = 0;
    rec[10] = 0;
    rec[11] = 0;

    if (fsize) {
      rec[12] = fsize >> 0 & 0xff;
      rec[13] = fsize >> 8 & 0xff;
      rec[14] = fsize >> 16 & 0xff;
      rec[15] = fsize >> 24 & 0xff;
    }

    if (fname) {
      rec[16] = fname.length >> 0 & 0xff;
      rec[17] = fname.length >> 8 & 0xff;

      for (let i = 0; i < 64; ++i) {
        if (i < fname.length) {
          rec[18 + i] = fname.charCodeAt(i);
        } else {
          rec[18 + i] = 0;
        }
      }
    }

    return rec;
  }

  function putFile() {
    if (!putFileName) { throw new Error('put_file_name is empty'); }
    if (!putFileData) { throw new Error('put_file_data is empty'); }

    const dest_fname = putFileName;
    const dest_fsize = putFileData.length;

    const rec = getRequestRecord(RT_PutFile, dest_fsize, dest_fname);

    // initiate put
    binaryState = BM_FirstResponseForPut;
    updateFileStatus(`Sending ${putFileName}...`);
    ws.send(rec);
  }

  function getFile(src_fname: string) {
    return new Promise<Blob>((resolve, reject) => {
      if (getFileHandler) {
        return reject(new Error('A file transfer is already in progress'));
      }

      getFileHandler = resolve;

      // WEBREPL_FILE = "<2sBBQLH64s"
      const rec = getRequestRecord(RT_GetFile, undefined, src_fname);

      // initiate get
      binaryState = BM_FirstResponseForGet;
      getFileName = src_fname;
      getFileData = new Uint8Array(0);
      updateFileStatus(`Getting ${getFileName}...`);

      return ws.send(rec);
    });
  }

  function getFileAsText(src_fname: string) {
    return getFile(src_fname).then((blob) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const contents = (e.target as any).result;
          resolve(contents);
        };
        reader.readAsText(blob);
      });
    });
  }

  function getVer() {
    const rec = getRequestRecord(RT_GetVer);

    // initiate GET_VER
    binaryState = BM_ResponseForGetVer;
    ws.send(rec);
  }

  function sendFile(f: File) {
    putFileName = f.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      putFileData = new Uint8Array((e.target as any).result);
      console.log(`${encodeURI(f.name)} - ${putFileData.length} bytes`);

      putFile();
    };
    reader.readAsArrayBuffer(f);
  }

  function sendFileAsText(file: string, text: string) {
    putFileName = file;

    const blob = new Blob([text], { type: 'text/plain' });

    const reader = new FileReader();
    reader.onload = (e) => {
      putFileData = new Uint8Array((e.target as any).result);

      putFile();
    };
    reader.readAsArrayBuffer(blob);
  }

  function scanNetworks(): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      const python = `
import network
import json
sta_if = network.WLAN(network.STA_IF); sta_if.active(True)
networks = sta_if.scan()
network_names = [network[0] for network in networks]
print(json.dumps(network_names))
`;

      jsonHandler = (json) => Array.isArray(json) ? resolve(json) : [];

      send(python);
    });
  }

  function listFiles(): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      const python = `
import json
print(json.dumps(os.listdir()))
`;

      jsonHandler = (json) => Array.isArray(json) ? resolve(json) : [];

      send(python);
    });
  }

  return {
    setTerminal,
    connect,
    runCode,
    getVer,
    sendFile,
    sendFileAsText,
    getFile,
    getFileAsText,
    scanNetworks,
    listFiles,
    on,
  };
}
