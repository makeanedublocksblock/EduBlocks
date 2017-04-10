declare class Terminal {
  constructor(args: TermNewArgs);

  removeAllListeners(event: string): void;

  on(event: 'data', handler: (data: string) => void): void;
  on(event: 'title', handler: (title: string) => void): void;

  open(element: Node): void;
  resize(x: number, y: number): void;
  focus(): void;
  write(text: string): void;

  element: HTMLElement;
}

interface TermNewArgs {
  cols: number
  rows: number;
  useStyle: boolean;
  screenKeys: boolean;
  cursorBlink: boolean;
}

interface TerminalInterface {
  onData(handler: (data: string) => void): void;

  focus(): void;
  write(s: string): void;
}

interface App {
  runCode(code: string): void;
  listFiles(): Promise<string[]>;

  getFileAsText(src_fname: string): Promise<string>;
  sendFileAsText(file: string, text: string): void;

  sendFile(f: File): void;
}

declare function saveAs(blob: Blob, fileName: string): void;
