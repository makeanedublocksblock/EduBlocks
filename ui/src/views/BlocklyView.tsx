import React = require('preact');
import { Component } from 'preact';

const Blockly = (self as any).Blockly;

interface BlocklyViewProps {
  visible: boolean;

  onChange(xml: string, python: string): void;
}

export default class BlocklyView extends Component<BlocklyViewProps, {}> {
  private blocklyDiv?: Element;

  public getXml(): string {
    const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);

    return Blockly.Xml.domToPrettyText(xml);
  }

  public getPython(): string {
    return Blockly.Python.workspaceToCode();
  }

  protected componentDidMount() {
    if (this.blocklyDiv) {
      const workspace = Blockly.inject(this.blocklyDiv, {
        media: 'blockly/media/',
        toolbox: document.getElementById('toolbox'),
      });

      Blockly.addChangeListener(() => {
        const xml = this.getXml();
        const python = this.getPython();

        this.props.onChange(xml, python);
      });

      Blockly.svgResize(workspace);
    }
  }

  public render() {
    return (
      <div
        style={{ display: this.props.visible ? 'block' : 'none' }}
        id="blockly"
        ref={(div) => this.blocklyDiv = div}>
      </div>
    );
  }
}
