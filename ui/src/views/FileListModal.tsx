import React = require('preact');
import { Component } from 'preact';

interface FileListModalProps {
  visible: boolean;
  files: string[];

  onCancel(): void;
  onOpenFile(file: string): void;
}

interface FileListModalState {

}

export default class FileListModal extends Component<FileListModalProps, FileListModalState> {
  public render() {
    const getFileItems = () => this.props.files.map((file) => (
      <tr>
        <td>{file}</td>
        <td><button onClick={() => this.props.onOpenFile(file)}>Open</button></td>
      </tr>
    ));

    return (
      <div class="modal">
        <input id="modal_1" type="checkbox" disabled={true} checked={this.props.visible} />
        <label for="modal_1" class="overlay"></label>
        <article>
          <header>
            <h3>File List</h3>
            <a class="close" onClick={this.props.onCancel}>&times;</a>
          </header>
          <section class="content">
            <table class="primary">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Open</th>
                </tr>
              </thead>
              <tbody>
                {getFileItems()}
              </tbody>
            </table>
          </section>
          <footer>
            <button onClick={this.props.onCancel}>Close</button>
          </footer>
        </article>
      </div>
    );
  }
}
