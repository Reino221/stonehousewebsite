import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './_app';

const whyUs = [
  { icon: '🛡️', title: 'Safety First', desc: 'We prioritize the safety of every load, driver, and delivery on every route.' },
  { icon: '⏱️', title: 'Punctuality', desc: 'On-time delivery is not a promise — it is our standard operating procedure.' },
  { icon: '💡', title: 'Efficiency', desc: 'Streamlined logistics operations that save you time and reduce costs.' },
  { icon: '🤝', title: 'Reliability', desc: 'Long-term partnerships built on trust, transparency, and consistent service.' },
];


export default function Home() {
  const router = useRouter();
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
        <title>Stonehouse Holdings - Transport &amp; Logistics Solutions</title>
        <meta name="description" content="Stonehouse Holdings - Professional transport and logistics company providing reliable, efficient solutions throughout South Africa and neighbouring regions." />
      </Head>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/hero-bg.jpg.jpg"
          alt="Stonehouse Holdings"
          style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 2rem', maxWidth: 860, marginTop: '-4rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Moving South Africa{' '}
            <span style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Forward
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto 2.5rem auto', lineHeight: 1.75 }}>
            Professional transport and logistics solutions throughout South Africa and neighbouring regions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => router.push('/contact')}
              style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 16px rgba(200,160,0,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Get In Touch
            </button>
            <button
              onClick={() => router.push('/about')}
              style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.55)', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.color = '#FFD700'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.color = '#fff'; }}
            >
              About Us
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 2, height: 30, background: 'linear-gradient(to bottom, rgba(255,215,0,0.7), transparent)' }} />
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ background: theme === 'dark' ? '#131b25' : '#ffffff', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#C99700', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Who We Are</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: theme === 'dark' ? '#fff' : '#1D2A35', margin: '0.8rem 0 1.4rem 0', letterSpacing: '-0.02em' }}>
            Built on Trust. Driven by Excellence.
          </h2>
          <p style={{ fontSize: '1.1rem', color: theme === 'dark' ? '#b0bec5' : '#4a5568', maxWidth: 700, margin: '0 auto 2.2rem auto', lineHeight: 1.85 }}>
            Stonehouse Holdings, founded in 2024, is a professional transport and logistics company committed to providing reliable, efficient, and cost-effective transportation solutions throughout South Africa and neighbouring regions. We specialize in the movement of bulk materials and general freight, serving clients across various industries with a strong focus on safety, punctuality, and operational excellence.
          </p>
          <button
            onClick={() => router.push('/about')}
            style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.85rem 2.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Read More About Us
          </button>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ background: theme === 'dark' ? '#1D2A35' : '#f4f6f9', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: '#C99700', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.85rem' }}>Why Choose Us</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: theme === 'dark' ? '#fff' : '#1D2A35', marginTop: '0.8rem', letterSpacing: '-0.02em' }}>
              The Stonehouse Difference
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {whyUs.map((item) => (
              <div key={item.title} style={{ background: theme === 'dark' ? '#232b36' : '#fff', borderRadius: 16, padding: '2rem 1.5rem', textAlign: 'center', boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.25)' : '0 4px 24px rgba(0,0,0,0.07)', border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #ebebeb' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.9rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: theme === 'dark' ? '#FFD700' : '#1D2A35', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ color: theme === 'dark' ? '#b0bec5' : '#4a5568', fontSize: '0.93rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #1D2A35 0%, #0d1620 100%)', padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '1.1rem', letterSpacing: '-0.02em' }}>
            Ready to Move Your Freight?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.72)', marginBottom: '2.5rem', lineHeight: 1.75 }}>
            Get in touch with our team today for a tailored transport and logistics solution built around your needs.
          </p>
          <button
            onClick={() => router.push('/contact')}
            style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '1rem 3rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 20px rgba(200,160,0,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Contact Us Today
          </button>
        </div>
      </section>
    </>
  );
}
