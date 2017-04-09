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

interface MicropythonWs {
  connect(url: string): void;
  send(data: string): void;

  getVer(): void;
  sendFile(f: File): void;
  getFile(src_fname: string): void;
}

function micropythonWs(term: Terminal): MicropythonWs {
  let ws: WebSocket;
  let connected = false;

  let binaryState: BinaryModes = BM_None;

  let putFileName: string | null = null;
  let putFileData: Uint8Array | null = null;
  let getFileName: string | null = null;
  let getFileData: Uint8Array | null = null;

  function prepareForConnect() {
    console.log('prepare_for_connect');
  }

  function updateFileStatus(s: string) {
    console.log(s);
  }

  function saveAs(blob: Blob, fileName: string) {
    console.log(blob, fileName);
    // TODO
  }

  function connect(url: string) {
    ws = new WebSocket(url);

    ws.binaryType = 'arraybuffer';

    ws.onopen = () => {
      term.removeAllListeners('data');

      term.on('data', (data) => {
        // Pasted data from clipboard will likely contain
        // LF as EOL chars.
        data = data.replace(/\n/g, '\r');
        ws.send(data);
      });

      term.on('title', (title) => {
        document.title = title;
      });

      term.focus();
      term.element.focus();
      term.write('\x1b[31mWelcome to EduBlocks!\x1b[m\r\n');

      // The default login password for the terminal
      ws.send(`${WebReplPassword}\r`);

      ws.onmessage = (event) => {
        if (event.data instanceof ArrayBuffer) {
          const data = new Uint8Array(event.data);

          switch (binaryState) {
            case BM_FirstResponseForPut:
              // first response for put
              if (decodeResponse(data) === 0) {
                if (!putFileData) throw new Error('put_file_data is empty');

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
                if (!putFileData) throw new Error('put_file_data is empty');

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
                  if (!getFileData) throw new Error('get_file_data is empty');

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
                if (!getFileName) throw new Error('get_file_name is empty');
                if (!getFileData) throw new Error('get_file_data is empty');

                updateFileStatus(`Got ${getFileName}, ${getFileData.length} bytes`);

                saveAs(new Blob([getFileData], { type: 'application/octet-stream' }), getFileName);
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
        }

        term.write(event.data);
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

  function runCode(data: string) {
    data = `${data.replace(/\n/g, '\r')}\r\r\r`;

    try {
      ws.send(data);

      term.focus();
      term.element.focus();
    } catch (e) {
      if (e instanceof DOMException) {
        alert('I could not connect to the ESP8266. :-(');
      }

      console.error(e);
    }
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
    if (!putFileName) throw new Error('put_file_name is empty');
    if (!putFileData) throw new Error('put_file_data is empty');

    const dest_fname = putFileName;
    const dest_fsize = putFileData.length;

    const rec = getRequestRecord(RT_PutFile, dest_fsize, dest_fname);

    // initiate put
    binaryState = BM_FirstResponseForPut;
    updateFileStatus(`Sending ${putFileName}...`);
    ws.send(rec);
  }

  function getFile(src_fname: string) {
    // WEBREPL_FILE = "<2sBBQLH64s"
    const rec = getRequestRecord(RT_GetFile, undefined, src_fname);

    // initiate get
    binaryState = BM_FirstResponseForGet;
    getFileName = src_fname;
    getFileData = new Uint8Array(0);
    updateFileStatus(`Getting ${getFileName}...`);
    ws.send(rec);
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

  return {
    connect,
    send: runCode,
    getVer,
    sendFile,
    getFile,
  };
}
