import fs = require('fs');
import path = require('path');
import express = require('express');
import expressWs = require('express-ws');
import { spawn } from 'child_process';
import readline = require('readline');
import bodyParser = require('body-parser');
import { Readable } from 'stream';

const ui = path.join(__dirname, '..', 'ui');
const scriptPath = path.join(__dirname, '..', 'tmp', 'output.py');

const app = express();

// For parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

expressWs(app);

let lineReporter: (msg: string) => void;

app.post('/runcode', (req, res) => {
  const { code } = req.body;

  fs.writeFileSync(scriptPath, code);

  const s = new Readable();
  s.push(code);
  s.push(null);

  const proc = spawn('python3', ['-u', scriptPath], { stdio: ['pipe', 'pipe', 'pipe'] });

  console.log(code);

  const rl = readline.createInterface({
    input: proc.stdout,
  });

  rl.on('line', (input) => {
    console.log(`Received: ${input}`);

    if (lineReporter) {
      lineReporter(input);
    }
  });

  proc.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  proc.on('close', (code) => {
    console.log(`child process exited with code ${code}`);

    res.send('Done');
  });
});

app.ws('/terminal', (ws, req: express.Request) => {
  lineReporter = (msg) => ws.send(msg);

  ws.on('message', (msg) => {
    ws.send('Hello from Node: ' + msg);
  });
});

app.use(express.static(ui));

app.listen(8080, () => {
  console.log('EduBlocks server now listening on port 8080!');
});
