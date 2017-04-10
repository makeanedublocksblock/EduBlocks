import React = require('preact');
import { Component } from 'preact';

interface TerminalViewProps {
  visible: boolean;

  onClose(): void;
}

export default class TerminalView extends Component<TerminalViewProps, {}> implements TerminalInterface {
  private termDiv?: Element;
  private term: Terminal;

  private onDataHandler: (data: string) => void;

  protected componentDidMount() {
    if (!this.termDiv) { throw new Error('No term'); }

    const calculateSize = (): [number, number] => {
      if (!this.termDiv) { throw new Error('No term'); }

      const cols = Math.max(80, Math.min(300, this.termDiv.clientWidth / 6.7)) | 0;
      const rows = Math.max(10, Math.min(80, this.termDiv.clientHeight / 20.5)) | 0;

      return [cols, rows];
    };

    const resizeTerminal = () => {
      if (!this.termDiv) { throw new Error('No term'); }

      const [x, y] = calculateSize();

      this.term.resize(x, y);
    };

    const [x, y] = calculateSize();

    this.term = new Terminal({
      cols: x,
      rows: y,
      useStyle: true,
      screenKeys: true,
      cursorBlink: false,
    });

    this.term.open(this.termDiv);

    this.term.on('data', (data) => {
      this.onDataHandler(data);

      if (data.length === 1 && data.charCodeAt(0) === 27) {
        this.props.onClose();
      }
    });

    this.term.write('\x1b[31mWelcome to EduBlocks!\x1b[m\r\n');
    this.term.write('Press [ESC] to exit the terminal\r\n');

    window.addEventListener('resize', resizeTerminal);

    setInterval(resizeTerminal, 2000);
  }

  public focus() {
    if (!this.term) { return; }

    this.term.focus();
    this.term.element.focus();
  }

  public write(s: string) {
    this.term.write(s);
  }

  public onData(handler: (data: string) => void) {
    this.onDataHandler = handler;
  }

  public render() {
    return (
      <div style={{ display: this.props.visible ? 'block' : 'none' }} id="terminal-dialog">
        <div id="term" ref={(div) => this.termDiv = div}></div>
      </div>
    );
  }
}