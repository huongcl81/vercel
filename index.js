const express = require('express');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Tạo WebSocket server trên cùng port
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  // Mở shell bash
  const shell = spawn('bash', [], { stdio: ['pipe', 'pipe', 'pipe'] });

  // Khi shell có output thì gửi về client
  shell.stdout.on('data', data => {
    ws.send(data.toString());
  });

  shell.stderr.on('data', data => {
    ws.send(data.toString());
  });

  shell.on('close', () => {
    ws.close();
  });

  // Nhận lệnh từ client rồi đẩy vào shell
  ws.on('message', message => {
    shell.stdin.write(message + '\n');
  });

  ws.on('close', () => {
    shell.kill();
  });
});
