import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './_app';

export default function About() {
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
        <title>About Stonehouse Holdings | 10+ Years Transport Experience South Africa</title>
        <meta name="description" content="Stonehouse Holdings has over 10 years of experience in bulk freight transport and logistics across South Africa. Learn about our commitment to safety, reliability and excellence." />
        <meta name="keywords" content="about Stonehouse Holdings, transport company South Africa, bulk freight company, logistics South Africa, Reino Fourie" />
        <meta property="og:title" content="About Stonehouse Holdings | Transport & Logistics South Africa" />
        <meta property="og:description" content="Over 10 years of experience in bulk transport and logistics across South Africa. Built on trust, driven by excellence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.stonehousegroup.co.za/about" />
        <meta property="og:image" content="https://www.stonehousegroup.co.za/stonehouse%20logo.jpg" />
        <link rel="canonical" href="https://www.stonehousegroup.co.za/about" />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/About 1.jpg"
          alt="About Stonehouse Holdings"
          style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 860, marginTop: '-2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            About Us
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto', lineHeight: 1.75 }}>
            Built on trust, driven by excellence — serving South Africa since 2024
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
            Stonehouse Holdings, founded in 2024, is a professional transport and logistics company committed to providing reliable, efficient, and cost-effective transportation solutions throughout South Africa and neighbouring regions. With more than 10 years of hands-on experience in the transport industry, our team brings the knowledge and expertise needed to deliver exceptional service on every load.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            We specialize in the movement of bulk materials and general freight, serving clients across various industries with a strong focus on safety, punctuality, and operational excellence. Our experienced team works closely with customers to ensure that every load is transported efficiently and delivered according to schedule.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            Clients can easily request transport rates and logistics solutions tailored to their specific requirements. We understand that every project is unique and strive to provide flexible services that meet the demands of each customer.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            At Stonehouse Holdings, integrity, reliability, and exceptional service are the foundation of our business. We are dedicated to building long-term relationships through transparent communication, professional service delivery, and a commitment to exceeding client expectations.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            As a growing transport and logistics company, Stonehouse Holdings continues to expand its capabilities and network, providing dependable transportation solutions that support the success of our clients and partners.
          </p>
          <p>
            We are also actively growing our transporter network and welcome professional truck owners and fleet operators to partner with us. If you are looking for consistent work and a reliable company to collaborate with, visit our Transport page and register with us today — we would love to have you on board.
          </p>
        </div>
      </div>
    </>
  );
}
