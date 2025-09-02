import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext, AuthKycContext } from './_app';

export default function Refineries() {
  const { theme } = useContext(ThemeContext);
  const { isSignedIn, addQuoteToHistory } = useContext(AuthKycContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState('');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    contactNumber: '',
    product: '',
    procedure: '',
    fobOption: '',
    quantity: '',
    comments: '',
    destinationPort: '',
  });
  const [tttAccepted, setTttAccepted] = useState(false);
  const [procedureAccepted, setProcedureAccepted] = useState(false);
  const [quantityError, setQuantityError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedOrigins, setSelectedOrigins] = useState([]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Function to extract min and max values from product string
  function getProductQuantityLimits(productString) {
    if (!productString) return null;
    
    const minMatch = productString.match(/MIN\s+([0-9,\s]+)/i);
    const maxMatch = productString.match(/MAX\s+([0-9,\s]+)/i);
    
    if (!minMatch || !maxMatch) return null;
    
    const min = parseInt(minMatch[1].replace(/[,\s]/g, ''));
    const max = parseInt(maxMatch[1].replace(/[,\s]/g, ''));
    
    return { min, max };
  }

  // Function to validate quantity against product limits
  function validateQuantity(quantity, product) {
    if (!quantity || !product) return 'Please enter a quantity and select a product.';
    
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      return 'Please enter a valid positive quantity.';
    }
    
    const limits = getProductQuantityLimits(product);
    if (!limits) return null; // No limits found, allow any positive number
    
    if (numQuantity < limits.min) {
      return `Quantity must be at least ${limits.min.toLocaleString()} for this product.`;
    }
    
    if (numQuantity > limits.max) {
      return `Quantity cannot exceed ${limits.max.toLocaleString()} for this product.`;
    }
    
    return null; // Valid quantity
  }

  // Function to handle origin selection
  function handleOriginChange(origin) {
    setSelectedOrigins(prev => {
      if (prev.includes(origin)) {
        return prev.filter(o => o !== origin);
      } else {
        return [...prev, origin];
      }
    });
  }

  function openModalForProduct(product) {
    setModalProduct(product);
    setForm({
      name: '',
      email: '',
      company: '',
      product: '',
      procedure: '',
      fobOption: '',
      quantity: '',
      comments: '',
      destinationPort: '',
    });
    setTttAccepted(false);
    setProcedureAccepted(false);
    setQuantityError('');
    setSelectedOrigins([]);
    setModalOpen(true);
  }

  return (
    <>
      <Head>
        <title>Refineries - Stonehouse Holdings | Global Petroleum Trading</title>
        <meta name="description" content="Stonehouse Holdings Refineries division - Global trading and distribution of petroleum products for industrial and commercial use." />
      </Head>
      <div style={{ width: '100%', minHeight: '100vh', background: theme === 'dark' ? '#181d23' : '#e5e5e5', padding: '2rem 1rem' }}>
      {/* Hero Section */}
      <div style={{ width: 'calc(100% - 2rem)', maxWidth: 1200, height: 400, borderRadius: 24, backgroundImage: 'url("/Refineries 2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Title */}
        <div style={{ position: 'absolute', top: 32, left: 0, width: '100%', zIndex: 2, textAlign: 'center', color: '#fff', padding: '0 1rem' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem', textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}>Refineries</h1>
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
            Global trading and distribution of petroleum products for industrial and commercial use
          </p>
        </div>
        {/* Quote Buttons - Mobile vs Desktop */}
        {isMobile ? (
          /* Mobile Dropdown */
          <div style={{ 
            position: 'absolute', 
            bottom: 32, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 3 
          }}>
            {/* Dropdown Button */}
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              style={{
                background: '#fff',
                color: '#1D2A35',
                border: '2px solid #FFD700',
                borderRadius: 40,
                width: 180,
                height: 48,
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#FFD700';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }}
            >
              Get Quote {mobileDropdownOpen ? '▲' : '▼'}
            </button>

            {/* Dropdown Menu */}
            {mobileDropdownOpen && (
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '8px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                border: '2px solid #FFD700',
                overflow: 'hidden',
                minWidth: '200px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {['Fuel', 'Fertilizer', 'Oil', 'Alcohols (Chem)', 'LPG / LNG', 'Bitumen', 'Pet Coke', 'Edible Oil'].map((name, index) => (
                  <button
                    key={name}
                    onClick={() => {
                      openModalForProduct(name);
                      setMobileDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#fff',
                      color: '#1D2A35',
                      border: 'none',
                      borderBottom: index < 7 ? '1px solid #f0f0f0' : 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#fff';
                    }}
                  >
                    {name} Quote
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Desktop Buttons */
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'flex-end', 
            position: 'absolute', 
            bottom: 32, 
            left: 0, 
            width: '100%', 
            zIndex: 3, 
            gap: '0.4rem' 
          }}>
            {['Fuel', 'Fertilizer', 'Oil', 'Alcohols (Chem)', 'LPG / LNG', 'Bitumen', 'Pet Coke', 'Edible Oil'].map((name) => (
              <button
                key={name}
                style={{ 
                  background: '#fff', 
                  color: '#1D2A35', 
                  border: '2px solid #FFD700', 
                  borderRadius: 40, 
                  width: 140, 
                  height: 48, 
                  fontWeight: 700, 
                  fontSize: '0.82rem', 
                  cursor: 'pointer', 
                  transition: 'background 0.2s, color 0.2s, border 0.2s', 
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)', 
                  outline: 'none', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  textAlign: 'center', 
                  whiteSpace: 'nowrap', 
                  lineHeight: 1.12, 
                  letterSpacing: 0.03, 
                  userSelect: 'none', 
                  margin: 0, 
                  padding: 0 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = '#FFD700'; 
                  e.currentTarget.style.color = '#1D2A35'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = '#fff'; 
                  e.currentTarget.style.color = '#1D2A35'; 
                }}
                onClick={() => openModalForProduct(name)}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 800, marginBottom: 0 }}>{name}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.85 }}>Quote</span>
              </button>
            ))}
          </div>
        )}
        {/* Modal */}
        {modalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', boxSizing: 'border-box' }} onClick={() => setModalOpen(false)}>
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
                onClick={() => setModalOpen(false)}
                style={{ position: 'absolute', top: 15, right: 15, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999', borderRadius: '50%', width: 35, height: 35, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
                aria-label="Close form"
                onMouseEnter={e => e.currentTarget.style.color = '#666'}
                onMouseLeave={e => e.currentTarget.style.color = '#999'}
              >
                &times;
              </button>
              {/* Fixed Header */}
              <div style={{ padding: '30px 30px 20px', flexShrink: 0, background: '#fff', borderRadius: '20px 20px 0 0', textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 22, color: '#C99700', marginBottom: 10 }}>{modalProduct}</div>
                <div style={{ color: '#1D2A35', fontWeight: 800, fontSize: 24 }}>Request a Quotation</div>
              </div>
              {/* Scrollable Body */}
              <div style={{ overflowY: 'auto', padding: '0 30px 30px', flexGrow: 1 }}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    
                    // Validate required client information
                    if (!form.name.trim()) {
                      setSubmitMessage('Please enter your full name.');
                      return;
                    }
                    if (!form.company.trim()) {
                      setSubmitMessage('Please enter your company name.');
                      return;
                    }
                    if (!form.contactNumber.trim()) {
                      setSubmitMessage('Please enter your contact number.');
                      return;
                    }
                    if (!form.email.trim()) {
                      setSubmitMessage('Please enter your email address.');
                      return;
                    }
                    if (!form.product) {
                      setSubmitMessage('Please select a product.');
                      return;
                    }
                    
                    // Validate quantity based on selected product limits
                    const quantityValidationError = validateQuantity(form.quantity, form.product);
                    if (quantityValidationError) {
                      setQuantityError(quantityValidationError);
                      return;
                    }
                    
                    // Validate that at least one origin is selected
                    if (selectedOrigins.length === 0) {
                      setSubmitMessage('Please select at least one origin location.');
                      return;
                    }
                    
                    if (form.fobOption === 'FOB - TTT (TANK TO TANK)' && !procedureAccepted) {
                      setSubmitMessage('You must accept the FOB - TTT procedures to submit.');
                      return;
                    }
                    if (form.fobOption === 'FOB - TTV (TANK TO VESSEL)' && !procedureAccepted) {
                      setSubmitMessage('You must accept the FOB - TTV procedures to submit.');
                      return;
                    }
                    if (form.fobOption === 'FOB - TTO (TANK TAKE OVER)' && !procedureAccepted) {
                      setSubmitMessage('You must accept the FOB - TTO procedures to submit.');
                      return;
                    }
                    if (form.fobOption === 'FOB - VTO (VESSEL TAKE OVER)' && !procedureAccepted) {
                      setSubmitMessage('You must accept the FOB - VTO procedures to submit.');
                      return;
                    }
                    if (form.fobOption === 'CIF' && !procedureAccepted) {
                      setSubmitMessage('You must accept the CIF procedures to submit.');
                      return;
                    }
                    setQuantityError('');
                    
                    // Prepare email content
                    const emailSubject = `Refineries Quote Request - ${form.product}`;
                    const emailBody = `
REFINERIES QUOTE REQUEST

Product: ${form.product}
Quantity: ${form.quantity} MT
FOB Option: ${form.fobOption}
Destination Port: ${form.destinationPort}

Client Information:
Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Contact Number: ${form.contactNumber}

Origin Locations: ${selectedOrigins.join(', ')}

Additional Comments: ${form.comments || 'None'}

Procedure: ${form.procedure}

---
This quote request was submitted via the Stonehouse Holdings website.
                    `.trim();

                    // Create mailto link
                    const mailtoLink = `mailto:stonehouseholdings24@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                    
                    // Open email client
                    window.location.href = mailtoLink;
                    
                    console.log('REFINERIES Form submitted:', {
                      ...form,
                      selectedOrigins,
                      destinationEmail: 'stonehouseholdings24@gmail.com'
                    });
                    
                    // Add to quote history if user is signed in
                    if (isSignedIn) {
                      addQuoteToHistory({
                        product: `Refineries - ${form.product}`,
                        name: form.name,
                        email: form.email,
                        company: form.company,
                        productType: form.product,
                        procedure: form.procedure,
                        fobOption: form.fobOption,
                        quantity: form.quantity,
                        destinationPort: form.destinationPort,
                        origins: selectedOrigins.length > 0 ? selectedOrigins.join(', ') : null,
                        message: form.comments || 'No additional comments'
                      });
                    }
                    
                    setSubmitMessage('Opening email client... Please send the email to complete your quote request.');
                    // Reset form after brief delay
                    setTimeout(() => {
                      setForm({
                        name: '',
                        email: '',
                        company: '',
                        contactNumber: '',
                        product: '',
                        procedure: '',
                        fobOption: '',
                        quantity: '',
                        comments: '',
                        destinationPort: '',
                      });
                      setSelectedOrigins([]);
                      setProcedureAccepted(false);
                      setTttAccepted(false);
                      setModalOpen(false);
                      setSubmitMessage('');
                    }, 3000);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                >
                  {/* Client Information Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ 
                      color: '#1D2A35', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      marginBottom: '15px', 
                      marginTop: '0' 
                    }}>
                      Client Information
                    </h3>
                    
                    {/* Full Name */}
                    <div style={{ marginBottom: '15px' }}>
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
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          fontSize: '15px', 
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff'
                        }}
                      />
                    </div>

                    {/* Company */}
                    <div style={{ marginBottom: '15px' }}>
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
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Enter your company name"
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          fontSize: '15px', 
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff'
                        }}
                      />
                    </div>

                    {/* Contact Number */}
                    <div style={{ marginBottom: '15px' }}>
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
                        value={form.contactNumber}
                        onChange={e => setForm(f => ({ ...f, contactNumber: e.target.value }))}
                        placeholder="Enter your contact number"
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          fontSize: '15px', 
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff'
                        }}
                      />
                    </div>

                    {/* Email Address */}
                    <div style={{ marginBottom: '0' }}>
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
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="Enter your email address"
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          fontSize: '15px', 
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Selection Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ 
                      color: '#1D2A35', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      marginBottom: '15px', 
                      marginTop: '0' 
                    }}>
                      Product Information
                    </h3>

                  {/* Product dropdown */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#1D2A35', 
                      fontSize: '14px', 
                      fontWeight: 600 
                    }}>
                      Select Product *
                    </label>
                    <select
                      value={form.product}
                      onChange={e => {
                        const newProduct = e.target.value;
                        setForm(f => ({ ...f, product: newProduct }));
                        // Re-validate quantity when product changes
                        if (form.quantity) {
                          const error = validateQuantity(form.quantity, newProduct);
                          setQuantityError(error || '');
                        }
                      }}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, background: '#fff', color: form.product ? '#1D2A35' : '#999', boxSizing: 'border-box', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select Product</option>
                      {modalProduct === 'Fuel' ? (
                        <>
                          <option value="JET A1 - BBLS (MIN 350 000 - MAX 3 000 000) PM">JET A1 - BBLS (MIN 350 000 - MAX 3 000 000) PM</option>
                          <option value="EN590 (MIN 50 000 - MAX 300 000) MT PM">EN590 (MIN 50 000 - MAX 300 000) MT PM</option>
                          <option value="EN590 EURO 5 (ULSD 10 PPM) (MIN 50 000 - MAX 500 000) MT PM">EN590 EURO 5 (ULSD 10 PPM) (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="EN590 EURO 6 (ULSD 10 PPM) (MIN 50 000 - MAX 500 000) MT PM">EN590 EURO 6 (ULSD 10 PPM) (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="DIESEL D2 AUTOMOTIVE GAS OIL (MIN 50 000 - MAX 500 000) MT PM">DIESEL D2 AUTOMOTIVE GAS OIL (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="MARINE FUEL / GAS OIL (MIN 50 000 - MAX 500 000) MT PM">MARINE FUEL / GAS OIL (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="AUTOMOTIVE DIESEL OIL (MIN 50 000 - MAX 500 000) MT PM">AUTOMOTIVE DIESEL OIL (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="NAPTHA (MIN 50 000 - MAX 500 000) MT PM">NAPTHA (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="VIRGIN FUEL D6 - GALLONS (MIN 25 - MAX 400) MM PM">VIRGIN FUEL D6 - GALLONS (MIN 25 - MAX 400) MM PM</option>
                          <option value="JP54 - BBLS (MIN 350 000 - MAX 3 000 000) PM">JP54 - BBLS (MIN 350 000 - MAX 3 000 000) PM</option>
                          <option value="DIESEL D2 GASOIL GOST 305-2013 (MIN 50 000 -MAX 3 000 000) PM">DIESEL D2 GASOIL GOST 305-2013 (MIN 50 000 -MAX 3 000 000) PM</option>
                          <option value="WTI - BBLS (MIN 500 000 - MAX 3 000 000) PM">WTI - BBLS (MIN 500 000 - MAX 3 000 000) PM</option>
                          <option value="MAZUT M100 GOST 10585-99 (MIN 50 000 - MAX 200 000) MT PM">MAZUT M100 GOST 10585-99 (MIN 50 000 - MAX 200 000) MT PM</option>
                          <option value="ESPO - BBL (MIN 50 000 - MAX 3 000 000) PM">ESPO - BBL (MIN 50 000 - MAX 3 000 000) PM</option>
                        </>
                      ) : modalProduct === 'LPG / LNG' ? (
                        <>
                          <option value="LPG BUTANE 50 / PROPANE 50 (MIN 50 000 - MAX 500 000) MT PM">LPG BUTANE 50 / PROPANE 50 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="LPG BUTANE 60 / PROPANE 40 (MIN 50 000 - MAX 500 000) MT PM">LPG BUTANE 60 / PROPANE 40 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="LPG BUTANE 70 / PROPANE 30 (MIN 50 000 - MAX 500 000) MT PM">LPG BUTANE 70 / PROPANE 30 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="LPG GAS C4 (MIN 50 000 - MAX 500 000) MT PM">LPG GAS C4 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="LNG (MIN 50 000 - MAX 500 000) MT PM">LNG (MIN 50 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Oil' ? (
                        <>
                          <option value="ESPO CRUDE OIL - BBLS (MIN 500 000 - MAX 5 000 000) PM">ESPO CRUDE OIL - BBLS (MIN 500 000 - MAX 5 000 000) PM</option>
                          <option value="LIGHT CYCLE OIL (MIN 50 000 - MAX 500 000) MT PM">LIGHT CYCLE OIL (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BASE OIL SN 100 (MIN 50 000 - MAX 500 000) MT PM">BASE OIL SN 100 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BASE OIL SN 150 (MIN 50 000 - MAX 500 000) MT PM">BASE OIL SN 150 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BASE OIL SN 300 (MIN 50 000 - MAX 500 000) MT PM">BASE OIL SN 300 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BASE OIL SN 500 (MIN 50 000 - MAX 500 000) MT PM">BASE OIL SN 500 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BASE OIL BS 150 (MIN 50 000 - MAX 500 000) MT PM">BASE OIL BS 150 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="N 40 (MIN 50 000 - MAX 500 000) MT PM">N 40 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="FUEL OIL CST 180 (MIN 50 000 - MAX 500 000) MT PM">FUEL OIL CST 180 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="FUEL OIL CST 280 (MIN 50 000 - MAX 500 000) MT PM">FUEL OIL CST 280 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="FUEL OIL CST 380 (MIN 50 000 - MAX 500 000) MT PM">FUEL OIL CST 380 (MIN 50 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Bitumen' ? (
                        <>
                          <option value="BITUMEN 30/40 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 30/40 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN 40/50 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 40/50 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN 50/70 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 50/70 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN 60/70 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 60/70 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN 80/100 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 80/100 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN 100/120 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN 100/120 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN VISCOSITY GRADE - 10 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN VISCOSITY GRADE - 10 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN VISCOSITY GRADE - 20 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN VISCOSITY GRADE - 20 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN VISCOSITY GRADE - 30 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN VISCOSITY GRADE - 30 (MIN 50 000 - MAX 500 000) MT PM</option>
                          <option value="BITUMEN VISCOSITY GRADE - 40 (MIN 50 000 - MAX 500 000) MT PM">BITUMEN VISCOSITY GRADE - 40 (MIN 50 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Pet Coke' ? (
                        <>
                          <option value="PET COKE (ALL GRADES) (MIN 100 000 - MAX 750 000) MT PM">PET COKE (ALL GRADES) (MIN 100 000 - MAX 750 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Alcohols (Chem)' ? (
                        <>
                          <option value="ETHANOL (MIN 30 000 - MAX 500 000) MT PM">ETHANOL (MIN 30 000 - MAX 500 000) MT PM</option>
                          <option value="METHANOL (MIN 30 000 - MAX 500 000) MT PM">METHANOL (MIN 30 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Fertilizer' ? (
                        <>
                          <option value="UREA N46 - PRILLED (MIN 10 000 - MAX 500 000) MT PM">UREA N46 - PRILLED (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="UREA N46 - GRANULATED (MIN 10 000 - MAX 500 000) MT PM">UREA N46 - GRANULATED (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="DAP (DI-AMONIUM PHOSPHATE) (MIN 10 000 - MAX 500 000) MT PM">DAP (DI-AMONIUM PHOSPHATE) (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="NPK (MIN 10 000 - MAX 500 000) MT PM">NPK (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="SUPLHER (MIN 10 000 - MAX 500 000) MT PM">SUPLHER (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="AMMONIUM NITRATE (MIN 10 000 - MAX 500 000) MT PM">AMMONIUM NITRATE (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="MOP - POTASSIUM CHLORIDE / MURIATE OF POTASH (MIN 10 000 - MAX 500 000) MT PM">MOP - POTASSIUM CHLORIDE / MURIATE OF POTASH (MIN 10 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : modalProduct === 'Edible Oil' ? (
                        <>
                          <option value="SUNFLOWER OIL - CRUDE (MIN 10 000 - MAX 500 000) MT PM">SUNFLOWER OIL - CRUDE (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="SUNFLOWER OIL - REFINED (MIN 10 000 - MAX 500 000) MT PM">SUNFLOWER OIL - REFINED (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="RAPESEED OIL - CRUDE (MIN 10 000 - MAX 500 000) MT PM">RAPESEED OIL - CRUDE (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="RAPESEED OIL - REFINED (MIN 10 000 - MAX 500 000) MT PM">RAPESEED OIL - REFINED (MIN 10 000 - MAX 500 000) MT PM</option>
                          <option value="RAPESEED OIL - CRUDE DEGUMMED (MIN 10 000 - MAX 500 000) MT PM">RAPESEED OIL - CRUDE DEGUMMED (MIN 10 000 - MAX 500 000) MT PM</option>
                        </>
                      ) : (
                        <>
                          <option value="Edible Oil">Edible Oil</option>
                        </>
                      )}
                    </select>
                  </div>
                  </div>

                  {/* Procedure Options Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ 
                      color: '#1D2A35', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      marginBottom: '15px', 
                      marginTop: '0' 
                    }}>
                      Procedure Information
                    </h3>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#1D2A35', 
                      fontSize: '14px', 
                      fontWeight: 600 
                    }}>
                      Select Procedure *
                    </label>
                  <div>
                    <select
                      value={form.fobOption}
                      onChange={e => setForm(f => ({ ...f, fobOption: e.target.value }))}
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, background: '#fff', color: form.fobOption ? '#1D2A35' : '#999', boxSizing: 'border-box', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select Procedure</option>
                      {modalProduct === 'LPG / LNG' || modalProduct === 'Bitumen' || modalProduct === 'Oil' || modalProduct === 'Pet Coke' || modalProduct === 'Alcohols (Chem)' || modalProduct === 'Fertilizer' || modalProduct === 'Edible Oil' ? (
                        <option value="CIF">ONLY CIF</option>
                      ) : (
                        <>
                          <option value="FOB - TTT (TANK TO TANK)">FOB - TTT (TANK TO TANK)</option>
                          <option value="FOB - TTV (TANK TO VESSEL)">FOB - TTV (TANK TO VESSEL)</option>
                          <option value="FOB - TTO (TANK TAKE OVER)">FOB - TTO (TANK TAKE OVER)</option>
                          <option value="FOB - VTO (VESSEL TAKE OVER)">FOB - VTO (VESSEL TAKE OVER)</option>
                          <option value="CIF">CIF</option>
                        </>
                      )}
                    </select>
                  </div>
                  </div>
                  </div>

                  {/* Origin and Destination Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ 
                      color: '#1D2A35', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      marginBottom: '15px', 
                      marginTop: '0' 
                    }}>
                      Origin & Destination
                    </h3>

                  {/* Select Origin */}
                  <div>
                    <div style={{ marginBottom: 10, fontWeight: 600, fontSize: 15, color: '#1D2A35' }}>
                      Select Origin (Select one or multiple locations)
                    </div>
                    <div 
                      className="refinery-checkboxes"
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                        gap: isMobile ? 12 : 10, 
                        padding: isMobile ? '12px 16px' : '14px 18px', 
                        borderRadius: 10, 
                        border: '2px solid #e0e0e0', 
                        background: '#fff',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      {['HOUSTON', 'ROTTERDAM', 'FUJAIRAH', 'JURONG', 'NINGBO-ZHOUSHAN', 'QINGDAO', 'KAZAKHSTAN'].map((origin) => (
                        <label key={origin}>
                          <input
                            type="checkbox"
                            checked={selectedOrigins.includes(origin)}
                            onChange={() => handleOriginChange(origin)}
                          />
                          {' '}{origin}
                        </label>
                      ))}
                      
                      <style jsx>{`
                        .refinery-checkboxes label {
                          display: inline-flex !important;
                          align-items: center !important;
                          gap: 4px !important;
                          margin-bottom: 6px;
                          cursor: pointer;
                          font-size: ${isMobile ? '15px' : '14px'};
                          color: #1D2A35;
                          font-weight: 500;
                        }

                        .refinery-checkboxes input[type="checkbox"] {
                          margin: 0 !important;
                          min-width: ${isMobile ? '18px' : '16px'};
                          min-height: ${isMobile ? '18px' : '16px'};
                          cursor: pointer;
                          flex-shrink: 0;
                        }
                      `}</style>
                    </div>
                    </div>
                    {selectedOrigins.length > 0 && (
                      <div style={{ color: '#38a169', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                        Selected: {selectedOrigins.join(', ')}
                      </div>
                    )}
                  </div>
                  </div>

                  {/* Order Details Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '20px', 
                    borderRadius: '10px', 
                    border: '2px solid #e0e0e0',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ 
                      color: '#1D2A35', 
                      fontSize: '18px', 
                      fontWeight: 700, 
                      marginBottom: '15px', 
                      marginTop: '0' 
                    }}>
                      Order Details
                    </h3>

                  {/* Quantity */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#1D2A35', 
                      fontSize: '14px', 
                      fontWeight: 600 
                    }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={e => {
                        const newQuantity = e.target.value;
                        setForm(f => ({ ...f, quantity: newQuantity }));
                        // Validate quantity in real-time
                        if (newQuantity && form.product) {
                          const error = validateQuantity(newQuantity, form.product);
                          setQuantityError(error || '');
                        } else if (!newQuantity) {
                          setQuantityError('');
                        }
                      }}
                      placeholder={form.product && getProductQuantityLimits(form.product) ? 
                        `Enter quantity (${getProductQuantityLimits(form.product).min.toLocaleString()} - ${getProductQuantityLimits(form.product).max.toLocaleString()})` : 
                        'Enter quantity'
                      }
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: quantityError ? '2px solid #e53e3e' : '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                    />
                    {quantityError && <div style={{ color: '#e53e3e', fontSize: 13, marginTop: 6, fontWeight: 500 }}>{quantityError}</div>}
                    {form.product && getProductQuantityLimits(form.product) && !quantityError && (
                      <div style={{ color: '#666', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                        Allowed range: {getProductQuantityLimits(form.product).min.toLocaleString()} - {getProductQuantityLimits(form.product).max.toLocaleString()}
                      </div>
                    )}
                  </div>
                  {/* Destination Port - Only show when CIF is selected */}
                  {form.fobOption === 'CIF' && (
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Destination Port *
                      </label>
                      <input
                        type="text"
                        value={form.destinationPort || ''}
                        onChange={e => setForm(f => ({ ...f, destinationPort: e.target.value }))}
                        placeholder="Enter destination port"
                        required
                        style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
                      />
                    </div>
                  )}
                  {/* Comments */}
                  <div style={{ marginBottom: '0' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      color: '#1D2A35', 
                      fontSize: '14px', 
                      fontWeight: 600 
                    }}>
                      Additional Comments
                    </label>
                    <textarea
                      value={form.comments}
                      onChange={e => setForm(f => ({ ...f, comments: e.target.value }))}
                      placeholder="Additional comments (optional)"
                      style={{ width: '100%', padding: '14px 18px', borderRadius: 10, border: '2px solid #e0e0e0', minHeight: 100, fontSize: 15, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>
                  </div>
                  
                  {/* FOB - TTT Procedures (only show when FOB - TTT is selected) */}
                  {form.fobOption === 'FOB - TTT (TANK TO TANK)' && (
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#C99700', marginBottom: 15, textAlign: 'center' }}>
                        FOB - TTT Non-Negotiable Procedures
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: '#495057', marginBottom: 15, maxHeight: 200, overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: 8, border: '1px solid #dee2e6' }}>
                        <p><strong>1.</strong> Buyer issues ICPO, Company Registration Certificate and TSA.</p>
                        <p><strong>2.</strong> Seller issues commercial invoice, Buyer signs and return commercial invoice along with an acceptance letter of commitment to execute transaction.</p>
                        <p><strong>3.</strong> Seller issues to Buyer the below Partial POP Documents:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>a. Statement of Product Availability.</p>
                          <p>b. Unconditional Commitment to Supply.</p>
                          <p>c. SGS/CCIC Chemical Testing Application Form issued by Seller, to be signed by Buyer for processing of Fresh SGS/CCIC.</p>
                          <p>d. Inspection Approval Letter to be signed by buyer's tank farm.</p>
                        </div>
                        <p><strong>4.</strong> Upon confirmation of the above documents by Buyer, Seller issues to the Buyer the below Full POP Documents:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>a. Injection Schedule.</p>
                          <p>b. Act of Transfer / Change of Ownership Documents.</p>
                          <p>c. Authority to Sell and Collect (ATSC)</p>
                          <p>d. Freshly Updated SGS/CCIC Report (72 Hours).</p>
                          <p>e. Injection / Q&Q Report.</p>
                          <p>f. Tank Storage Receipt (TSR) with tank number, GPS coordinates and tank location.</p>
                          <p>g. Authorization to Verify (ATV) physical verification.</p>
                          <p>h. Unconditional Dip Test Authorization (DTA).</p>
                        </div>
                        <p><strong>5.</strong> NCNDA/IMFPA is signed by all intermediaries / agents / mandates involved. Upon successful dip test by Buyer, Buyer presents its TSR and Seller injects product into Buyer's tanks and Buyer makes payment for the total value of product injected into the tanks by MT103/TT.</p>
                        <p><strong>6.</strong> Seller pays all intermediaries / agents / mandates involved in the transaction. Upon satisfaction by Buyer, both Buyer and Seller sign contract for monthly delivery with rolls and extension.</p>
                        <p><strong>7.</strong> Within 24 hours of the completion of the injection, the Seller pays commissions to all intermediaries involved for the initial lift and on all subsequent lifts.</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={procedureAccepted}
                          onChange={e => setProcedureAccepted(e.target.checked)}
                          id="procedureAccept"
                          style={{ marginTop: 4, minWidth: 16, minHeight: 16 }}
                        />
                        <label htmlFor="procedureAccept" style={{ fontSize: 14, color: '#1D2A35', fontWeight: 600, lineHeight: 1.4 }}>
                          I have read and accept the FOB - TTT non-negotiable procedures outlined above
                        </label>
                      </div>
                    </div>
                  )}

                  {/* FOB - TTV Procedures (only show when FOB - TTV is selected) */}
                  {form.fobOption === 'FOB - TTV (TANK TO VESSEL)' && (
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#C99700', marginBottom: 15, textAlign: 'center' }}>
                        FOB - TTV Non-Negotiable Procedures
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: '#495057', marginBottom: 15, maxHeight: 200, overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: 8, border: '1px solid #dee2e6' }}>
                        <p><strong>1.</strong> The Buyer issues an ICPO with banking details, buyer's passport and Charter Party Agreement (CPA).</p>
                        <p><strong>2.</strong> The Seller issues a Commercial Invoice for the product, Buyer countersigns and returns it to the seller.</p>
                        <p><strong>3.</strong> Buyer requests a 1-day invoice for tank storage extension and dip test in seller tanks when returning the CI. Seller receives the counter-signed CI.</p>
                        <p><strong>4.</strong> Upon receipt and confirmation of buyer payment seller issues the PPOP documents below:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>a. Authorization to Sell and Collect.</p>
                        </div>
                        <p><strong>5.</strong> Buyer signs and returns the "Authorization to Sell and Collect" document to the seller. Seller opens communication with the Tank Farm Management for product transfer registration. Upon the complete product transfer registration with the port authority by the tank farm, Seller issues the POP documents below:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>a. Tank Storage Receipt (TSR).</p>
                          <p>b. Product Passport/Analysis.</p>
                          <p>c. Product Certificate of Origin</p>
                          <p>d. Injection Report.</p>
                          <p>e. 24 Hours SGS Report.</p>
                          <p>f. Unconditional Dip-Test Authorization.</p>
                        </div>
                        <p><strong>6.</strong> (Optional) Buyer proceeds with its SGS team to re-conduct the inspection of the product in Seller's shore tanks.</p>
                        <p><strong>7.</strong> Upon the Buyer's successful verification of POP and Product Dip-Test in the seller's tanks, Seller issues the Tank to Vessel Injection Agreement (TVIA) and Tanker Injection Programming (TIP).</p>
                        <p><strong>8.</strong> Product injection begins into the Buyer's vessel. (Buyer may completely take over seller tanks for further product storage).</p>
                        <p><strong>9.</strong> After product Transfer & Injection into the buyer vessel has been completed, buyer makes the payment for the total product via MT103, seller transfers the Title Holder & Ownership of the product to the Buyer.</p>
                        <p><strong>10.</strong> After successful Trial Lift (First Lift), Seller issues SPA/Contract for 12 months with R&E to Buyer for processing.</p>
                        <p><strong>11.</strong> Seller issues NCNDA/IMFPA to be signed by all intermediaries involved in the transaction. Seller pays commissions to all intermediaries involved for the initial lift and all subsequent lifts.</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={procedureAccepted}
                          onChange={e => setProcedureAccepted(e.target.checked)}
                          id="procedureAcceptTTV"
                          style={{ marginTop: 4, minWidth: 16, minHeight: 16 }}
                        />
                        <label htmlFor="procedureAcceptTTV" style={{ fontSize: 14, color: '#1D2A35', fontWeight: 600, lineHeight: 1.4 }}>
                          I have read and accept the FOB - TTV non-negotiable procedures outlined above
                        </label>
                      </div>
                    </div>
                  )}

                  {/* FOB - TTO Procedures (only show when FOB - TTO is selected) */}
                  {form.fobOption === 'FOB - TTO (TANK TAKE OVER)' && (
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#C99700', marginBottom: 15, textAlign: 'center' }}>
                        FOB - TTO Non-Negotiable Procedures
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: '#495057', marginBottom: 15, maxHeight: 200, overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: 8, border: '1px solid #dee2e6' }}>
                        <p><strong>1.</strong> Buyer accepts the seller's working procedure and issues an Irrevocable Corporate Purchase Order (ICPO) with its banking details and signatory Passport copy.</p>
                        <p><strong>2.</strong> The Seller issues Commercial Invoice (CI) for the product, Buyer countersigns and returns to the Seller.</p>
                        <p><strong>3.</strong> Seller receives the countersigned CI, Buyer requests a 5-day (five day) tank extension invoice for the dip test in the Seller's tanks.</p>
                        <p><strong>4.</strong> Upon receipt of the Buyer's payment, the Seller opens communication with its Tank Farm Management for the creation, issuance, and Buyer's endorsement of the Tank Take Over documentation. Upon complete registration of the Buyer's documentation with the port authority, Seller issues the PPOP documents below:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>a. Authorization to Sell and Collect</p>
                          <p>b. Product Passport/Analysis.</p>
                          <p>c. Product Certificate of Origin.</p>
                          <p>d. Injection report.</p>
                          <p>e. Unconditional Dip-Test Authorization</p>
                        </div>
                        <p><strong>5.</strong> Buyer confirms receipt of the PPOP documents and conducts its inspection and Dip-Test with its SGS team. Upon successful verification of PPOP and the Dip Test in the Seller's tank, Buyer makes the payment for the total amount of the product via MT103. Seller confirms the Buyer's payment and transfers title ownership of the product to the Buyer. The Buyer then completely takes over Seller's storage tanks.</p>
                        <p><strong>6.</strong> After successful Trial Lift (First Lift), Seller issues SPA/Contract for 12 months with R&E to Buyer for processing.</p>
                        <p><strong>7.</strong> Within 24 hours of the completion of the injection, the Seller pays commissions to all intermediaries involved for the initial lift and on all subsequent lifts.</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={procedureAccepted}
                          onChange={e => setProcedureAccepted(e.target.checked)}
                          id="procedureAcceptTTO"
                          style={{ marginTop: 4, minWidth: 16, minHeight: 16 }}
                        />
                        <label htmlFor="procedureAcceptTTO" style={{ fontSize: 14, color: '#1D2A35', fontWeight: 600, lineHeight: 1.4 }}>
                          I have read and accept the FOB - TTO non-negotiable procedures outlined above
                        </label>
                      </div>
                    </div>
                  )}

                  {/* FOB - VTO Procedures (only show when FOB - VTO is selected) */}
                  {form.fobOption === 'FOB - VTO (VESSEL TAKE OVER)' && (
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#C99700', marginBottom: 15, textAlign: 'center' }}>
                        FOB - VTO Non-Negotiable Procedures
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: '#495057', marginBottom: 15, maxHeight: 200, overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: 8, border: '1px solid #dee2e6' }}>
                        <p><strong>1.</strong> Buyer issues an official ICPO with company registration license.</p>
                        <p><strong>2.</strong> Seller issues Takeover of Contract MOU to buyer; buyer signs and returns the Takeover of Contract MOU with an official acceptance letter to execute the transaction.</p>
                        <p><strong>3.</strong> Seller legalizes the Takeover of Contract MOU and within 48 hours releases copies to buyer with the PPOP/Shipping Documents:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>- Bill of Lading</p>
                          <p>- Vessel tanker details / Cargo manifest</p>
                          <p>- Product Passport (Analysis Test Report)</p>
                          <p>- 3% Payment Invoice</p>
                        </div>
                        <p><strong>4.</strong> Upon receipt of the above documents by the buyer, buyer verifies product availability/vessel positioning via the vessel master/captain and shipping company. Buyer, within 48 hours, makes the 3% partial payment of the onboard product quantity as a transaction commitment and security guarantee deposit/payment via T/T-MT103 to seller's nominated fiduciary bank. (Note: The 3% partial payment will be deducted from the product total value). NCNDA/IMFPA is signed by all parties.</p>
                        <p><strong>5.</strong> Upon receipt confirmation of the above payment, seller issues the following:</p>
                        <div style={{ marginLeft: 20 }}>
                          <p>- Act of Transfer/Change of Ownership Title Documents</p>
                          <p>- Loading Port SGS Test Report</p>
                          <p>- Product Approval to Export Certificate</p>
                          <p>- Product Export License Certificate</p>
                          <p>- Certificate of Origin</p>
                          <p>- Authorization to Board the Vessel (ATB)</p>
                          <p>- Dip Test Authorization (DTA)</p>
                        </div>
                        <p style={{ marginLeft: 20, fontStyle: 'italic' }}>All shipping documents will be re-issued in buyer's name and vessel will be sent/rerouted to the buyer's discharge port.</p>
                        <p><strong>6.</strong> Upon arrival of the vessel at discharge port and on successful discharge port SGS or equivalent inspection, buyer pays 97% balance payment of the total product value via T/T-MT103.</p>
                        <p><strong>7.</strong> Seller pays commission to all parties stipulated in the signed NCNDA/IMFPA within 72 hours.</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={procedureAccepted}
                          onChange={e => setProcedureAccepted(e.target.checked)}
                          id="procedureAcceptVTO"
                          style={{ marginTop: 4, minWidth: 16, minHeight: 16 }}
                        />
                        <label htmlFor="procedureAcceptVTO" style={{ fontSize: 14, color: '#1D2A35', fontWeight: 600, lineHeight: 1.4 }}>
                          I have read and accept the FOB - VTO non-negotiable procedures outlined above
                        </label>
                      </div>
                    </div>
                  )}

                  {/* CIF Procedures (only show when CIF is selected) */}
                  {form.fobOption === 'CIF' && (
                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: 12, border: '2px solid #e9ecef' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, color: '#C99700', marginBottom: 15, textAlign: 'center' }}>
                        {modalProduct === 'Fertilizer' || modalProduct === 'Edible Oil' ? 'CIF Non-Fuel Non-Negotiable Procedures' : 'CIF Non-Negotiable Procedures'}
                      </div>
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: '#495057', marginBottom: 15, maxHeight: 200, overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: 8, border: '1px solid #dee2e6' }}>
                        {modalProduct === 'Fertilizer' || modalProduct === 'Edible Oil' ? (
                          <>
                            <p><strong>1.</strong> Buyer issues ICPO along with Buyer's company registration certificate.</p>
                            <p><strong>2.</strong> Seller issues Sale & Purchase Agreement (SPA), Buyer review, amend (if necessary), signs, and return the SPA in WORD format to Seller within seven (7) banking days along with buyer's Client Information Sheet (CIS) and stating the exact bank issuing the Financial Instrument and the Financial Instrument issuer's Client Information Sheet (CIS) "if different from the buyer's company name." Seller sends Final Approved SPA to Buyer in PDF Format along with the Proforma Invoice for buyer's issuance of SBLC MT760 / DLC MT700 pre-advice or Ready, Willing and Able (RWA) MT999/199/799 to Seller's fiduciary bank confirming their readiness and capability to execute the transaction.</p>
                            <p><strong>3.</strong> Buyer sends swift copy of their issued SBLC MT760 / DLC MT700 pre-advice or Ready, Willing and Able (RWA) MT999/199/799 to Seller's fiduciary bank. Upon confirmation, Seller issues to Buyer via email the following transaction documents (Partial POP):</p>
                            <div style={{ marginLeft: 20 }}>
                              <p>a. Unconditional Commitment to Supply.</p>
                              <p>b. Certificate of Analysis (COA) also known as Product Passport.</p>
                              <p>c. Statement of Product Availability.</p>
                              <p>d. Commercial Invoice for the total 1st shipment product value.</p>
                            </div>
                            <p><strong>4.</strong> Within seven (7) banking days, Buyer's bank in accordance with seller's verbiage issues swift fully funded SBLC MT760 or DLC MT700 to Seller's fiduciary bank account to cover the 1st shipment total product value and send swift copies sent to Seller to enable seller commence loading of product with the shipping company. Seller's bank issues 2% PB to Buyer's bank to activate Buyer's financial instrument within seven (7) days.</p>
                            <p><strong>5.</strong> NOTE: If due to any reason buyer can't issue the SBLC MT760 / DLC MT700 pre-advise or RWA MT999/199/799 in procedure #2, buyer is to request for the Commercial Invoice for the direct issuance of SBLC MT760 or DLC MT700 immediately after signing of the Contract. Meanwhile, the alternate solution to all is to request for invoice and make a REFUNDABLE / DEDUCTIBLE 3% security guarantee deposit of the total 1st shipment value via T/T Wire Transfer after signing of the contract. Upon confirmation, Seller will proceed straight into shipment and furnish buyer with the FULL POP Documents via bank to bank. The Duration of the financial instrument issuance must be more than 366 days.</p>
                            <p><strong>6.</strong> Upon Seller's bank successful exchange of instrument method with buyer's bank or REFUNDABLE / DEDUCTIBLE Security Guarantee Deposit/Payment of 3% of the total 1st shipment product value via T/T Wire to seller's fiduciary bank, Seller to finalize loading within five to seven (5 to 7) working days. Seller invites buyer for visitation to witness the final inspection and TTM for negotiation of future transactions (Optional to Buyer). Seller loads product within six (6) international working days, signs NCNDA/IMFPA between all intermediaries involved with the notarized copy sent to Seller's bank and registers & legalizes the contract and sends to Buyer the following Full POP Document by swift via bank to bank and a copy via email to buyer and representative. Seller sends one full set of ORIGINAL POP documents to our authorized Customs Clearance agent at destination port and sends one full set of COPIES OF THE POP documents to the Buyer's address via DHL or FedEx, expedited (overnight) service and provides tracking numbers. (14 sets below):</p>
                            <div style={{ marginLeft: 20, fontSize: 12 }}>
                              <p>a. Charter party Agreement to transport the product to discharge port.</p>
                              <p>b. Allocation Title Ownership Certificate.</p>
                              <p>c. Product Allocation Export Permit.</p>
                              <p>d. Trans-Neft Contract to transport the product to the loading port.</p>
                              <p>e. Port storage agreement.</p>
                              <p>f. Certificate of origin and customs declaration.</p>
                              <p>g. Certificate of Weight and Quality.</p>
                              <p>h. Certificate of Health Certificates of products</p>
                              <p>i. All of Inspection Reports of the Product in accordance with CCIC's Requirement.</p>
                              <p>j. Certificate of Weight and Quality.</p>
                              <p>k. Packing List.</p>
                              <p>l. SGS Quality and Quantity Certificate.</p>
                              <p>m. Bill of Landing.</p>
                              <p>n. Vessel Questionnaire 88.</p>
                            </div>
                            <p><strong>7.</strong> The product SGS inspection charges will be borne by Seller at the loading port.</p>
                            <p><strong>8.</strong> Loading & Shipment of product commences as per schedule. Upon Vessel's arrival and finalization of SGS at the destination port, Buyer releases payment via swift fund transfer within 15 banking days to Seller for total shipment value after the discharge of product at destination port and receipt of the entire relevant shipping and export documents. Seller within 48 hours pays the intermediaries involved according to signed & notarized NCNDA/IMFPA.</p>
                          </>
                        ) : (
                          <>
                            <p><strong>1.</strong> Buyer issues ICPO along with Buyer's company registration certificate.</p>
                            <p><strong>2.</strong> Seller issues Sale & Purchase Agreement (SPA), Buyer review, amend (if necessary), signs, and return the SPA in WORD format to Seller within seven (7) banking days along with buyer's Client Information Sheet (CIS) and stating the exact bank issuing the Financial Instrument and the Financial Instrument issuer's Client Information Sheet (CIS) "if different from the buyer's company name." Seller sends Final Approved SPA to Buyer in PDF Format along with the Proforma Invoice for buyer's issuance of SBLC MT760 / DLC MT700 pre-advice or Ready, Willing and Able (RWA) MT999/199/799 to Seller's fiduciary bank confirming their readiness and capability to execute the transaction.</p>
                            <p><strong>3.</strong> Buyer sends swift copy of their issued SBLC MT760 / DLC MT700 pre-advice or Ready, Willing and Able (RWA) MT999/199/799 to Seller's fiduciary bank. Upon confirmation, Seller issues to Buyer via email the following transaction documents (Partial POP):</p>
                            <div style={{ marginLeft: 20 }}>
                              <p>a. Unconditional Commitment to Supply.</p>
                              <p>b. Certificate of Analysis (COA) also known as Product Passport.</p>
                              <p>c. Statement of Product Availability.</p>
                              <p>d. Commercial Invoice for the total 1st shipment product value.</p>
                            </div>
                            <p><strong>4.</strong> Within seven (7) banking days, Buyer's bank in accordance with seller's verbiage issues swift fully funded SBLC MT760 or DLC MT700 to Seller's fiduciary bank account to cover the 1st shipment total product value and send swift copies sent to Seller to enable seller commence loading of product with the shipping company. Seller's bank issues 2% PB to Buyer's bank to activate Buyer's financial instrument within seven (7) days.</p>
                            <p><strong>NOTE:</strong> If due to any reason buyer can't issue the SBLC MT760 / DLC MT700 pre-advise or RWA MT999/199/799 in procedure #2, buyer is to request for the Commercial Invoice for the direct issuance of SBLC MT760 or DLC MT700 immediately after signing of the Contract. Meanwhile, the alternate solution to all is to request for invoice and make a REFUNDABLE/DEDUCTIBLE 3% security guarantee deposit of the total 1st shipment value via T/T Wire Transfer after signing of the contract. Upon confirmation, Seller will proceed straight into shipment and furnish buyer with the FULL POP Documents via bank to bank. The Duration of the financial instrument issuance must be more than 366 days.</p>
                            <p><strong>5.</strong> Upon Seller's bank successful exchange of instrument method with buyer's bank or REFUNDABLE / DEDUCTIBLE Security Guarantee Deposit/Payment of 3% of the total 1st shipment product value via T/T Wire to seller's fiduciary bank, Seller to finalize loading within five to seven (5 to 7) working days. Seller invites buyer for visitation to witness the final inspection and TTM for negotiation of future transactions (Optional to Buyer). Seller loads product within six (6) international working days, signs NCNDA/IMFPA between all intermediaries involved with the notarized copy sent to Seller's bank and registers & legalizes the contract and sends to Buyer the following Full POP Document by swift via bank to bank and a copy via email to buyer and representative. Seller sends one full set of ORIGINAL POP documents to our authorized Customs Clearance agent at destination port and sends one full set of COPIES OF THE POP documents to the Buyer's address via DHL or FedEx, expedited (overnight) service and provides tracking numbers. (17 sets below):</p>
                            <div style={{ marginLeft: 20, fontSize: 12 }}>
                              <p>a. Copy of the Charter Party Agreements) to Transport the Product to Discharge Port.</p>
                              <p>b. Act of Transfer/Change of Ownership Title.</p>
                              <p>c. Certificate of Incorporation.</p>
                              <p>d. Registered & Legalized Contract.</p>
                              <p>e. Allocation Title Ownership Certificate.</p>
                              <p>f. Copy of License to Export.</p>
                              <p>g. Copy of Approval to Export.</p>
                              <p>h. Port Storage Tank Agreement.</p>
                              <p>i. Tank Receipt</p>
                              <p>j. Certificate of Origin</p>
                              <p>k. Notice of Readiness (NOR)</p>
                              <p>l. SGS/Saybolt Certificate of Quality and Quantity, One (1) Original and three (3) copies.</p>
                              <p>m. Cargo Manifest</p>
                              <p>n. Vessel Ullage report</p>
                              <p>o. Vessel Q88</p>
                              <p>p. Bill of Lading</p>
                              <p>q. Estimated Time of Arrival (ETA)</p>
                            </div>
                            <p><strong>6.</strong> Buyer notifies seller by official written notice of his bank receiving seller's pop documents. Shipment commences as per contract schedule and product is shipped to buyer's designated discharge port and upon arrival of the cargo at the discharge port, buyer's inspection team carries out CIQ, SGS or equivalent inspection to ascertain quality and quantity.</p>
                            <p><strong>7.</strong> Product is discharged into buyer's destination port/storage facility after successful inspection, Buyer release payment via swift fund transfer MT103/TT within 3 to 5 banking days to Seller for total shipment value after discharge of product at destination port/storage facility and receipt of the entire relevant shipping documents. Seller within 48 hours pays the intermediaries involved according to signed & notarized NCNDA/IMFPA. Second and succeeding shipments continue.</p>
                          </>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <input
                          type="checkbox"
                          checked={procedureAccepted}
                          onChange={e => setProcedureAccepted(e.target.checked)}
                          id="procedureAcceptCIF"
                          style={{ marginTop: 4, minWidth: 16, minHeight: 16 }}
                        />
                        <label htmlFor="procedureAcceptCIF" style={{ fontSize: 14, color: '#1D2A35', fontWeight: 600, lineHeight: 1.4 }}>
                          I have read and accept the {modalProduct === 'Fertilizer' || modalProduct === 'Edible Oil' ? 'CIF non-fuel' : 'CIF'} non-negotiable procedures outlined above
                        </label>
                      </div>
                    </div>
                  )}
                  {/* Submit Message */}
                  {submitMessage && (
                    <div style={{ color: submitMessage.includes('submitted') ? '#38a169' : '#e53e3e', fontWeight: 600, fontSize: 15, textAlign: 'center', padding: '10px', borderRadius: 8, background: submitMessage.includes('submitted') ? '#f0fff4' : '#fed7d7' }}>
                      {submitMessage}
                    </div>
                  )}
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

      {/* Fuel Capacity Table */}
      <div style={{ 
        width: '100%', 
        maxWidth: 1000, 
        background: theme === 'dark' ? '#232b36' : '#ffffff', 
        borderRadius: 24, 
        padding: '2rem', 
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)', 
        border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0', 
        margin: '2rem auto 0 auto',
        overflowX: 'auto'
      }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Theoretical Maximum FOB Fuel Capacity Per Client Per Month
        </h2>
        
        <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', color: theme === 'dark' ? '#cbd5e0' : '#4a5568' }}>
          <div>Jet A-1: 119,000,000 barrels</div>
          <div>D6: 11,200,000,000 gallons</div>
          <div>EN590: 12,500,000 metric tons</div>
        </div>

        <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1rem', fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>
          Total FOB Fuel Capacity By Port (Does Not Include CIF)
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.85rem',
            minWidth: '800px',
            border: '1px solid #000'
          }}>
            <thead>
              <tr style={{ background: theme === 'dark' ? '#3a4248' : '#f8f9fa' }}>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Supplier</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Product</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Houston</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Rotterdam</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Fujairah</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Jurong</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Ningbo-Zhoushan</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Qingdao</th>
                <th style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>TOTALS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>25,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>2,500,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>2,500,000</td>
              </tr>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 2</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>25,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>2,500,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>2,500,000</td>
              </tr>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 3</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>30,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>3,000,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>3,000,000</td>
              </tr>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 4</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>5,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>10,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>1,000,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>1,000,000</td>
              </tr>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 5</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>10,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>10,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>20,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>800,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>800,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>1,600,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>1,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>1,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>2,000,000</td>
              </tr>
              <tr style={{ background: '#90EE90' }}>
                <td rowSpan="3" style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold', background: '#90EE90' }}>Refinery 6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>Jet A-1</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>3,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>3,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>3,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>9,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>D6</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>200,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>200,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>200,000,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>600,000,000</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}>EN590</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>500,000</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>1,500,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ width: '100%', maxWidth: 1000, background: theme === 'dark' ? '#232b36' : '#ffffff', borderRadius: 24, padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)', boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)', border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0', textAlign: 'center', margin: '2rem auto 0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '2rem' }}>Global Trading with Trusted Partnerships</h2>
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: theme === 'dark' ? '#cbd5e0' : '#4a5568', textAlign: 'left' }}>
          <p>Stonehouse Holdings is a trusted international trading company specializing in the procurement and supply of a wide range of products. We work directly with reputable refineries and have partnered with reputable businesses across the industry to ensure the highest quality and reliable delivery. Our strong global partnerships and commitment to integrity allow us to provide seamless trade solutions tailored to meet the diverse needs of our clients.</p>
        </div>
      </div>
    </div>
    </>
  );
}
