import Head from 'next/head';
import { useContext } from 'react';
import { ThemeContext } from './_app';

export default function Agricultural() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Agricultural - Stonehouse Holdings</title>
        <meta name="description" content="Stonehouse Holdings Agricultural division - Agricultural supplies, fertilizers, and comprehensive farming solutions across Southern Africa." />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video
          src="/Agri vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 860, marginTop: '-2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Agricultural
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto', lineHeight: 1.75 }}>
            Agricultural supplies, fertilizers, and comprehensive farming solutions across Southern Africa
          </p>
        </div>
      </section>

      {/* Content */}
      <div style={{ width: '100%', background: theme === 'dark' ? '#181d23' : '#e5e5e5', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.85', color: theme === 'dark' ? '#cbd5e0' : '#4a5568' }}>
          <p style={{ marginBottom: '1.2rem' }}>
            At Stonehouse Holdings, our Agricultural division is committed to supporting the farming and agricultural community across Southern Africa. We supply a wide range of agricultural inputs including fertilizers, crop protection products, and essential farming supplies tailored to the needs of our clients.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            We work closely with farmers, co-operatives, and agri-businesses to ensure timely delivery of quality products that help maximise productivity and yield. Our logistics expertise allows us to reach clients in both urban and rural areas efficiently.
          </p>
          <p>
            Whether you are a large commercial farming operation or a small-scale producer, Stonehouse Holdings is your reliable partner for agricultural supply and logistics across the region.
          </p>
        </div>
      </div>
    </>
  );
}
