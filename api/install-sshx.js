import { exec } from 'child_process';

export default async function handler(req, res) {
  // Cài sshx
  exec('curl -sSf https://sshx.io/get | sh', (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: stderr || error.message });
      return;
    }
    // Chạy lệnh sshx lấy link, ở đây tạm lấy cái ví dụ "sshx link"
    exec('sshx --version', (err2, out2, err2stderr) => {
      if (err2) {
        res.status(500).json({ error: err2stderr || err2.message });
        return;
      }
      // Giả sử bạn lấy link sshx từ output lệnh
      res.status(200).json({ link: `sshx version info:\n${out2}` });
    });
  });
}
