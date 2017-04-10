import React = require('preact');
import { Component } from 'preact';

interface NavProps {
  downloadPython(): void;
  openCode(): void;
  saveCode(): void;
  sendCode(): void;

  filename: string | null;
  sync: boolean;

  onChangeName(file: string): void;
  onSelectFile(file: File): void;
}

export default class Nav extends Component<NavProps, {}> {
  private changeName() {
    this.props.onChangeName(prompt('Enter new filename', this.props.filename || '') || '');
  }

  private onFileSelected(target: any) {
    this.props.onSelectFile(target.files[0]);
  }

  public render() {
    return (
      <nav>
        <a class="brand">
          <img class="logo" src="logo.png" />
          <span>EduBlocks</span>
          <span class="filename" onClick={() => this.changeName()}>{this.props.filename || '[New file]'} ({this.props.sync ? 'In sync' : 'Out of sync'})</span>
        </a>

        <input id="bmenub" type="checkbox" class="show" />
        <label for="bmenub" class="burger pseudo button">menu</label>

        <input type="file" class="file" onChange={(e) => this.onFileSelected(e.target)} />

        <div class="menu">
          <a class="button" title="Download Python Source Code" href="javascript:void(0)" onClick={() => this.props.downloadPython()}>
            Python Download
          </a>

          <a class="button icon-folder-open" title="Open a file" href="javascript:void(0)" onClick={() => this.props.openCode()}>
            Open
          </a>

          <a class="button icon-floppy" title="Save a file" href="javascript:void(0)" onClick={() => this.props.saveCode()}>
            Save
          </a>

          <a class="button icon-play" title="Run your code" href="javascript:void(0)" onClick={() => this.props.sendCode()}>
            Run
          </a>
        </div>
      </nav>
    );
  }
}
