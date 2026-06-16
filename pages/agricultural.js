import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './_app';

export default function Agricultural() {
  const { theme } = useContext(ThemeContext);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setParallaxOffset(window.scrollY * 0.4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Agricultural Supplies & Farming Solutions South Africa | Stonehouse Holdings</title>
        <meta name="description" content="Stonehouse Holdings Agricultural division supplies fertilizers, farming inputs and comprehensive agricultural solutions across Southern Africa. Reliable supply for farmers and agribusiness." />
        <meta name="keywords" content="agricultural supplies South Africa, fertilizers South Africa, farming solutions Southern Africa, agribusiness South Africa, Stonehouse Holdings agriculture" />
        <meta property="og:title" content="Agricultural Supplies & Farming Solutions South Africa | Stonehouse Holdings" />
        <meta property="og:description" content="Reliable agricultural supplies, fertilizers and farming solutions across Southern Africa from Stonehouse Holdings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stonehousegroup.co.za/agricultural" />
        <meta property="og:image" content="https://www.stonehousegroup.co.za/stonehouse%20logo.jpg" />
        <link rel="canonical" href="https://www.stonehousegroup.co.za/agricultural" />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video
          src="/Agri vid.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
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
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 2, height: 30, background: 'linear-gradient(to bottom, rgba(255,215,0,0.7), transparent)' }} />
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
