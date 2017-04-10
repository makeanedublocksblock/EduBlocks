import React = require('preact');
import { Component } from 'preact';

import Nav from './Nav';
import BlocklyView from './BlocklyView';
import PythonView from './PythonView';
import TerminalView from './TerminalView';
import FileListModal from './FileListModal';

const ViewModeBlockly = 'blockly';
const ViewModePython = 'python';

type ViewMode = typeof ViewModeBlockly | typeof ViewModePython;

interface PageProps {
  app: App;
}

interface DocumentState {
  name: string | null;
  xml: string;
  python: string;
  inSync: boolean;
}

interface PageState {
  viewMode: ViewMode;
  terminalOpen: boolean;
  fileListModalOpen: boolean;
  files: string[];

  doc: Readonly<DocumentState>;
}

export default class Page extends Component<PageProps, PageState> {
  private blocklyView: BlocklyView;
  private pythonView: PythonView;
  public terminalView: TerminalView;

  constructor() {
    super();

    this.state = {
      viewMode: 'blockly',
      terminalOpen: false,
      fileListModalOpen: false,
      files: [],

      doc: Object.freeze({
        name: null,
        xml: '',
        python: '',
        inSync: true,
      }),
    };
  }

  protected componentDidMount() {

  }

  private toggleView() {
    if (this.state.viewMode === 'blockly') {
      this.setState({ viewMode: 'python' });

      const code = this.blocklyView.getPython();
      this.pythonView.setCode(code);

    } else if (this.state.viewMode === 'python') {
      this.setState({ viewMode: 'blockly' });
    }
  }

  private sendCode() {
    if (!this.terminalView) { throw new Error('No terminal'); }

    this.setState({ terminalOpen: true });
    this.terminalView.focus();

    const code = this.blocklyView.getPython();
    this.props.app.runCode(code);

    setTimeout(() => {
      this.terminalView.focus();
    }, 250);
  }

  public openFileListModal() {
    this.props.app.listFiles().then((files) => {
      this.setState({ fileListModalOpen: true, files });
    });
  }

  public closeFileListModal() {
    this.setState({ fileListModalOpen: false });
  }

  public openFile(file: string) {
    this.closeFileListModal();

    this.props.app.getFileAsText(file).then((contents) => {
      if (isPythonFile(file)) {
        this.setState({
          doc: Object.freeze({
            name: file,
            xml: '',
            python: contents,
            inSync: false,
          }),
        });

        this.setState({ viewMode: 'python' });

        this.pythonView.setCode(contents);
      }

      // TODO XML
    });
  }

  public onBlocklyChange(xml: string, python: string) {
    this.setState({
      doc: Object.freeze({
        name: this.state.doc.name,
        xml,
        python,
        inSync: true,
      }),
    });
  }

  public onPythonChange(python: string) {
    if (this.state.doc.python === python) { return; }

    this.setState({
      doc: Object.freeze({
        name: this.state.doc.name,
        xml: this.state.doc.xml,
        python,
        inSync: false,
      }),
    });
  }

  public save() {
    // const code = this.pythonView.getCode();

    if (!this.state.doc.name) {
      alert('No filename');
      return;
    }

    this.props.app.sendFileAsText(this.state.doc.name, this.state.doc.python);
  }

  private onChangeName(file: string) {
    this.setState({
      doc: Object.freeze({
        name: file,
        xml: this.state.doc.xml,
        python: this.state.doc.python,
        inSync: this.state.doc.inSync,
      }),
    });
  }

  private onSelectFile(file: File) {
    this.props.app.sendFile(file);
  }

  private onTerminalClose() {
    this.setState({ terminalOpen: false });
  }

  public render() {
    return (
      <div id="page">
        <Nav
          filename={this.state.doc.name}
          sync={this.state.doc.inSync}

          sendCode={() => this.sendCode()}
          downloadPython={() => { }}
          openCode={() => this.openFileListModal()}
          saveCode={() => this.save()}

          onChangeName={(file) => this.onChangeName(file)}
          onSelectFile={(file) => this.onSelectFile(file)} />

        <section id="workspace">
          <button
            id="toggleViewButton"
            onClick={() => this.toggleView()}>

            {this.state.viewMode}

          </button>

          <BlocklyView
            ref={(c) => this.blocklyView = c}
            visible={this.state.viewMode === 'blockly'}
            onChange={(xml, python) => this.onBlocklyChange(xml, python)} />

          <PythonView
            ref={(c) => this.pythonView = c}
            visible={this.state.viewMode === 'python'}
            onChange={(python) => this.onPythonChange(python)} />
        </section>

        <TerminalView
          ref={(c) => this.terminalView = c}
          visible={this.state.terminalOpen}
          onClose={() => this.onTerminalClose()} />

        <FileListModal
          files={this.state.files}
          visible={this.state.fileListModalOpen}
          onOpenFile={(file) => this.openFile(file)}
          onCancel={() => this.closeFileListModal()} />
      </div>
    );
  }
}

function isPythonFile(file: string) {
  return file.indexOf('.py') === file.length - 3;
}