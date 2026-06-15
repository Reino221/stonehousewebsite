import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './_app';

export default function Transport() {
  const { theme } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', contactNumber: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setParallaxOffset(window.scrollY * 0.4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setStatus('idle');
    setFormData({ name: '', contactNumber: '', email: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '3ab2c9fd-5aae-4fb3-ba33-adb5e0cf07b7',
          subject: `Transporter Registration - ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.contactNumber,
          message: formData.message,
          to: 'info@stonehouseltd.co.za',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
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
        <title>Transport - Stonehouse Holdings</title>
        <meta name="description" content="Stonehouse Holdings Transport division - Reliable, efficient transport and logistics solutions throughout South Africa and neighbouring regions." />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/Truck 1.jpg"
          alt="Transport"
          style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', objectFit: 'cover', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 860, marginTop: '-2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Transport
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto 2.5rem auto', lineHeight: 1.75 }}>
            Reliable, efficient transport and logistics solutions throughout South Africa and neighbouring regions
          </p>
          <button
            onClick={() => setShowForm(true)}
            style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 16px rgba(200,160,0,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Register as Transporter
          </button>
        </div>
      </section>

      {/* Content */}
      <div style={{ width: '100%', background: theme === 'dark' ? '#181d23' : '#e5e5e5', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.85', color: theme === 'dark' ? '#cbd5e0' : '#4a5568' }}>
          <p style={{ marginBottom: '1.2rem' }}>
            At Stonehouse Holdings, our Transport division is the backbone of our operations. We provide professional, reliable, and cost-effective transportation solutions for bulk materials and general freight across South Africa and into neighbouring regions.
          </p>
          <p style={{ marginBottom: '1.2rem' }}>
            With a strong focus on safety, punctuality, and operational excellence, we ensure every load is handled with care and delivered on time. Our team is committed to building long-term partnerships with clients by consistently delivering value and maintaining the highest standards of service.
          </p>
          <p>
            Whether you require single-load movements or ongoing logistics contracts, Stonehouse Holdings has the capacity and expertise to meet your transport needs efficiently and professionally.
          </p>
        </div>
      </div>

      {/* Registration Modal */}
      {showForm && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }}
          onClick={closeForm}
        >
          <div
            style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeForm}
              style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999', width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = '#999'}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header */}
            <div style={{ padding: '30px 30px 20px', textAlign: 'center', borderRadius: '20px 20px 0 0' }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: '#C99700', marginBottom: 6 }}>Transport</div>
              <div style={{ color: '#1D2A35', fontWeight: 800, fontSize: 22 }}>Register as a Transporter</div>
            </div>

            {/* Body */}
            <div style={{ overflowY: 'auto', padding: '0 30px 30px', flexGrow: 1 }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: 48, marginBottom: '1rem' }}>✓</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#1D2A35', marginBottom: 8 }}>Registration Sent!</div>
                  <div style={{ color: '#4a5568', marginBottom: '1.5rem' }}>We will be in touch with you shortly.</div>
                  <button
                    onClick={closeForm}
                    style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef', display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 5, color: '#1D2A35', fontSize: 14, fontWeight: 600 }}>Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        required
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 5, color: '#1D2A35', fontSize: 14, fontWeight: 600 }}>Contact Number *</label>
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="Contact Number"
                        required
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 5, color: '#1D2A35', fontSize: 14, fontWeight: 600 }}>Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        required
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 5, color: '#1D2A35', fontSize: 14, fontWeight: 600 }}>Message</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your fleet, routes, or any other relevant information..."
                        rows={4}
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div style={{ color: '#c0392b', fontSize: 14, textAlign: 'center' }}>Something went wrong. Please try again.</div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, height: 52, fontWeight: 800, fontSize: 16, cursor: status === 'sending' ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(255,215,0,0.3)', transition: 'all 0.3s ease', width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}
                    onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,215,0,0.4)'; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,215,0,0.3)'; }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Submit Registration'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
