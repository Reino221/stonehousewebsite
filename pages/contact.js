import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeContext } from './_app';

const inputStyle = (theme) => ({
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '10px',
  border: theme === 'dark' ? '1.5px solid #FFD700' : '1.5px solid #d1d5db',
  background: theme === 'dark' ? '#1a2330' : '#f9fafb',
  color: theme === 'dark' ? '#e0e0e0' : '#1D2A35',
  fontSize: '1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: 'inherit',
});

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => setParallaxOffset(window.scrollY * 0.4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const closeForm = () => {
    setShowForm(false);
    setStatus('idle');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const fd = new FormData();
      fd.append('access_key', '3ab2c9fd-5aae-4fb3-ba33-adb5e0cf07b7');
      fd.append('subject', `Website Enquiry from ${form.name}`);
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('message', form.message);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Contact - Stonehouse Holdings</title>
        <meta name="description" content="Contact Stonehouse Holdings - Get in touch with our team for transport and logistics solutions." />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/Contact 1.jpg"
          alt="Contact Stonehouse Holdings"
          style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 860, marginTop: '-2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto 2.5rem auto', lineHeight: 1.75 }}>
            Get in touch with our team for reliable transport and logistics solutions
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 16px rgba(200,160,0,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Send Us a Message
          </button>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showForm && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}
          onClick={closeForm}
        >
          <div
            style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = '#999'}
              aria-label="Close"
            >
              &times;
            </button>
            <div style={{ padding: '30px 30px 20px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#C99700', marginBottom: 6 }}>Stonehouse Holdings</div>
              <div style={{ color: '#1D2A35', fontWeight: 800, fontSize: 22 }}>Send Us a Message</div>
            </div>
            <div style={{ overflowY: 'auto', padding: '0 30px 30px', flexGrow: 1 }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: 48, marginBottom: '1rem' }}>✓</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#1D2A35', marginBottom: 8 }}>Message Sent!</div>
                  <div style={{ color: '#4a5568', marginBottom: '1.5rem' }}>We will get back to you shortly.</div>
                  <button
                    onClick={closeForm}
                    style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: '#1D2A35', fontSize: '0.9rem' }}>Name *</label>
                      <input name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: '#1D2A35', fontSize: '0.9rem' }}>Email Address *</label>
                      <input name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: '#1D2A35', fontSize: '0.9rem' }}>Contact Number *</label>
                      <input name="phone" type="tel" required placeholder="Your contact number" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: '#1D2A35', fontSize: '0.9rem' }}>Message *</label>
                      <textarea name="message" required placeholder="How can we help you?" value={form.message} onChange={handleChange} rows={4} style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
                    </div>
                  </div>
                  {status === 'error' && (
                    <p style={{ color: '#e53e3e', fontWeight: 600, margin: 0, fontSize: 14, textAlign: 'center' }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, height: 52, fontWeight: 800, fontSize: 16, cursor: status === 'sending' ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(255,215,0,0.3)', transition: 'all 0.3s ease', width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}
                    onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,215,0,0.4)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,215,0,0.3)'; }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content — Info Card */}
      <div style={{ width: '100%', background: theme === 'dark' ? '#181d23' : '#e5e5e5', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: theme === 'dark' ? 'rgba(34,48,68,0.97)' : 'rgba(255,255,255,0.97)',
            borderRadius: 18,
            boxShadow: theme === 'dark' ? '0 4px 24px rgba(200,200,0,0.10)' : '0 4px 24px rgba(0,0,0,0.08)',
            padding: '2.2rem 2.5rem',
            border: theme === 'dark' ? '1.5px solid #FFD700' : '1.5px solid #e7e7e7',
          }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ minWidth: 260, flex: 1 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.7rem', color: theme === 'dark' ? '#FFD700' : '#1D2A35', letterSpacing: 0.5 }}>Stonehouse Holdings</h2>
                <ul style={{ listStyle: 'none', padding: 0, color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.08rem', lineHeight: 1.7 }}>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Name:</span> Reino Fourie</li>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Email:</span> <a href="mailto:info@stonehouseltd.co.za" style={{ color: theme === 'dark' ? 'white' : '#1D2A35', textDecoration: 'none', fontWeight: 500 }}>info@stonehouseltd.co.za</a></li>
                  <li><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Phone:</span> <a href="tel:0645598007" style={{ color: theme === 'dark' ? 'white' : '#1D2A35', textDecoration: 'none', fontWeight: 500 }}>064 559 8007</a></li>
                </ul>
              </div>
              <div style={{ minWidth: 260, flex: 1 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.7rem', color: theme === 'dark' ? '#FFD700' : '#1D2A35', letterSpacing: 0.5 }}>Working Hours</h2>
                <ul style={{ listStyle: 'none', padding: 0, color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.08rem', lineHeight: 1.7 }}>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Monday - Thursday:</span> 08:00 - 16:30</li>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Friday:</span> 08:00 - 15:00</li>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Saturday:</span> 08:00 - 12:00</li>
                  <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Sunday:</span> Closed</li>
                  <li><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Public Holidays:</span> Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
