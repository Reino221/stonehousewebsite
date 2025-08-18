import { useContext, useState } from 'react';
import { ThemeContext } from './_app';

export default function Minerals() {
  const { theme } = useContext(ThemeContext);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeQuoteType, setActiveQuoteType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    mineralType: '',
    paymentProcedure: '',
    quantity: '',
    message: '',
    address: '',
    comments: '',
  });

  // Helper to open form
  const openQuoteForm = (quoteType) => {
    setActiveQuoteType(quoteType);
    setFormData({
      ...formData,
      product: `${quoteType} Quotation`
    });
    setShowQuoteForm(true);
  };

  // Helper to close form
  const closeQuoteForm = () => {
    setShowQuoteForm(false);
    setActiveQuoteType('');
  };

  // Helper function to get mineral options based on quote type
  const getMineralOptions = (quoteType) => {
    switch (quoteType) {
      case 'Coal':
        return ['Anthracite Coal', 'Bituminous Coal', 'Sub-bituminous Coal', 'Lignite Coal'];
      case 'Anthracite':
        return ['Russian Anthracite', 'Vietnamese Anthracite', 'South African Anthracite'];
      case 'Chrome':
        return ['Chrome Ore', 'Ferrochrome', 'Chrome Concentrates'];
      default:
        return [];
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: theme === 'dark' ? '#181d23' : '#e5e5e5',
      padding: '2rem 1rem',
    }}>
      {/* Hero Section with Background */}
      <div style={{
        width: 'calc(100% - 2rem)',
        maxWidth: 1200,
        height: 400,
        borderRadius: '24px',
        backgroundImage: 'url("/Coal.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
          borderRadius: '24px',
        }} />
        
        {/* Hero Content */}
        <div style={{ 
          position: 'absolute', 
          top: '35%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          textAlign: 'center', 
          color: '#fff',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            textShadow: '0 4px 8px rgba(255,215,0,0.8)',
          }}>
            Minerals
          </h1>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            maxWidth: '600px',
          }}>
            Mining operations and mineral extraction services with advanced geological exploration
          </p>
        </div>
        
        {/* Quotation Buttons positioned at bottom like refineries */}
        <div style={{
          position: 'absolute',
          bottom: '2.2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.8rem',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '700px',
          zIndex: 2,
          pointerEvents: 'auto',
        }}>
          {/* Coal Quotation Button */}
          <button
            style={{
              background: '#fff',
              color: '#1D2A35',
              border: '2.5px solid #FFD700',
              borderRadius: 50,
              padding: '0.8rem 1.2rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              outline: 'none',
              minWidth: 140,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
              letterSpacing: 0.1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            }}
            onClick={() => openQuoteForm('Coal')}
          >
            Coal Quotation
          </button>

          {/* Anthracite Quotation Button */}
          <button
            style={{
              background: '#fff',
              color: '#1D2A35',
              border: '2.5px solid #FFD700',
              borderRadius: 50,
              padding: '0.8rem 1.2rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              outline: 'none',
              minWidth: 140,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
              letterSpacing: 0.1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            }}
            onClick={() => openQuoteForm('Anthracite')}
          >
            Anthracite Quotation
          </button>

          {/* Chrome Quotation Button */}
          <button
            style={{
              background: '#fff',
              color: '#1D2A35',
              border: '2.5px solid #FFD700',
              borderRadius: 50,
              padding: '0.8rem 1.2rem',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              outline: 'none',
              minWidth: 140,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
              letterSpacing: 0.1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)';
            }}
            onClick={() => openQuoteForm('Chrome')}
          >
            Chrome Quotation
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        width: '100%',
        maxWidth: 1000,
        background: theme === 'dark' ? '#232b36' : '#ffffff',
        borderRadius: '24px',
        padding: '3rem 2rem',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
        border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
          textShadow: '0 2px 4px rgba(255,215,0,0.5)',
        }}>
          Coming Soon
        </h2>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: theme === 'dark' ? '#cbd5e0' : '#4a5568',
        }}>
          <p>
            Our Minerals division is currently under development. Please check back soon for updates.
          </p>
        </div>
      </div>

      {/* Modal - EXACT COPY from Refineries */}
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
                onSubmit={e => {
                  e.preventDefault();
                  // Handle form submission here
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Mineral Type dropdown */}
                <div>
                  <select
                    value={formData.mineralType}
                    onChange={e => setFormData({ ...formData, mineralType: e.target.value })}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, background: '#fff', color: formData.mineralType ? '#1D2A35' : '#999', boxSizing: 'border-box', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select {activeQuoteType} Type</option>
                    {getMineralOptions(activeQuoteType).map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                {/* Payment Procedure selector */}
                <div>
                  <select
                    value={formData.paymentProcedure}
                    onChange={e => setFormData({ ...formData, paymentProcedure: e.target.value })}
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, background: '#fff', color: formData.paymentProcedure ? '#1D2A35' : '#999', boxSizing: 'border-box', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="" disabled>Payment Procedure</option>
                    <option value="Tradesafe - Purchase Order">Tradesafe - Purchase Order</option>
                  </select>
                </div>
                
                {/* Name */}
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                
                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                
                {/* Company */}
                <div>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                
                {/* Quantity */}
                <div>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Quantity needed"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                  />
                </div>
                
                {/* Comments */}
                <div>
                  <textarea
                    value={formData.comments}
                    onChange={e => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Additional comments (optional)"
                    style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', minHeight: 100, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>
                
                {/* Submit Button */}
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
  );
}
