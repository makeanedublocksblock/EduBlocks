export default function getIo() {
  return getWebIo();
}

function getWebIo() {
  /**
   * @param {string} text
   */
  function saveFile(text: string, _1: string, _2: string) {
    let blob = new Blob([text], { type: 'text/xml;charset=utf-8' });
    saveAs(blob, prompt('Enter filename...') || 'unamed.xml');
    return Promise.resolve(null);
  }

  return {
    saveFile,
  };
}
