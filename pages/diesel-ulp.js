import { useContext, useState } from 'react';
import { ThemeContext, AuthKycContext } from './_app';

export default function DieselULP() {
  const { theme } = useContext(ThemeContext);
  const { isSignedIn, addQuoteToHistory } = useContext(AuthKycContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    contactNumber: '',
    emailAddress: '',
    product: '',
    quantity: '',
    townCity: '',
    deliveryAddress: '',
    comments: '',
  });
  const [submitMessage, setSubmitMessage] = useState('');

  function openModalForProduct(product) {
    setModalProduct(product);
    setForm({
      fullName: '',
      company: '',
      contactNumber: '',
      emailAddress: '',
      product: '',
      quantity: '',
      townCity: '',
      deliveryAddress: '',
      comments: '',
    });
    setSubmitMessage('');
    setModalOpen(true);
  }

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
        backgroundImage: 'url("/Diesel.jpg")',
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
      }}>
        {/* Title */}
        <div style={{ position: 'absolute', top: 32, left: 0, width: '100%', zIndex: 2, textAlign: 'center', color: '#fff' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}>
            FUEL DISTRIBUTION RSA
          </h1>
        </div>
        
        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff' }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#fff',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            maxWidth: '600px',
          }}>
            Premium fuel distribution and industrial petroleum solutions for South African markets
          </p>
        </div>

        {/* Quote Buttons */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', bottom: 32, left: 0, width: '100%', zIndex: 3, gap: '0.4rem' }}>
          {['Fuel', 'Coastal IP', 'Fuel Depot Bloemfontein'].map((name) => (
            <button
              key={name}
              style={{ 
                background: '#fff', 
                color: '#1D2A35', 
                border: '2px solid #FFD700', 
                borderRadius: 40, 
                width: name === 'Fuel Depot Bloemfontein' ? 180 : 140, 
                height: 48, 
                fontWeight: 700, 
                fontSize: name === 'Fuel Depot Bloemfontein' ? '0.75rem' : '0.82rem', 
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
              onMouseEnter={e => { e.currentTarget.style.background = '#FFD700'; e.currentTarget.style.color = '#1D2A35'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1D2A35'; }}
              onClick={() => openModalForProduct(name)}
            >
              <span style={{ fontSize: name === 'Fuel Depot Bloemfontein' ? '0.75rem' : '0.82rem', fontWeight: 800, marginBottom: 0 }}>
                {name === 'Fuel Depot Bloemfontein' ? 'Fuel Depot' : name}
              </span>
              <span style={{ fontSize: name === 'Fuel Depot Bloemfontein' ? '0.65rem' : '0.72rem', fontWeight: 500, opacity: 0.85 }}>
                {name === 'Fuel Depot Bloemfontein' ? 'Bloemfontein' : 'Quote'}
              </span>
            </button>
          ))}
        </div>

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
                    
                    // Basic validation
                    const requiredFields = modalProduct === 'Fuel Depot Bloemfontein' 
                      ? ['fullName', 'company', 'contactNumber', 'emailAddress', 'product', 'quantity']
                      : ['fullName', 'company', 'contactNumber', 'emailAddress', 'product', 'quantity', 'townCity', 'deliveryAddress'];
                    
                    const missingFields = requiredFields.filter(field => !form[field]);
                    if (missingFields.length > 0) {
                      setSubmitMessage('Please fill in all required fields.');
                      return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(form.emailAddress)) {
                      setSubmitMessage('Please enter a valid email address.');
                      return;
                    }
                    
                    // Quantity validation
                    const numQuantity = Number(form.quantity);
                    if (isNaN(numQuantity) || numQuantity <= 0) {
                      setSubmitMessage('Please enter a valid positive quantity.');
                      return;
                    }
                    
                    // Minimum 40,000 litres validation for fuel products (excluding Fuel Depot Bloemfontein)
                    if (modalProduct === 'Fuel' && numQuantity < 40000) {
                      setSubmitMessage('Minimum quantity for fuel products is 40,000 litres.');
                      return;
                    }
                    
                    // Increment validation for fuel products (excluding Fuel Depot Bloemfontein)
                    if (modalProduct === 'Fuel' && numQuantity % 40000 !== 0) {
                      setSubmitMessage('Quantity must be in increments of 40,000 litres (40,000, 80,000, 120,000, etc.).');
                      return;
                    }
                    
                    console.log('FUEL DISTRIBUTION RSA Form submitted:', { 
                      ...form, 
                      productType: modalProduct,
                      destinationEmail: 'stonehouseholdings24@gmail.com'
                    });

                    // Prepare email content
                    const emailSubject = `Fuel Distribution RSA Quote Request - ${form.product}`;
                    const emailBody = `
FUEL DISTRIBUTION RSA QUOTE REQUEST

CLIENT INFORMATION:
- Full Name: ${form.fullName}
- Company: ${form.company}
- Contact Number: ${form.contactNumber}
- Email Address: ${form.emailAddress}

PRODUCT INFORMATION:
- Product Category: ${modalProduct}
- Product: ${form.product}
- Quantity: ${form.quantity} litres${modalProduct !== 'Fuel Depot Bloemfontein' ? `
- Town/City: ${form.townCity}
- Delivery Address: ${form.deliveryAddress}` : ''}${form.comments ? `

ADDITIONAL COMMENTS:
${form.comments}` : ''}

---
This quote request was submitted via the Stonehouse Holdings website.
`;

                    // Create mailto URL for email client
                    const mailtoUrl = `mailto:stonehouseholdings24@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                    
                    // Open email client
                    window.location.href = mailtoUrl;
                    
                    // Add to quote history if user is signed in
                    if (isSignedIn) {
                      addQuoteToHistory({
                        product: `Fuel Distribution - ${modalProduct}`,
                        fullName: form.fullName,
                        company: form.company,
                        contactNumber: form.contactNumber,
                        emailAddress: form.emailAddress,
                        quantity: form.quantity,
                        townCity: form.townCity,
                        deliveryAddress: form.deliveryAddress,
                        message: form.comments || 'No additional comments'
                      });
                    }
                    
                    setSubmitMessage('Opening email client... Please send the email to complete your quote request.');
                    
                    // Reset form after a delay
                    setTimeout(() => {
                      setForm({
                        fullName: '',
                        company: '',
                        contactNumber: '',
                        emailAddress: '',
                        product: '',
                        quantity: '',
                        townCity: '',
                        deliveryAddress: '',
                        comments: '',
                      });
                      setSubmitMessage('');
                      setModalOpen(false);
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
                        value={form.fullName}
                        onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
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
                        value={form.emailAddress}
                        onChange={e => setForm(f => ({ ...f, emailAddress: e.target.value }))}
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

                  {/* Product Information Section */}
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

                    {/* Product Selection */}
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Select Product *
                      </label>
                      <select
                        value={form.product}
                        onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          fontSize: '15px', 
                          background: '#fff', 
                          color: form.product ? '#1D2A35' : '#999', 
                          boxSizing: 'border-box', 
                          outline: 'none', 
                          appearance: 'none', 
                          cursor: 'pointer' 
                        }}
                        required
                      >
                        <option value="" disabled>Select Product</option>
                        {modalProduct === 'Fuel' ? (
                          <>
                              <option value="10 PPM">10 PPM</option>
                            <option value="50 PPM">50 PPM</option>
                            <option value="93 ULP">93 ULP</option>
                            <option value="95 ULP">95 ULP</option>
                          </>
                        ) : modalProduct === 'Fuel Depot Bloemfontein' ? (
                          <>
                            <option value="50 PPM">50 PPM</option>
                          </>
                        ) : modalProduct === 'Coastal IP' ? (
                          <>
                            <option value="Illuminating Paraffin">Illuminating Paraffin</option>
                          </>
                        ) : (
                          <option value="General Product">General Product</option>
                        )}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div style={{ marginBottom: '0' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        {modalProduct === 'Fuel' ? "Quantity (40,000L increments) *" : 
                         modalProduct === 'Fuel Depot Bloemfontein' ? "Possible Monthly Litres *" : 
                         "Enter Quantity (Litres) *"}
                      </label>
                      <input
                        type="number"
                        value={form.quantity}
                        onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                        placeholder={modalProduct === 'Fuel' ? "Enter quantity (40,000, 80,000, etc.)" : 
                                   modalProduct === 'Fuel Depot Bloemfontein' ? "Enter possible monthly litres" : 
                                   "Enter quantity in litres"}
                        min={modalProduct === 'Fuel' ? "40000" : "1"}
                        step={modalProduct === 'Fuel' ? "40000" : "1"}
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
                      {modalProduct === 'Fuel' && (
                        <div style={{ color: '#666', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                          Valid quantities: 40,000, 80,000, 120,000, 160,000, etc.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Location & Delivery Section */}
                  {modalProduct !== 'Fuel Depot Bloemfontein' && (
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
                        Location & Delivery
                      </h3>

                      {/* Town/City Selection */}
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '5px', 
                          color: '#1D2A35', 
                          fontSize: '14px', 
                          fontWeight: 600 
                        }}>
                          Select Town / City *
                        </label>
                        <select
                          value={form.townCity}
                          onChange={e => setForm(f => ({ ...f, townCity: e.target.value }))}
                          style={{ 
                            width: '100%', 
                            padding: '12px 16px', 
                            borderRadius: '8px', 
                            border: '2px solid #e0e0e0', 
                            fontSize: '15px', 
                            background: '#fff', 
                            color: form.townCity ? '#1D2A35' : '#999', 
                            boxSizing: 'border-box', 
                            outline: 'none', 
                            appearance: 'none', 
                            cursor: 'pointer' 
                          }}
                          required
                        >
                          <option value="" disabled>Select Town / City</option>
                          {/* South African Cities and Towns with Codes */}
                      <option value="09B Aberdeen EC">09B Aberdeen EC</option>
                      <option value="05A Adelaide EC">05A Adelaide EC</option>
                      <option value="04A Albany EC">04A Albany EC</option>
                      <option value="07A Albert EC">07A Albert EC</option>
                      <option value="09C Alberton GP">09C Alberton GP</option>
                      <option value="04A Alexandria EC">04A Alexandria EC</option>
                      <option value="05A Alfred ZN">05A Alfred ZN</option>
                      <option value="07A Aliwal North EC">07A Aliwal North EC</option>
                      <option value="08C Amersfoort MP">08C Amersfoort MP</option>
                      <option value="06A Babanango ZN">06A Babanango ZN</option>
                      <option value="09C Bafokeng NW">09C Bafokeng NW</option>
                      <option value="09C Balfour MP">09C Balfour MP</option>
                      <option value="61C Barberton MP">61C Barberton MP</option>
                      <option value="08A Barkly East EC">08A Barkly East EC</option>
                      <option value="11C Barkly West NC">11C Barkly West NC</option>
                      <option value="05A Bathurst (Port Alfred) EC">05A Bathurst (Port Alfred) EC</option>
                      <option value="08B Beaufort West WC">08B Beaufort West WC</option>
                      <option value="05A Bedford EC">05A Bedford EC</option>
                      <option value="10C Bela-Bela (Warmbad) LP">10C Bela-Bela (Warmbad) LP</option>
                      <option value="10C Belfast MP">10C Belfast MP</option>
                      <option value="01A Bellville WC">01A Bellville WC</option>
                      <option value="09C Benoni GP">09C Benoni GP</option>
                      <option value="06C Bergville ZN">06C Bergville ZN</option>
                      <option value="09C Bethal MP">09C Bethal MP</option>
                      <option value="07C Bethlehem FS">07C Bethlehem FS</option>
                      <option value="08A Bethulie FS">08A Bethulie FS</option>
                      <option value="09B Bizana EC">09B Bizana EC</option>
                      <option value="11C Bloemfontein FS">11C Bloemfontein FS</option>
                      <option value="10C Bloemhof NW">10C Bloemhof NW</option>
                      <option value="13C Bochum LP">13C Bochum LP</option>
                      <option value="09C Boksburg GP">09C Boksburg GP</option>
                      <option value="63C Bolobedu LP">63C Bolobedu LP</option>
                      <option value="11C Boshof FS">11C Boshof FS</option>
                      <option value="09C Bothaville FS">09C Bothaville FS</option>
                      <option value="11C Botshabelo FS">11C Botshabelo FS</option>
                      <option value="09C Brakpan GP">09C Brakpan GP</option>
                      <option value="10C Brandfort FS">10C Brandfort FS</option>
                      <option value="06A Bredasdorp WC">06A Bredasdorp WC</option>
                      <option value="09C Brits NW">09C Brits NW</option>
                      <option value="09A Britstown NC">09A Britstown NC</option>
                      <option value="09C Bronkhorstspruit GP">09C Bronkhorstspruit GP</option>
                      <option value="10C Bultfontein FS">10C Bultfontein FS</option>
                      <option value="05A Caledon WC">05A Caledon WC</option>
                      <option value="04A Calitzdorp WC">04A Calitzdorp WC</option>
                      <option value="14B Calvinia (east of 20o longitude) NC">14B Calvinia (east of 20o longitude) NC</option>
                      <option value="12B Calvinia (west of 20o longitude) NC">12B Calvinia (west of 20o longitude) NC</option>
                      <option value="02A Camperdown ZN">02A Camperdown ZN</option>
                      <option value="01A Cape Town WC">01A Cape Town WC</option>
                      <option value="10B Carnavon NC">10B Carnavon NC</option>
                      <option value="10C Carolina MP">10C Carolina MP</option>
                      <option value="05A Cathcart EC">05A Cathcart EC</option>
                      <option value="05A Centane EC">05A Centane EC</option>
                      <option value="05A Ceres WC">05A Ceres WC</option>
                      <option value="01A Chatsworth ZN">01A Chatsworth ZN</option>
                      <option value="10C Christiana NW">10C Christiana NW</option>
                      <option value="07B Clanwilliam WC">07B Clanwilliam WC</option>
                      <option value="08C Clocolan FS">08C Clocolan FS</option>
                      <option value="05A Cofimvaba (St Marks) EC">05A Cofimvaba (St Marks) EC</option>
                      <option value="08A Colesberg NC">08A Colesberg NC</option>
                      <option value="10C Coligny NW">10C Coligny NW</option>
                      <option value="08B Cradock EC">08B Cradock EC</option>
                      <option value="09C Cullinan GP">09C Cullinan GP</option>
                      <option value="06C Dannhauser ZN">06C Dannhauser ZN</option>
                      <option value="08A De Aar NC">08A De Aar NC</option>
                      <option value="11C Delareyville NW">11C Delareyville NW</option>
                      <option value="09C Delmas MP">09C Delmas MP</option>
                      <option value="11C Dewetsdorp FS">11C Dewetsdorp FS</option>
                      <option value="12C Ditsobotla NW">12C Ditsobotla NW</option>
                      <option value="06C Dundee ZN">06C Dundee ZN</option>
                      <option value="01A Durban ZN">01A Durban ZN</option>
                      <option value="13C Dzanani Central (North of Makhado) LP">13C Dzanani Central (North of Makhado) LP</option>
                      <option value="14C Dzanani North (East of Musina) LP">14C Dzanani North (East of Musina) LP</option>
                      <option value="13C Dzanani South (West of Makhado) LP">13C Dzanani South (West of Makhado) LP</option>
                      <option value="01A East London EC">01A East London EC</option>
                      <option value="08A Edenburg FS">08A Edenburg FS</option>
                      <option value="10C Eerstehoek MP">10C Eerstehoek MP</option>
                      <option value="08A Elliot EC">08A Elliot EC</option>
                      <option value="57A Engcobo EC">57A Engcobo EC</option>
                      <option value="08C Ermelo MP">08C Ermelo MP</option>
                      <option value="04A Eshowe ZN">04A Eshowe ZN</option>
                      <option value="05B Estcourt ZN">05B Estcourt ZN</option>
                      <option value="10C Excelsior FS">10C Excelsior FS</option>
                      <option value="09A Fauresmith FS">09A Fauresmith FS</option>
                      <option value="08C Ficksburg FS">08C Ficksburg FS</option>
                      <option value="05A Fort Beaufort EC">05A Fort Beaufort EC</option>
                      <option value="07C Fouriesburg FS">07C Fouriesburg FS</option>
                      <option value="08C Frankfort FS">08C Frankfort FS</option>
                      <option value="08B Fraserburg NC">08B Fraserburg NC</option>
                      <option value="15C Ganyesa NW">15C Ganyesa NW</option>
                      <option value="05A Gatyana (Willowvale) EC">05A Gatyana (Willowvale) EC</option>
                      <option value="05A Gcuwa (Butterworth) EC">05A Gcuwa (Butterworth) EC</option>
                      <option value="03A George WC">03A George WC</option>
                      <option value="09C Germiston GP">09C Germiston GP</option>
                      <option value="64C Giyani LP">64C Giyani LP</option>
                      <option value="06A Glen Grey/Cacadu/Lady Frere EC">06A Glen Grey/Cacadu/Lady Frere EC</option>
                      <option value="06C Glencoe ZN">06C Glencoe ZN</option>
                      <option value="01A Goodwood WC">01A Goodwood WC</option>
                      <option value="19A Gordonia (north of 27o30? latitude) NC">19A Gordonia (north of 27o30? latitude) NC</option>
                      <option value="13A Gordonia (south of 28o latitude) NC">13A Gordonia (south of 28o latitude) NC</option>
                      <option value="17A Gordonia Central (between 27o30? and 28o la NC">17A Gordonia Central (between 27o30? and 28o la NC</option>
                      <option value="09B Graaffreinett EC">09B Graaffreinett EC</option>
                      <option value="10C Groblersdal MP">10C Groblersdal MP</option>
                      <option value="03A Hankey EC">03A Hankey EC</option>
                      <option value="08A Hanover NC">08A Hanover NC</option>
                      <option value="06C Harrismith FS">06C Harrismith FS</option>
                      <option value="11C Hartswater NC">11C Hartswater NC</option>
                      <option value="11A Hay NC">11A Hay NC</option>
                      <option value="09C Heidelberg (Gauteng) GP">09C Heidelberg (Gauteng) GP</option>
                      <option value="04A Heidelberg (W.Cape) WC">04A Heidelberg (W.Cape) WC</option>
                      <option value="08C Heilbron FS">08C Heilbron FS</option>
                      <option value="09C Hennenman FS">09C Hennenman FS</option>
                      <option value="11C Herbert NC">11C Herbert NC</option>
                      <option value="05A Hermanus WC">05A Hermanus WC</option>
                      <option value="08A Herschel (Sterkspruit) EC">08A Herschel (Sterkspruit) EC</option>
                      <option value="05A Hewu (Whittle Sea) EC">05A Hewu (Whittle Sea) EC</option>
                      <option value="09C Highveld Ridge MP">09C Highveld Ridge MP</option>
                      <option value="05A Hlabisa ZN">05A Hlabisa ZN</option>
                      <option value="13C Hlanganani LP">13C Hlanganani LP</option>
                      <option value="57A Hofmeyer EC">57A Hofmeyer EC</option>
                      <option value="10C Hoopstad FS">10C Hoopstad FS</option>
                      <option value="05A Hopefield WC">05A Hopefield WC</option>
                      <option value="09A Hopetown NC">09A Hopetown NC</option>
                      <option value="03B Humansdorp EC">03B Humansdorp EC</option>
                      <option value="05A Idutywa EC">05A Idutywa EC</option>
                      <option value="05B Impendle ZN">05B Impendle ZN</option>
                      <option value="01A Inanda ZN">01A Inanda ZN</option>
                      <option value="57A Indwe EC">57A Indwe EC</option>
                      <option value="57A Ingwavuma ZN">57A Ingwavuma ZN</option>
                      <option value="04A Ixopo ZN">04A Ixopo ZN</option>
                      <option value="11C Jacobsdal FS">11C Jacobsdal FS</option>
                      <option value="08A Jagersfontein FS">08A Jagersfontein FS</option>
                      <option value="07B Jansenville EC">07B Jansenville EC</option>
                      <option value="09C Johannesburg GP">09C Johannesburg GP</option>
                      <option value="07B Joubertina EC">07B Joubertina EC</option>
                      <option value="04A Keiskammahoek EC">04A Keiskammahoek EC</option>
                      <option value="09C Kempton Park GP">09C Kempton Park GP</option>
                      <option value="15A Kenhardt (east of 20o longitude) NC">15A Kenhardt (east of 20o longitude) NC</option>
                      <option value="69A Kenhardt (west of 20o longitude) NC">69A Kenhardt (west of 20o longitude) NC</option>
                      <option value="11C Kimberley NC">11C Kimberley NC</option>
                      <option value="03A King Williams Town EC">03A King Williams Town EC</option>
                      <option value="03A Kirkwood EC">03A Kirkwood EC</option>
                      <option value="09C Klerksdorp NW">09C Klerksdorp NW</option>
                      <option value="05C Kliprivier ZN">05C Kliprivier ZN</option>
                      <option value="04A Knysna WC">04A Knysna WC</option>
                      <option value="09A Koffiefontein FS">09A Koffiefontein FS</option>
                      <option value="03A Komga EC">03A Komga EC</option>
                      <option value="09C Koppies FS">09C Koppies FS</option>
                      <option value="09C Koster NW">09C Koster NW</option>
                      <option value="05A Kranskop ZN">05A Kranskop ZN</option>
                      <option value="09C Kriel MP">09C Kriel MP</option>
                      <option value="09C Kroonstad FS">09C Kroonstad FS</option>
                      <option value="09C Krugersdorp GP">09C Krugersdorp GP</option>
                      <option value="15C Kudumane NW">15C Kudumane NW</option>
                      <option value="01A Kuilsrivier WC">01A Kuilsrivier WC</option>
                      <option value="17C Kuruman (north of 27o latitude) NC">17C Kuruman (north of 27o latitude) NC</option>
                      <option value="13C Kuruman (south of 27o latitude) NC">13C Kuruman (south of 27o latitude) NC</option>
                      <option value="10B Kwabhaca (Mount Frere) EC">10B Kwabhaca (Mount Frere) EC</option>
                      <option value="10C Kwamhlanga MP">10C Kwamhlanga MP</option>
                      <option value="06B Ladismith (Cape) WC">06B Ladismith (Cape) WC</option>
                      <option value="08A Lady Grey EC">08A Lady Grey EC</option>
                      <option value="08C Ladybrand FS">08C Ladybrand FS</option>
                      <option value="07B Laingsburg WC">07B Laingsburg WC</option>
                      <option value="11C Lehurutshe NW">11C Lehurutshe NW</option>
                      <option value="13C Lephalale (Ellisras) LP">13C Lephalale (Ellisras) LP</option>
                      <option value="63C Letaba LP">63C Letaba LP</option>
                      <option value="57A Libode EC">57A Libode EC</option>
                      <option value="10C Lichtenburg NW">10C Lichtenburg NW</option>
                      <option value="08C Lindley FS">08C Lindley FS</option>
                      <option value="03B Lions River ZN">03B Lions River ZN</option>
                      <option value="03A Lower Tugela ZN">03A Lower Tugela ZN</option>
                      <option value="05A Lower Umfolozi ZN">05A Lower Umfolozi ZN</option>
                      <option value="62C Lulekani LP">62C Lulekani LP</option>
                      <option value="10B Lusikisiki (PortStJohns) EC">10B Lusikisiki (PortStJohns) EC</option>
                      <option value="10C Lydenburg MP">10C Lydenburg MP</option>
                      <option value="08A Maclear EC">08A Maclear EC</option>
                      <option value="10C Madikwe NW">10C Madikwe NW</option>
                      <option value="06A Mahlabatini ZN">06A Mahlabatini ZN</option>
                      <option value="64C Malamulele LP">64C Malamulele LP</option>
                      <option value="03A Malmesbury (north of 33o30? latitude) WC">03A Malmesbury (north of 33o30? latitude) WC</option>
                      <option value="01A Malmesbury (south of 33o30? latitude) WC">01A Malmesbury (south of 33o30? latitude) WC</option>
                      <option value="57A Maluki (Matatiele) EC">57A Maluki (Matatiele) EC</option>
                      <option value="10C Mankwe NW">10C Mankwe NW</option>
                      <option value="61C Mapulaneng LP">61C Mapulaneng LP</option>
                      <option value="03A Mapumulo ZN">03A Mapumulo ZN</option>
                      <option value="10C Marico NW">10C Marico NW</option>
                      <option value="08C Marquard FS">08C Marquard FS</option>
                      <option value="10B Maxesibeni (Mount Ayliff) EC">10B Maxesibeni (Mount Ayliff) EC</option>
                      <option value="10C Mbibana MP">10C Mbibana MP</option>
                      <option value="01A Mdantsane EC">01A Mdantsane EC</option>
                      <option value="10C Mdutjana (Siyabuswa) MP">10C Mdutjana (Siyabuswa) MP</option>
                      <option value="61C Mhala LP">61C Mhala LP</option>
                      <option value="57A Middelburg (E.Cape) EC">57A Middelburg (E.Cape) EC</option>
                      <option value="10C Middelburg (MP) MP">10C Middelburg (MP) MP</option>
                      <option value="04A Middledrift EC">04A Middledrift EC</option>
                      <option value="01A Mitchells Plain WC">01A Mitchells Plain WC</option>
                      <option value="10C Mkobola MP">10C Mkobola MP</option>
                      <option value="16C Mokerong 1 (East of Lephalale) LP">16C Mokerong 1 (East of Lephalale) LP</option>
                      <option value="11C Mokerong 2 (North of Mokopane) LP">11C Mokerong 2 (North of Mokopane) LP</option>
                      <option value="11C Mokerong 3 (Zebediela area) LP">11C Mokerong 3 (Zebediela area) LP</option>
                      <option value="16C Mokopane (Potgietersrus) (north of tropic of LP">16C Mokopane (Potgietersrus) (north of tropic of LP</option>
                      <option value="11C Mokopane (Potgietersrus) (south of tropic of LP">11C Mokopane (Potgietersrus) (south of tropic of LP</option>
                      <option value="11C Molopo NW">11C Molopo NW</option>
                      <option value="06A Molteno EC">06A Molteno EC</option>
                      <option value="05A Montagu WC">05A Montagu WC</option>
                      <option value="05B Mooirivier ZN">05B Mooirivier ZN</option>
                      <option value="04A Moorreesburg WC">04A Moorreesburg WC</option>
                      <option value="09C Moretele 1 NW">09C Moretele 1 NW</option>
                      <option value="09C Moretele 2 MP">09C Moretele 2 MP</option>
                                                  <option value="01A Mossel Bay WC">01A Mossel Bay WC</option>
                            <option value="57A Mount Currie ZN">57A Mount Currie ZN</option>
                            <option value="12B Mount Fletcher EC">12B Mount Fletcher EC</option>
                            <option value="10C Moutse MP">10C Moutse MP</option>
                            <option value="05A Mpofu (Stockenstroom)(Seymore) EC">05A Mpofu (Stockenstroom)(Seymore) EC</option>
                            <option value="57A Mqanduli EC">57A Mqanduli EC</option>
                            <option value="05B Msinga ZN">05B Msinga ZN</option>
                            <option value="05A Mtonjaneni ZN">05A Mtonjaneni ZN</option>
                            <option value="04A Mtunzini ZN">04A Mtunzini ZN</option>
                            <option value="09B Murraysburg WC">09B Murraysburg WC</option>
                            <option value="14C Musina (Messina) (East of 30o longitude) LP">14C Musina (Messina) (East of 30o longitude) LP</option>
                            <option value="16C Musina (Messina) (West of 30o longitude) LP">16C Musina (Messina) (West of 30o longitude) LP</option>
                            <option value="14C Mutale LP">14C Mutale LP</option>
                            <option value="63C Namakgale LP">63C Namakgale LP</option>
                            <option value="33J Namakwaland Aggeneys(east of 18o30? longi NC">33J Namakwaland Aggeneys(east of 18o30? longi NC</option>
                            <option value="37J Namakwaland Alexander Bay (north of 29o l NC">37J Namakwaland Alexander Bay (north of 29o l NC</option>
                            <option value="32J Namakwaland Central (between 29o and 30o NC">32J Namakwaland Central (between 29o and 30o NC</option>
                            <option value="36J Namakwaland Kleinsee (between 29o and 3 NC">36J Namakwaland Kleinsee (between 29o and 3 NC</option>
                            <option value="35J Namakwaland Port Nolloth (south of 29o latit NC">35J Namakwaland Port Nolloth (south of 29o latit NC</option>
                            <option value="31J Namakwaland South (south of 30o latitude) NC">31J Namakwaland South (south of 30o latitude) NC</option>
                            <option value="34J Namakwaland Vioolsdrif (north of 29o latitud NC">34J Namakwaland Vioolsdrif (north of 29o latitud NC</option>
                            <option value="63C Naphuno LP">63C Naphuno LP</option>
                            <option value="02A Ndwedwe ZN">02A Ndwedwe ZN</option>
                            <option value="11C Nebo LP">11C Nebo LP</option>
                            <option value="61C Nelspruit MP">61C Nelspruit MP</option>
                            <option value="03B New Hanover ZN">03B New Hanover ZN</option>
                            <option value="06C Newcastle ZN">06C Newcastle ZN</option>
                            <option value="57A Ngotshe ZN">57A Ngotshe ZN</option>
                            <option value="09C Nigel GP">09C Nigel GP</option>
                            <option value="05A Nkandla ZN">05A Nkandla ZN</option>
                            <option value="61C Nkomazi (Kamhulshwa) MP">61C Nkomazi (Kamhulshwa) MP</option>
                            <option value="03C No MDZ">03C No MDZ</option>
                            <option value="04C No MDZ">04C No MDZ</option>
                            <option value="60C No MDZ">60C No MDZ</option>
                            <option value="06A Nongoma ZN">06A Nongoma ZN</option>
                            <option value="07A Noupoort NC">07A Noupoort NC</option>
                            <option value="05A Nqamakwe EC">05A Nqamakwe EC</option>
                            <option value="57A Nqueleni EC">57A Nqueleni EC</option>
                            <option value="06C Nqutu ZN">06C Nqutu ZN</option>
                            <option value="61C Nsikazi (Kangwane) MP">61C Nsikazi (Kangwane) MP</option>
                            <option value="09C Oberholzer GP">09C Oberholzer GP</option>
                            <option value="09C Odendaalsrus FS">09C Odendaalsrus FS</option>
                            <option value="09C Odi NW">09C Odi NW</option>
                            <option value="04A Oudtshoorn WC">04A Oudtshoorn WC</option>
                            <option value="02A Paarl WC">02A Paarl WC</option>
                            <option value="09C Parys FS">09C Parys FS</option>
                            <option value="57C Paulpietersburg ZN">57C Paulpietersburg ZN</option>
                            <option value="08B Pearston EC">08B Pearston EC</option>
                            <option value="04A Peddie (Ciskei) EC">04A Peddie (Ciskei) EC</option>
                            <option value="11C Petrusburg FS">11C Petrusburg FS</option>
                            <option value="63C Phalaborwa LP">63C Phalaborwa LP</option>
                            <option value="09A Philipstown NC">09A Philipstown NC</option>
                            <option value="08A Phillippolis FS">08A Phillippolis FS</option>
                            <option value="58C Piet Retief MP">58C Piet Retief MP</option>
                            <option value="03B Pietermaritzburg ZN">03B Pietermaritzburg ZN</option>
                            <option value="06B Piketberg WC">06B Piketberg WC</option>
                            <option value="61C Pilgrims Rest MP">61C Pilgrims Rest MP</option>
                            <option value="01A Pinetown ZN">01A Pinetown ZN</option>
                            <option value="05B Polela ZN">05B Polela ZN</option>
                            <option value="13C Polokwane (Pietersburg) (north of tropic of c LP">13C Polokwane (Pietersburg) (north of tropic of c LP</option>
                            <option value="12C Polokwane (Pietersburg) (south of tropic of c LP">12C Polokwane (Pietersburg) (south of tropic of c LP</option>
                            <option value="01A Port Elizabeth EC">01A Port Elizabeth EC</option>
                            <option value="04A Port Shepstone ZN">04A Port Shepstone ZN</option>
                            <option value="13C Postmasburg NC">13C Postmasburg NC</option>
                            <option value="09C Potchefstroom NW">09C Potchefstroom NW</option>
                            <option value="09C Pretoria GP">09C Pretoria GP</option>
                            <option value="09A Prieska NC">09A Prieska NC</option>
                            <option value="07B Prince Albert WC">07B Prince Albert WC</option>
                            <option value="05A Queenstown EC">05A Queenstown EC</option>
                            <option value="57A Qumbu EC">57A Qumbu EC</option>
                            <option value="09C Randburg GP">09C Randburg GP</option>
                            <option value="09C Randfontein GP">09C Randfontein GP</option>
                            <option value="08A Reddersburg FS">08A Reddersburg FS</option>
                            <option value="08C Reitz FS">08C Reitz FS</option>
                            <option value="03A Richmond (KZN) ZN">03A Richmond (KZN) ZN</option>
                            <option value="08A Richmond (N.Cape) NC">08A Richmond (N.Cape) NC</option>
                            <option value="63C Ritavi LP">63C Ritavi LP</option>
                            <option value="04A Riversdale WC">04A Riversdale WC</option>
                            <option value="05A Robertson WC">05A Robertson WC</option>
                            <option value="09C Roodepoort GP">09C Roodepoort GP</option>
                            <option value="08A Rouxville FS">08A Rouxville FS</option>
                            <option value="09C Rustenburg NW">09C Rustenburg NW</option>
                            <option value="09C Sasolburg FS">09C Sasolburg FS</option>
                            <option value="11C Schweizer-Reneke NW">11C Schweizer-Reneke NW</option>
                            <option value="13C Sekgosese LP">13C Sekgosese LP</option>
                            <option value="11C Sekhukhuneland LP">11C Sekhukhuneland LP</option>
                            <option value="08C Senekal FS">08C Senekal FS</option>
                            <option value="12C Seshego LP">12C Seshego LP</option>
                            <option value="58C Simdlangentsha ZN">58C Simdlangentsha ZN</option>
                            <option value="01A Simonstown WC">01A Simonstown WC</option>
                            <option value="09B Sipangeni (Flagstaff) EC">09B Sipangeni (Flagstaff) EC</option>
                            <option value="08A Smithfield FS">08A Smithfield FS</option>
                            <option value="07B Somerset East EC">07B Somerset East EC</option>
                            <option value="02A Somerset West WC">02A Somerset West WC</option>
                            <option value="09C Soshanguve GP">09C Soshanguve GP</option>
                            <option value="13C Soutpansberg (central of 29o 30?and 30o 30? LP">13C Soutpansberg (central of 29o 30?and 30o 30? LP</option>
                            <option value="63C Soutpansberg (east of 30o 30? longitude) LP">63C Soutpansberg (east of 30o 30? longitude) LP</option>
                            <option value="16C Soutpansberg (west of 29o 30? longitude) LP">16C Soutpansberg (west of 29o 30? longitude) LP</option>
                            <option value="09C Springs GP">09C Springs GP</option>
                            <option value="08C Standerton MP">08C Standerton MP</option>
                            <option value="02A Stellenbosch WC">02A Stellenbosch WC</option>
                            <option value="05A Sterkstroom EC">05A Sterkstroom EC</option>
                            <option value="07A Steynsburg EC">07A Steynsburg EC</option>
                            <option value="07B Steytlerville EC">07B Steytlerville EC</option>
                            <option value="02A Strand WC">02A Strand WC</option>
                            <option value="04A Stutterheim EC">04A Stutterheim EC</option>
                            <option value="12B Sutherland NC">12B Sutherland NC</option>
                            <option value="09C Swartruggens NW">09C Swartruggens NW</option>
                            <option value="05A Swellendam WC">05A Swellendam WC</option>
                            <option value="10B Tabankulu EC">10B Tabankulu EC</option>
                            <option value="05A Tarka EC">05A Tarka EC</option>
                            <option value="11C Taung NW">11C Taung NW</option>
                            <option value="12C Thabamoopo LP">12C Thabamoopo LP</option>
                            <option value="11C Thaba?nchu FS">11C Thaba?nchu FS</option>
                            <option value="12C Thabazimbi (east of 27o longitude) LP">12C Thabazimbi (east of 27o longitude) LP</option>
                            <option value="13C Thabazimbi (west of 27o longitude) LP">13C Thabazimbi (west of 27o longitude) LP</option>
                            <option value="10C Theunissen FS">10C Theunissen FS</option>
                            <option value="67C Thohoyandou (east of 31o longitude) LP">67C Thohoyandou (east of 31o longitude) LP</option>
                            <option value="13C Thohoyandou (west 31o longitude) LP">13C Thohoyandou (west 31o longitude) LP</option>
                            <option value="08A Trompsburg FS">08A Trompsburg FS</option>
                            <option value="57A Tsolo EC">57A Tsolo EC</option>
                            <option value="05A Tsomo EC">05A Tsomo EC</option>
                            <option value="04A Tulbagh WC">04A Tulbagh WC</option>
                            <option value="57A Ubombo ZN">57A Ubombo ZN</option>
                            <option value="02A Uitenhage EC">02A Uitenhage EC</option>
                            <option value="02A Umbumbulu ZN">02A Umbumbulu ZN</option>
                            <option value="01A Umlazi ZN">01A Umlazi ZN</option>
                            <option value="06A Umtata EC">06A Umtata EC</option>
                            <option value="05B Umvoti ZN">05B Umvoti ZN</option>
                            <option value="05A Umzimkulu EC">05A Umzimkulu EC</option>
                            <option value="12B Umzimvubu EC">12B Umzimvubu EC</option>
                            <option value="03A Umzinto ZN">03A Umzinto ZN</option>
                            <option value="05B Underberg ZN">05B Underberg ZN</option>
                            <option value="06B Uniondale WC">06B Uniondale WC</option>
                            <option value="57C Utrecht ZN">57C Utrecht ZN</option>
                            <option value="09B Van Rhynsdorp WC">09B Van Rhynsdorp WC</option>
                            <option value="09C Vanderbijlpark GP">09C Vanderbijlpark GP</option>
                            <option value="08C Ventersburg FS">08C Ventersburg FS</option>
                            <option value="10C Ventersdorp NW">10C Ventersdorp NW</option>
                            <option value="08A Venterstad EC">08A Venterstad EC</option>
                            <option value="09C Vereeniging GP">09C Vereeniging GP</option>
                            <option value="04A Victoria East EC">04A Victoria East EC</option>
                            <option value="12B Victoria West NC">12B Victoria West NC</option>
                            <option value="09C Viljoenskroon FS">09C Viljoenskroon FS</option>
                            <option value="09C Virginia FS">09C Virginia FS</option>
                            <option value="57C Volksrust MP">57C Volksrust MP</option>
                            <option value="08C Vrede FS">08C Vrede FS</option>
                            <option value="09C Vredefort FS">09C Vredefort FS</option>
                            <option value="05A Vredenburg WC">05A Vredenburg WC</option>
                            <option value="09B Vredendal WC">09B Vredendal WC</option>
                            <option value="13C Vryburg (east of 24o longitude and north of 2 NW">13C Vryburg (east of 24o longitude and north of 2 NW</option>
                            <option value="12C Vryburg (south of 26o30? latitude) NW">12C Vryburg (south of 26o30? latitude) NW</option>
                            <option value="17C Vryburg (west of 24o longitude) NW">17C Vryburg (west of 24o longitude) NW</option>
                            <option value="06C Vryheid ZN">06C Vryheid ZN</option>
                            <option value="13C Vuwani LP">13C Vuwani LP</option>
                            <option value="58C Wakkerstroom MP">58C Wakkerstroom MP</option>
                            <option value="11C Warrenton NC">11C Warrenton NC</option>
                            <option value="11C Waterberg LP">11C Waterberg LP</option>
                            <option value="10C Waterval - Boven MP">10C Waterval - Boven MP</option>
                            <option value="05B Weenen ZN">05B Weenen ZN</option>
                            <option value="09C Welkom FS">09C Welkom FS</option>
                            <option value="02A Wellington WC">02A Wellington WC</option>
                            <option value="08A Wepener FS">08A Wepener FS</option>
                            <option value="09C Wesselsbron FS">09C Wesselsbron FS</option>
                            <option value="09C Westonaria GP">09C Westonaria GP</option>
                            <option value="61C White River MP">61C White River MP</option>
                            <option value="10B Williston NC">10B Williston NC</option>
                            <option value="07B Willowmore EC">07B Willowmore EC</option>
                            <option value="10C Winburg FS">10C Winburg FS</option>
                            <option value="09C Witbank MP">09C Witbank MP</option>
                            <option value="07C Witsieshoek FS">07C Witsieshoek FS</option>
                            <option value="07A W odehous e EC">07A W odehous e EC</option>
                            <option value="10C Wolmaranstad NW">10C Wolmaranstad NW</option>
                            <option value="09C Wonderboom GP">09C Wonderboom GP</option>
                            <option value="05A Worcester WC">05A Worcester WC</option>
                            <option value="01A Wynberg WC">01A Wynberg WC</option>
                            <option value="07A Xalanga EC">07A Xalanga EC</option>
                            <option value="57A Xhora ( Elliotdale) EC">57A Xhora ( Elliotdale) EC</option>
                            <option value="08A Zastron FS">08A Zastron FS</option>
                            <option value="03A Zwelitsha EC">03A Zwelitsha EC</option>
                        </select>
                      </div>
                      
                      {/* Delivery Address */}
                      <div style={{ marginBottom: '0' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '5px', 
                          color: '#1D2A35', 
                          fontSize: '14px', 
                          fontWeight: 600 
                        }}>
                          Delivery Address *
                        </label>
                        <textarea
                          value={form.deliveryAddress}
                          onChange={e => setForm(f => ({ ...f, deliveryAddress: e.target.value }))}
                          placeholder="Please provide complete delivery address including:&#10;- Street Address&#10;- Suburb&#10;- Postal Code&#10;- Special delivery instructions (if any)"
                          style={{ 
                            width: '100%', 
                            padding: '12px 16px', 
                            borderRadius: '8px', 
                            border: '2px solid #e0e0e0', 
                            minHeight: 100, 
                            fontSize: 15, 
                            resize: 'vertical', 
                            boxSizing: 'border-box', 
                            outline: 'none', 
                            fontFamily: 'inherit',
                            background: '#fff'
                          }}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Additional Information Section */}
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
                      Additional Information
                    </h3>

                    {/* Comments */}
                    <div style={{ marginBottom: '0' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '5px', 
                        color: '#1D2A35', 
                        fontSize: '14px', 
                        fontWeight: 600 
                      }}>
                        Additional Comments
                      </label>
                      <textarea
                        value={form.comments}
                        onChange={e => setForm(f => ({ ...f, comments: e.target.value }))}
                        placeholder="Please include any special requirements, delivery preferences, or additional information that would help us provide you with the best service."
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '2px solid #e0e0e0', 
                          minHeight: 100, 
                          fontSize: 15, 
                          resize: 'vertical', 
                          boxSizing: 'border-box', 
                          outline: 'none', 
                          fontFamily: 'inherit',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

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
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.3)';
                    }}
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{
        width: '100%',
        maxWidth: 1000,
        background: theme === 'dark' ? '#232b36' : '#f5f5f5',
        borderRadius: '24px',
        padding: '3rem 2rem',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
        border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          Fuel Distribution You Can Count On
        </h2>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: theme === 'dark' ? '#cbd5e0' : '#4a5568',
          textAlign: 'left',
        }}>
          <p>
            At Stonehouse Holdings, we provide reliable and efficient fuel supply solutions for transport companies and businesses across South Africa. With access to a partnered fuel depot in Bloemfontein, we're able to offer a strategic advantage for fleet operators in the region. Our nationwide distribution network ensures that whether you're in a major city or a remote location, your operations keep moving with quality diesel and petrol delivered on time.
          </p>
        </div>
      </div>
    </div>
  );
}
