"use strict";
var WebReplPassword = 'shrimping';
var RT_PutFile = 1;
var RT_GetFile = 2;
var RT_GetVer = 3;
var BM_None = 0;
var BM_FirstResponseForPut = 11;
var BM_FinalResponseForPut = 12;
var BM_FirstResponseForGet = 21;
var BM_FileData = 22;
var BM_FinalResponseForGet = 23;
var BM_ResponseForGetVer = 31;
function micropythonWs(term) {
    var ws;
    var connected = false;
    var binaryState = BM_None;
    var putFileName = null;
    var putFileData = null;
    var getFileName = null;
    var getFileData = null;
    function prepareForConnect() {
        console.log('prepare_for_connect');
    }
    function updateFileStatus(s) {
        console.log(s);
    }
    function saveAs(blob, fileName) {
        console.log(blob, fileName);
        // TODO
    }
    function connect(url) {
        ws = new WebSocket(url);
        ws.binaryType = 'arraybuffer';
        ws.onopen = function () {
            term.removeAllListeners('data');
            term.on('data', function (data) {
                // Pasted data from clipboard will likely contain
                // LF as EOL chars.
                data = data.replace(/\n/g, '\r');
                ws.send(data);
            });
            term.on('title', function (title) {
                document.title = title;
            });
            term.focus();
            term.element.focus();
            term.write('\x1b[31mWelcome to EduBlocks!\x1b[m\r\n');
            // The default login password for the terminal
            ws.send(WebReplPassword + "\r");
            ws.onmessage = function (event) {
                if (event.data instanceof ArrayBuffer) {
                    var data = new Uint8Array(event.data);
                    switch (binaryState) {
                        case BM_FirstResponseForPut:
                            // first response for put
                            if (decodeResponse(data) === 0) {
                                if (!putFileData)
                                    throw new Error('put_file_data is empty');
                                // send file data in chunks
                                for (var offset = 0; offset < putFileData.length; offset += 1024) {
                                    ws.send(putFileData.slice(offset, offset + 1024));
                                }
                                binaryState = BM_FinalResponseForPut;
                            }
                            break;
                        case BM_FinalResponseForPut:
                            // final response for put
                            if (decodeResponse(data) === 0) {
                                if (!putFileData)
                                    throw new Error('put_file_data is empty');
                                updateFileStatus("Sent " + putFileName + ", " + putFileData.length + " bytes");
                            }
                            else {
                                updateFileStatus("Failed sending " + putFileName);
                            }
                            binaryState = BM_None;
                            break;
                        case BM_FirstResponseForGet:
                            // first response for get
                            if (decodeResponse(data) === 0) {
                                binaryState = BM_FileData;
                                var rec = new Uint8Array(1);
                                rec[0] = 0;
                                ws.send(rec);
                            }
                            break;
                        case BM_FileData:
                            // file data
                            var sz = data[0] | data[1] << 8;
                            if (data.length === 2 + sz) {
                                // we assume that the data comes in single chunks
                                if (sz === 0) {
                                    // end of file
                                    binaryState = BM_FinalResponseForGet;
                                }
                                else {
                                    if (!getFileData)
                                        throw new Error('get_file_data is empty');
                                    // accumulate incoming data to get_file_data
                                    var new_buf = new Uint8Array(getFileData.length + sz);
                                    new_buf.set(getFileData);
                                    new_buf.set(data.slice(2), getFileData.length);
                                    getFileData = new_buf;
                                    updateFileStatus("Getting " + getFileName + ", " + getFileData.length + " bytes");
                                    var rec = new Uint8Array(1);
                                    rec[0] = 0;
                                    ws.send(rec);
                                }
                            }
                            else {
                                binaryState = BM_None;
                            }
                            break;
                        case BM_FinalResponseForGet:
                            // final response
                            if (decodeResponse(data) === 0) {
                                if (!getFileName)
                                    throw new Error('get_file_name is empty');
                                if (!getFileData)
                                    throw new Error('get_file_data is empty');
                                updateFileStatus("Got " + getFileName + ", " + getFileData.length + " bytes");
                                saveAs(new Blob([getFileData], { type: 'application/octet-stream' }), getFileName);
                            }
                            else {
                                updateFileStatus("Failed getting " + getFileName);
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
        ws.onclose = function () {
            connected = false;
            if (term) {
                term.write('\x1b[31mDisconnected\x1b[m\r\n');
            }
            prepareForConnect();
        };
    }
    function runCode(data) {
        data = data.replace(/\n/g, '\r') + "\r\r\r";
        try {
            ws.send(data);
            term.focus();
            term.element.focus();
        }
        catch (e) {
            if (e instanceof DOMException) {
                alert('I could not connect to the ESP8266. :-(');
            }
            console.error(e);
        }
    }
    function decodeResponse(data) {
        if (data[0] === 'W'.charCodeAt(0) && data[1] === 'B'.charCodeAt(0)) {
            var code = data[2] | data[3] << 8;
            return code;
        }
        else {
            return -1;
        }
    }
    function getRequestRecord(rt, fsize, fname) {
        // WEBREPL_FILE = "<2sBBQLH64s"
        var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
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
            for (var i = 0; i < 64; ++i) {
                if (i < fname.length) {
                    rec[18 + i] = fname.charCodeAt(i);
                }
                else {
                    rec[18 + i] = 0;
                }
            }
        }
        return rec;
    }
    function putFile() {
        if (!putFileName)
            throw new Error('put_file_name is empty');
        if (!putFileData)
            throw new Error('put_file_data is empty');
        var dest_fname = putFileName;
        var dest_fsize = putFileData.length;
        var rec = getRequestRecord(RT_PutFile, dest_fsize, dest_fname);
        // initiate put
        binaryState = BM_FirstResponseForPut;
        updateFileStatus("Sending " + putFileName + "...");
        ws.send(rec);
    }
    function getFile(src_fname) {
        // WEBREPL_FILE = "<2sBBQLH64s"
        var rec = getRequestRecord(RT_GetFile, undefined, src_fname);
        // initiate get
        binaryState = BM_FirstResponseForGet;
        getFileName = src_fname;
        getFileData = new Uint8Array(0);
        updateFileStatus("Getting " + getFileName + "...");
        ws.send(rec);
    }
    function getVer() {
        var rec = getRequestRecord(RT_GetVer);
        // initiate GET_VER
        binaryState = BM_ResponseForGetVer;
        ws.send(rec);
    }
    function sendFile(f) {
        putFileName = f.name;
        var reader = new FileReader();
        reader.onload = function (e) {
            putFileData = new Uint8Array(e.target.result);
            console.log(encodeURI(f.name) + " - " + putFileData.length + " bytes");
            putFile();
        };
        reader.readAsArrayBuffer(f);
    }
    return {
        connect: connect,
        send: runCode,
        getVer: getVer,
        sendFile: sendFile,
        getFile: getFile,
    };
}
