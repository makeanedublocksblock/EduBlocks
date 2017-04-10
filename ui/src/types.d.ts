declare class Terminal {
  constructor(args: TermNewArgs);

  removeAllListeners(event: string): void;

  on(event: 'data', handler: (data: string) => void): void;
  on(event: 'title', handler: (title: string) => void): void;

  open(element: HTMLElement): void;
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

declare function saveAs(blob: Blob, fileName: string): void;
