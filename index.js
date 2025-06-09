import React, { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setLink('');
    try {
      const res = await fetch('/api/install-sshx');
      const data = await res.json();
      if (data.link) setLink(data.link);
      else setLink('Không nhận được link.');
    } catch (e) {
      setLink('Lỗi: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Đang cài SSHX...' : 'Cài SSHX và lấy link'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{link}</pre>
    </div>
  );
}
