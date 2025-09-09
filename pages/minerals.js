import Head from 'next/head';
import { useContext, useState } from 'react';
import { ThemeContext, AuthKycContext } from './_app';

export default function Minerals() {
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
    // Reset the mineralType (product selection) when form closes
    setFormData(prevData => ({
      ...prevData,
      mineralType: ''
    }));
    // Reset ROM ranges when form closes
    setSelectedROMRanges([]);
    setSelectedConcentrateRanges([]);
  };

  // Function to handle ROM range selection
  const handleROMRangeChange = (range) => {
    setSelectedROMRanges(prev => {
      if (prev.includes(range)) {
        return prev.filter(r => r !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  // Function to handle Concentrate range selection
  const handleConcentrateRangeChange = (range) => {
    setSelectedConcentrateRanges(prev => {
      if (prev.includes(range)) {
        return prev.filter(r => r !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  // Helper function to get mineral options based on quote type
  const getMineralOptions = (quoteType) => {
    switch (quoteType) {
      case 'Coal':
        return [
          'RB1 WASHED',
          'RB2 WASHED', 
          'RB3 WASHED',
          'RB3 UNWASHED',
          'A GRADE - PEAS',
          'B GRADE - PEAS',
          'DUFF',
          'Spiral Duff',
          'ROM',
          '48 KCAL UNWASHED'
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
        <title>Minerals - Stonehouse Holdings | Coal & Chrome Trading</title>
        <meta name="description" content="Stonehouse Holdings Minerals division - Crushing and screening of our own coal, and trading in minerals including chrome." />
      </Head>
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
        
        {/* Title */}
        <div style={{ position: 'absolute', top: 32, left: 0, width: '100%', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 1rem' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}>
            Minerals
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', 
            fontWeight: 500, 
            color: '#fff', 
            textShadow: '0 2px 4px rgba(0,0,0,0.6)', 
            marginBottom: 0,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.4',
            padding: '0 1rem'
          }}>
            Crushing and screening of our own coal, and trading in minerals
          </p>
        </div>
        
        {/* Quote Buttons */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 32, left: 0, width: '100%', zIndex: 3, gap: '0.4rem' }}>
          {['Coal', 'Chrome'].map((name) => (
            <button
              key={name}
              style={{ background: '#fff', color: '#1D2A35', border: '2px solid #FFD700', borderRadius: 40, width: 140, height: 48, fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'background 0.2s, color 0.2s, border 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', whiteSpace: 'nowrap', lineHeight: 1.12, letterSpacing: 0.03, userSelect: 'none', margin: 0, padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFD700'; e.currentTarget.style.color = '#1D2A35'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1D2A35'; }}
              onClick={() => openQuoteForm(name)}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: 800, marginBottom: 0 }}>{name}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.85 }}>Quote</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        width: '100%',
        maxWidth: 1000,
        background: theme === 'dark' ? '#232b36' : '#ffffff',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
        border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '2rem',
          textShadow: '0 2px 4px rgba(255,215,0,0.5)',
        }}>
          Quality Coal & Chrome. Trusted Partnerships. Reliable Supply
        </h2>
        
        {/* Washplant Image */}
        <div style={{
          textAlign: 'center',
          margin: '2rem 0',
        }}>
          <img 
            src="/washplant2.jpg" 
            alt="Coal Washplant Facility" 
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          />
        </div>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: theme === 'dark' ? '#cbd5e0' : '#4a5568',
        }}>
          <p>
            At Stonehouse Holdings, we supply quality coal that keeps industries moving. Working with trusted partners, our coal products are washed in-house using a jig plant to meet strict standards, ensuring reliable performance and value. In addition, we crush and screen peas and 48kcal, providing consistent, high-quality products across all our offerings. With a focus on consistency, trust, and strong relationships, we deliver solutions that work for your business.
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
                  
                  // Validate mandatory fields
                  if (!formData.name || !formData.email || !formData.company || !formData.contactNumber || !formData.quantity || !formData.mineralType) {
                    alert('Please fill in all mandatory fields: Name, Email, Company, Contact Number, Product, and Quantity');
                    return;
                  }
                  
                  // Validate ROM range selection for Chrome + ROM
                  if (activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && selectedROMRanges.length === 0) {
                    alert('Please select at least one ROM percentage range');
                    return;
                  }

                  // Validate Concentrate range selection for Chrome + Concentrate
                  if (activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && selectedConcentrateRanges.length === 0) {
                    alert('Please select at least one Concentrate percentage range');
                    return;
                  }
                  
                  // Basic email validation
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(formData.email)) {
                    alert('Please enter a valid email address');
                    return;
                  }
                  
                  // Handle form submission here
                  console.log('MINERALS Form submitted:', {
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    contactNumber: formData.contactNumber,
                    mineralType: formData.mineralType,
                    quantity: formData.quantity,
                    comments: formData.comments,
                    quoteType: activeQuoteType,
                    selectedROMRanges,
                    selectedConcentrateRanges,
                    destinationEmail: 'info@stonehouseltd.co.za'
                  });
                  
                  // Create email body
                  let emailBody = `MINERALS QUOTE REQUEST\n\n`;
                  emailBody += `CLIENT INFORMATION:\n`;
                  emailBody += `Name: ${formData.name}\n`;
                  emailBody += `Company: ${formData.company}\n`;
                  emailBody += `Email: ${formData.email}\n`;
                  emailBody += `Contact Number: ${formData.contactNumber}\n\n`;
                  emailBody += `PRODUCT INFORMATION:\n`;
                  emailBody += `Category: ${activeQuoteType}\n`;
                  emailBody += `Product: ${formData.mineralType}\n`;
                  
                  if (activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && selectedROMRanges.length > 0) {
                    emailBody += `ROM Percentage Ranges: ${selectedROMRanges.join(', ')}\n`;
                  }
                  if (activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && selectedConcentrateRanges.length > 0) {
                    emailBody += `Concentrate Percentage Ranges: ${selectedConcentrateRanges.join(', ')}\n`;
                  }
                  
                  emailBody += `Quantity: ${formData.quantity}\n\n`;
                  if (formData.comments) {
                    emailBody += `ADDITIONAL COMMENTS:\n${formData.comments}\n\n`;
                  }
                  emailBody += `Please provide a quotation for the above requirements.\n\n`;
                  emailBody += `Best regards,\n${formData.name}`;
                  
                  const emailSubject = `Minerals Quote Request - ${activeQuoteType} - ${formData.company}`;
                  const mailtoLink = `mailto:info@stonehouseltd.co.za?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                  
                  window.location.href = mailtoLink;
                  
                  // Add to quote history if user is signed in
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
                  
                  alert('Quote request submitted successfully!');
                  closeQuoteForm();
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 25 }}
              >
                {/* Client Information Section */}
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  border: '2px solid #e9ecef' 
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: '#495057', 
                    marginBottom: '15px',
                    borderBottom: '2px solid #dee2e6',
                    paddingBottom: '8px'
                  }}>
                    Client Information
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* Name */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Full Name"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                        required
                      />
                    </div>
                    
                    {/* Company */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Company *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                        required
                      />
                    </div>
                    
                    {/* Contact Number */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="Contact Number"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                        required
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Product Information Section */}
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  border: '2px solid #e9ecef' 
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: '#495057', 
                    marginBottom: '15px',
                    borderBottom: '2px solid #dee2e6',
                    paddingBottom: '8px'
                  }}>
                    Product Information
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* Mineral Type dropdown */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Select {activeQuoteType} Product *
                      </label>
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
                    
                    {/* ROM Range Selection - Only show for Chrome with ROM product */}
                    {activeQuoteType === 'Chrome' && formData.mineralType === 'ROM' && (
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#1D2A35', marginBottom: 10 }}>
                          Select ROM Percentage Range(s) *
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          {['28% - 30%', '30% - 32%', '32% - 34%', '34% - 36%', '36% - 38%', '38% - 40%', '40% - 42%'].map((range) => (
                            <label key={range} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, border: '2px solid #e0e0e0', background: selectedROMRanges.includes(range) ? '#FFD700' : '#fff', transition: 'all 0.2s' }}>
                              <input
                                type="checkbox"
                                checked={selectedROMRanges.includes(range)}
                                onChange={() => handleROMRangeChange(range)}
                                style={{ marginRight: 8, accentColor: '#C99700' }}
                              />
                              <span style={{ fontSize: 14, fontWeight: 500, color: selectedROMRanges.includes(range) ? '#1D2A35' : '#666' }}>
                                {range}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Concentrate Range Selection - Only show for Chrome with Concentrate product */}
                    {activeQuoteType === 'Chrome' && formData.mineralType === 'Concentrate' && (
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#1D2A35', marginBottom: 10 }}>
                          Select Concentrate Percentage Range(s) *
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          {['38% - 40%', '40% - 42%', '42% - 44%', '44% - 46%', '46% - 48%'].map((range) => (
                            <label key={range} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px 12px', borderRadius: 8, border: '2px solid #e0e0e0', background: selectedConcentrateRanges.includes(range) ? '#FFD700' : '#fff', transition: 'all 0.2s' }}>
                              <input
                                type="checkbox"
                                checked={selectedConcentrateRanges.includes(range)}
                                onChange={() => handleConcentrateRangeChange(range)}
                                style={{ marginRight: 8, accentColor: '#C99700' }}
                              />
                              <span style={{ fontSize: 14, fontWeight: 500, color: selectedConcentrateRanges.includes(range) ? '#1D2A35' : '#666' }}>
                                {range}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Quantity */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Quantity Needed (tons) *
                      </label>
                      <input
                        type="text"
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="Quantity Needed (tons)"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information Section */}
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  border: '2px solid #e9ecef' 
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: 700, 
                    color: '#495057', 
                    marginBottom: '15px',
                    borderBottom: '2px solid #dee2e6',
                    paddingBottom: '8px'
                  }}>
                    Special Requirements
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* Comments */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Additional Comments (optional)
                      </label>
                      <textarea
                        value={formData.comments}
                        onChange={e => setFormData({ ...formData, comments: e.target.value })}
                        placeholder="Additional comments or special requirements"
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', minHeight: 100, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>
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
    </>
  );
}
