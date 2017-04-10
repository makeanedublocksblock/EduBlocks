import React = require('preact');
import { Component } from 'preact';

const ace = (self as any).ace;

interface PythonViewProps {
  visible: boolean;

  onChange(python: string): void;
}

export default class PythonView extends Component<PythonViewProps, {}> {
  private editorDiv?: Element;
  private editor: any;

  protected componentDidMount() {
    if (!this.editorDiv) { throw new Error('No editor div'); }

    this.editor = ace.edit(this.editorDiv);

    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().setMode('ace/mode/python');

    // let warningShown = false;

    this.editor.on('change', () => {
      // if (!warningShown) {
      //   alert('Warning, return to block view will overwrite your changes');

      //   warningShown = true;
      // }

      const code = this.getCode();
      this.props.onChange(code);
    });
  }

  public getCode(): string {
    return this.editor.getValue();
  }

  public setCode(code: string) {
    this.editor.setValue(code);
  }

  public render() {
    return (
      <div style={{ display: this.props.visible ? 'block' : 'none' }} id="python">
        <div id="editor" ref={(div) => this.editorDiv = div}></div>
      </div>
    );
  }
}
