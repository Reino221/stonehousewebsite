import Head from 'next/head';
import { useContext, useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ThemeContext, AuthKycContext } from './_app';

export default function MineralResources() {
  const { theme } = useContext(ThemeContext);
  const { isSignedIn, addQuoteToHistory } = useContext(AuthKycContext);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeQuoteType, setActiveQuoteType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    contactNumber: '',
    product: '',
    mineralType: '',
    paymentProcedure: '',
    quantity: '',
    message: '',
    address: '',
    comments: '',
  });
  const [selectedROMRanges, setSelectedROMRanges] = useState([]);
  const [selectedConcentrateRanges, setSelectedConcentrateRanges] = useState([]);
  const [quoteStatus, setQuoteStatus] = useState('idle');
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openQuoteForm = (quoteType) => {
    setActiveQuoteType(quoteType);
    setFormData({
      ...formData,
      product: `${quoteType} Quotation`
    });
    setShowQuoteForm(true);
  };

  const closeQuoteForm = () => {
    setShowQuoteForm(false);
    setActiveQuoteType('');
    setFormData(prevData => ({
      ...prevData,
      mineralType: ''
    }));
    setSelectedROMRanges([]);
    setSelectedConcentrateRanges([]);
  };

  const handleROMRangeChange = (range) => {
    setSelectedROMRanges(prev => {
      if (prev.includes(range)) {
        return prev.filter(r => r !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  const handleConcentrateRangeChange = (range) => {
    setSelectedConcentrateRanges(prev => {
      if (prev.includes(range)) {
        return prev.filter(r => r !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  const getMineralOptions = (quoteType) => {
    switch (quoteType) {
      case 'Coal':
        return [
          'RB1',
          'RB2',
          'RB3',
          'A GRADE - PEAS',
          'B GRADE - PEAS',
          'DUFF',
          'Spiral Duff',
          'ROM',
          '48 KCAL'
        ];
      case 'Anthracite':
        return ['NUTS', 'PEAS', 'GRAINS', 'DUFF'];
      case 'Chrome':
        return ['ROM', 'Concentrate'];
      default:
        return [];
    }
  };

  return (
    <>
      <Head>
        <title>Mineral Resources - Stonehouse Holdings | Coal & Chrome Trading</title>
        <meta name="description" content="Stonehouse Holdings Mineral Resources division - Expert sourcing, processing, and trading of bulk minerals including coal and chrome across Southern Africa." />
      </Head>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', marginTop: '-5.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{`
          @keyframes kenburns {
            0%   { transform: scale(1)    translateX(0%)   translateY(0%); }
            25%  { transform: scale(1.08) translateX(-2%)  translateY(-1%); }
            50%  { transform: scale(1.12) translateX(2%)   translateY(-2%); }
            75%  { transform: scale(1.06) translateX(-1%)  translateY(1%); }
            100% { transform: scale(1)    translateX(0%)   translateY(0%); }
          }
        `}</style>
        <div style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', zIndex: 0, transform: `translateY(${parallaxOffset}px)`, willChange: 'transform' }}>
          <img
            src="/Minerals.jpg"
            alt="Mineral Resources"
            style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 18s ease-in-out infinite', transformOrigin: 'center center', willChange: 'transform' }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,22,35,0.72)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 860, marginTop: '-2rem' }}>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.2rem', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Minerals &amp; Resources
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'rgba(255,255,255,0.82)', maxWidth: 620, margin: '0 auto 2.5rem auto', lineHeight: 1.75 }}>
            Expert sourcing, processing, and trading of bulk minerals across Southern Africa
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openQuoteForm('Coal')}
              style={{ background: 'linear-gradient(135deg, #C99700 0%, #FFD700 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', letterSpacing: '0.01em', boxShadow: '0 4px 16px rgba(200,160,0,0.3)' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Coal Quote
            </button>
            <button
              onClick={() => openQuoteForm('Chrome')}
              style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.55)', borderRadius: 50, padding: '0.9rem 2.6rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFD700'; e.currentTarget.style.color = '#FFD700'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'; e.currentTarget.style.color = '#fff'; }}
            >
              Chrome Quote
            </button>
          </div>
        </div>
      </section>

      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: theme === 'dark' ? '#181d23' : '#e5e5e5',
        padding: '4rem 1rem 2rem',
      }}>

        <div style={{ width: '100%', maxWidth: 1000, fontSize: '1.1rem', lineHeight: '1.85', color: theme === 'dark' ? '#cbd5e0' : '#4a5568' }}>
          <p style={{ marginBottom: '1.2rem' }}>
            At Stonehouse Holdings, our Minerals &amp; Resources division is dedicated to the responsible sourcing and supply of high-quality bulk minerals throughout Southern Africa. We specialise in coal and chrome, serving clients across the mining, industrial, and energy sectors with a commitment to product integrity and supply reliability.
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            We supply a comprehensive range of coal products, including washed and unwashed coal grades — catering to the specific requirements of each client:
          </p>
          <ul style={{ marginBottom: '1.2rem', paddingLeft: '1.4rem', lineHeight: 2 }}>
            {['RB1', 'RB2', 'RB3', 'A Grade Peas', 'B Grade Peas', 'Duff', 'Spiral Duff', 'ROM', '48 KCAL'].map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>
            In addition to coal, we trade in chrome ore, including ROM and Concentrate grades across a wide range of percentage specifications. With a focus on consistent quality, transparent pricing, and dependable logistics, Stonehouse Holdings is your trusted partner for mineral supply across the region.
          </p>
        </div>

        {/* Quote Modal */}
        {showQuoteForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }} onClick={closeQuoteForm}>
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                width: '100%',
                maxWidth: 420,
                minWidth: 350,
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                transform: 'scale(1)',
                transition: 'all 0.3s ease',
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeQuoteForm}
                style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999', borderRadius: '50%', width: 35, height: 35, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                aria-label="Close form"
                onMouseEnter={e => e.currentTarget.style.color = '#666'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >
                &times;
              </button>
              {/* Fixed Header */}
              <div style={{ padding: '30px 30px 20px', flexShrink: 0, background: '#fff', borderRadius: '20px 20px 0 0', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 22, color: '#C99700', marginBottom: 10 }}>{activeQuoteType}</div>
                <div style={{ color: '#1D2A35', fontWeight: 800, fontSize: 24 }}>Request a Quotation</div>
              </div>
              {/* Scrollable Body */}
              <div style={{ overflowY: 'auto', padding: '0 30px 30px', flexGrow: 1 }}>
                <form
                  onSubmit={async e => {
                    e.preventDefault();

                    if (!formData.name || !formData.email || !formData.company || !formData.contactNumber || !formData.quantity || !formData.mineralType) {
                      alert('Please fill in all mandatory fields: Name, Email, Company, Contact Number, Product, and Quantity');
                      return;
                    }

                    if (activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && selectedROMRanges.length === 0) {
                      alert('Please select at least one ROM percentage range');
                      return;
                    }

                    if (activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && selectedConcentrateRanges.length === 0) {
                      alert('Please select at least one Concentrate percentage range');
                      return;
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(formData.email)) {
                      alert('Please enter a valid email address');
                      return;
                    }

                    setQuoteStatus('sending');

                    let messageBody = `MINERALS QUOTE REQUEST\n\n`;
                    messageBody += `CLIENT INFORMATION:\n`;
                    messageBody += `Company: ${formData.company}\n`;
                    messageBody += `Contact Number: ${formData.contactNumber}\n\n`;
                    messageBody += `PRODUCT INFORMATION:\n`;
                    messageBody += `Category: ${activeQuoteType}\n`;
                    messageBody += `Product: ${formData.mineralType}\n`;
                    if (activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && selectedROMRanges.length > 0) {
                      messageBody += `ROM Percentage Ranges: ${selectedROMRanges.join(', ')}\n`;
                    }
                    if (activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && selectedConcentrateRanges.length > 0) {
                      messageBody += `Concentrate Percentage Ranges: ${selectedConcentrateRanges.join(', ')}\n`;
                    }
                    messageBody += `Quantity: ${formData.quantity}\n`;
                    if (formData.comments) {
                      messageBody += `\nADDITIONAL COMMENTS:\n${formData.comments}`;
                    }

                    try {
                      await emailjs.send(
                        'service_g1o5fie',
                        'template_l2ymoy9',
                        {
                          title: `Minerals Quote Request - ${activeQuoteType} - ${formData.company}`,
                          name: formData.name,
                          email: formData.email,
                          phone: formData.contactNumber,
                          message: messageBody,
                        },
                        'c2gSi34Kn0jIOl2S7'
                      );
                      if (isSignedIn) {
                        addQuoteToHistory({
                          product: `Minerals - ${activeQuoteType}`,
                          name: formData.name,
                          email: formData.email,
                          company: formData.company,
                          contactNumber: formData.contactNumber,
                          mineralType: formData.mineralType,
                          quantity: formData.quantity,
                          message: formData.comments || 'No additional comments',
                          romRanges: selectedROMRanges.length > 0 ? selectedROMRanges.join(', ') : null,
                          concentrateRanges: selectedConcentrateRanges.length > 0 ? selectedConcentrateRanges.join(', ') : null
                        });
                      }
                      setQuoteStatus('idle');
                      alert('Quote request submitted successfully! We will be in touch shortly.');
                      closeQuoteForm();
                    } catch {
                      setQuoteStatus('idle');
                      alert('Something went wrong. Please try again.');
                    }
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 25 }}
                >
                  {/* Client Information */}
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '2px solid #e9ecef' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#495057', marginBottom: '15px', borderBottom: '2px solid #dee2e6', paddingBottom: '8px' }}>
                      Client Information
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Full Name *</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Company *</label>
                        <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Company" style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Contact Number *</label>
                        <input type="tel" value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} placeholder="Contact Number" style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Email Address *</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address" style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
                      </div>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '2px solid #e9ecef' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#495057', marginBottom: '15px', borderBottom: '2px solid #dee2e6', paddingBottom: '8px' }}>
                      Product Information
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Select {activeQuoteType} Product *</label>
                        <select
                          value={formData.mineralType}
                          onChange={e => setFormData({ ...formData, mineralType: e.target.value })}
                          style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, background: '#fff', color: formData.mineralType ? '#1D2A35' : '#999', boxSizing: 'border-box', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                          required
                        >
                          <option value="" disabled>Select {activeQuoteType} Product</option>
                          {getMineralOptions(activeQuoteType).map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      {activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && (
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1D2A35', marginBottom: 10 }}>Select ROM Percentage Range(s) *</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {['28% - 30%', '30% - 32%', '32% - 34%', '34% - 36%', '36% - 38%', '38% - 40%', '40% - 42%'].map((range) => (
                              <label key={range} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, border: '2px solid #e0e0e0', background: selectedROMRanges.includes(range) ? '#FFD700' : '#fff', transition: 'all 0.2s' }}>
                                <input type="checkbox" checked={selectedROMRanges.includes(range)} onChange={() => handleROMRangeChange(range)} style={{ marginRight: 8, accentColor: '#C99700' }} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: selectedROMRanges.includes(range) ? '#1D2A35' : '#666' }}>{range}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && (
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1D2A35', marginBottom: 10 }}>Select Concentrate Percentage Range(s) *</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {['38% - 40%', '40% - 42%', '42% - 44%', '44% - 46%', '46% - 48%'].map((range) => (
                              <label key={range} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, border: '2px solid #e0e0e0', background: selectedConcentrateRanges.includes(range) ? '#FFD700' : '#fff', transition: 'all 0.2s' }}>
                                <input type="checkbox" checked={selectedConcentrateRanges.includes(range)} onChange={() => handleConcentrateRangeChange(range)} style={{ marginRight: 8, accentColor: '#C99700' }} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: selectedConcentrateRanges.includes(range) ? '#1D2A35' : '#666' }}>{range}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Quantity Needed (tons) *</label>
                        <input type="text" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} placeholder="Quantity Needed (tons)" style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
                      </div>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '2px solid #e9ecef' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#495057', marginBottom: '15px', borderBottom: '2px solid #dee2e6', paddingBottom: '8px' }}>
                      Special Requirements
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#1D2A35', fontSize: '14px', fontWeight: 600 }}>Additional Comments (optional)</label>
                        <textarea
                          value={formData.comments}
                          onChange={e => setFormData({ ...formData, comments: e.target.value })}
                          placeholder="Additional comments or special requirements"
                          style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', minHeight: 100, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1D2A35', border: 'none', borderRadius: 50, height: 52, fontWeight: 800, fontSize: '16px', cursor: 'pointer', marginTop: 10, boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)', transition: 'all 0.3s ease', width: '100%' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.3)'; }}
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
