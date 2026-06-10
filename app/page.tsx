'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
    const key = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
    if (!domain || !key) {
      setLoading(false);
      return;
    }

    fetch(`https://${domain}.microcms.io/api/v1/videos`, {
      headers: { 'X-MICROCMS-API-KEY': key },
    })
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.contents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>読み込み中...</div>;
  }

  return (
    <div style={{ backgroundColor: '#FBF9F6', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px' }}>
      <h1 style={{ borderBottom: '2px solid #2D2B2A', paddingBottom: '10px', color: '#1A202C' }}>FUTURE FOR LIFE ARCHIVE</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {videos.map((video: any) => (
          <div key={video.id} style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#2D2B2A' }}>{video.title}</h3>
            <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>{video.description || '説明はありません。'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}