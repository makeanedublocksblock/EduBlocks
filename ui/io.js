"use strict";

function getIo() {
  if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.electron
  ) {
    return getElectronIo();
  }

  return getWebIo();
}

function getElectronIo() {
  var electron = require("electron");
  var fs = require("fs");

  var dialog = electron.remote.dialog;

  /**
   * @param {string} text
   */
  function saveFile(text, ext, extName) {
    var path = dialog.showSaveDialog({
      filters: [{ name: extName, extensions: [ext] }]
    });

    if (!path) {
      return;
    }

    var buffer = new Buffer(text, "utf8");

    return new Promise((resolve, reject) => {
      return fs.writeFile(path, buffer, err => {
        if (err) {
          return reject(err);
        }

        return resolve(null);
      });
    });
  }

  return {
    saveFile
  };
}

function getWebIo() {
  /**
   * @param {string} text
   */
  function saveFile(text) {
    var blob = new Blob([text], { type: "text/xml;charset=utf-8" });
    saveAs(blob, prompt("Enter filename..."));
    return Promise.resolve(null);
  }

  return {
    saveFile
  };
}
