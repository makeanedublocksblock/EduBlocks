function micropythonWs(term) {
  var ws;
  var connected = false;
  var binary_state = 0;
  var put_file_name = null;
  var put_file_data = null;
  var get_file_name = null;
  var get_file_data = null;

  function prepare_for_connect() {
    // document.getElementById('url').disabled = false;
    // document.getElementById('button').value = "Connect";
  }

  function update_file_status(s) {
    console.log(s);
  }

  function saveAs(blob, fileName) {
    // TODO
  }

  function connect(url) {
    ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.onopen = function() {
      term.removeAllListeners("data");
      term.on("data", function(data) {
        // Pasted data from clipboard will likely contain
        // LF as EOL chars.
        data = data.replace(/\n/g, "\r");
        ws.send(data);
      });

      term.on("title", function(title) {
        document.title = title;
      });

      term.focus();
      term.element.focus();
      term.write("\x1b[31mWelcome to EduBlocks!\x1b[m\r\n");

      ws.send("shrimping\r");

      ws.onmessage = function(event) {
        if (event.data instanceof ArrayBuffer) {
          var data = new Uint8Array(event.data);
          switch (binary_state) {
            case 11:
              // first response for put
              if (decode_resp(data) == 0) {
                // send file data in chunks
                for (
                  var offset = 0;
                  offset < put_file_data.length;
                  offset += 1024
                ) {
                  ws.send(put_file_data.slice(offset, offset + 1024));
                }
                binary_state = 12;
              }
              break;
            case 12:
              // final response for put
              if (decode_resp(data) == 0) {
                update_file_status(
                  "Sent " +
                    put_file_name +
                    ", " +
                    put_file_data.length +
                    " bytes"
                );
              } else {
                update_file_status("Failed sending " + put_file_name);
              }
              binary_state = 0;
              break;

            case 21:
              // first response for get
              if (decode_resp(data) == 0) {
                binary_state = 22;
                var rec = new Uint8Array(1);
                rec[0] = 0;
                ws.send(rec);
              }
              break;
            case 22: {
              // file data
              var sz = data[0] | data[1] << 8;
              if (data.length == 2 + sz) {
                // we assume that the data comes in single chunks
                if (sz == 0) {
                  // end of file
                  binary_state = 23;
                } else {
                  // accumulate incoming data to get_file_data
                  var new_buf = new Uint8Array(get_file_data.length + sz);
                  new_buf.set(get_file_data);
                  new_buf.set(data.slice(2), get_file_data.length);
                  get_file_data = new_buf;
                  update_file_status(
                    "Getting " +
                      get_file_name +
                      ", " +
                      get_file_data.length +
                      " bytes"
                  );

                  var rec = new Uint8Array(1);
                  rec[0] = 0;
                  ws.send(rec);
                }
              } else {
                binary_state = 0;
              }
              break;
            }
            case 23:
              // final response
              if (decode_resp(data) == 0) {
                update_file_status(
                  "Got " +
                    get_file_name +
                    ", " +
                    get_file_data.length +
                    " bytes"
                );
                saveAs(
                  new Blob([get_file_data], {
                    type: "application/octet-stream"
                  }),
                  get_file_name
                );
              } else {
                update_file_status("Failed getting " + get_file_name);
              }
              binary_state = 0;
              break;
            case 31:
              // first (and last) response for GET_VER
              console.log("GET_VER", data);
              binary_state = 0;
              break;
          }
        }
        term.write(event.data);
      };
    };

    ws.onclose = function() {
      connected = false;
      if (term) {
        term.write("\x1b[31mDisconnected\x1b[m\r\n");
      }
      prepare_for_connect();
    };
  }

  function run_code(data) {
    data = data.replace(/\n/g, "\r") + "\r\r\r";
    ws.send(data);

    term.focus();
    term.element.focus();
  }

  function decode_resp(data) {
    if (data[0] == "W".charCodeAt(0) && data[1] == "B".charCodeAt(0)) {
      var code = data[2] | data[3] << 8;
      return code;
    } else {
      return -1;
    }
  }

  function put_file() {
    var dest_fname = put_file_name;
    var dest_fsize = put_file_data.length;

    // WEBREPL_FILE = "<2sBBQLH64s"
    var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    rec[0] = "W".charCodeAt(0);
    rec[1] = "A".charCodeAt(0);
    rec[2] = 1; // put
    rec[3] = 0;
    rec[4] = 0;
    rec[5] = 0;
    rec[6] = 0;
    rec[7] = 0;
    rec[8] = 0;
    rec[9] = 0;
    rec[10] = 0;
    rec[11] = 0;
    rec[12] = dest_fsize & 0xff;
    rec[13] = dest_fsize >> 8 & 0xff;
    rec[14] = dest_fsize >> 16 & 0xff;
    rec[15] = dest_fsize >> 24 & 0xff;
    rec[16] = dest_fname.length & 0xff;
    rec[17] = dest_fname.length >> 8 & 0xff;
    for (var i = 0; i < 64; ++i) {
      if (i < dest_fname.length) {
        rec[18 + i] = dest_fname.charCodeAt(i);
      } else {
        rec[18 + i] = 0;
      }
    }

    // initiate put
    binary_state = 11;
    update_file_status("Sending " + put_file_name + "...");
    ws.send(rec);
  }

  function get_file(src_fname) {
    // WEBREPL_FILE = "<2sBBQLH64s"
    var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    rec[0] = "W".charCodeAt(0);
    rec[1] = "A".charCodeAt(0);
    rec[2] = 2; // get
    rec[3] = 0;
    rec[4] = 0;
    rec[5] = 0;
    rec[6] = 0;
    rec[7] = 0;
    rec[8] = 0;
    rec[9] = 0;
    rec[10] = 0;
    rec[11] = 0;
    rec[12] = 0;
    rec[13] = 0;
    rec[14] = 0;
    rec[15] = 0;
    rec[16] = src_fname.length & 0xff;
    rec[17] = src_fname.length >> 8 & 0xff;
    for (var i = 0; i < 64; ++i) {
      if (i < src_fname.length) {
        rec[18 + i] = src_fname.charCodeAt(i);
      } else {
        rec[18 + i] = 0;
      }
    }

    // initiate get
    binary_state = 21;
    get_file_name = src_fname;
    get_file_data = new Uint8Array(0);
    update_file_status("Getting " + get_file_name + "...");
    ws.send(rec);
  }

  function get_ver() {
    // WEBREPL_REQ_S = "<2sBBQLH64s"
    var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
    rec[0] = "W".charCodeAt(0);
    rec[1] = "A".charCodeAt(0);
    rec[2] = 3; // GET_VER
    // rest of "rec" is zero

    // initiate GET_VER
    binary_state = 31;
    ws.send(rec);
  }

  function handle_put_file_select(evt) {
    // The event holds a FileList object which is a list of File objects,
    // but we only support single file selection at the moment.
    var files = evt.target.files;

    // Get the file info and load its data.
    var f = files[0];
    put_file_name = f.name;
    var reader = new FileReader();
    reader.onload = function(e) {
      put_file_data = new Uint8Array(e.target.result);
      console.log(
        "" + escape(put_file_name) + " - " + put_file_data.length + " bytes"
      );
      // document.getElementById("put-file-button").disabled = false;
    };
    reader.readAsArrayBuffer(f);
  }

  return {
    connect: connect,
    send: run_code
  };
}
