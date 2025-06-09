import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const runCommand = async () => {
    if (!input.trim()) return;
    setOutput(prev => prev + `> ${input}\n`);
    try {
      const res = await fetch('/api/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: input }),
      });
      const data = await res.json();
      setOutput(prev => prev + (data.output || '') + '\n');
    } catch (err) {
      setOutput(prev => prev + 'Error: ' + err.message + '\n');
    }
    setInput('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // tránh xuống dòng trong textarea
      runCommand();
    }
  };

  return (
    <div style={{padding: 20, fontFamily: 'monospace'}}>
      <pre style={{background: '#000', color: '#0f0', padding: 20, height: 400, overflowY: 'scroll'}}>
        {output}
      </pre>
      <textarea
        style={{width: '100%', height: 50, fontSize: 16, fontFamily: 'monospace'}}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your command and press Enter..."
      />
    </div>
  );
}
