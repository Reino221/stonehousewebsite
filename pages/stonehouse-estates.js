import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from './_app';

export default function StonehouseEstates() {
  const { theme } = useContext(ThemeContext);
  const facebookQrRef = useRef(null);
  const whatsappQrRef = useRef(null);
  
  // Contact form state
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    contactNumber: '',
    emailAddress: '',
    comments: ''
  });
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.fullName || !contactForm.contactNumber || !contactForm.emailAddress) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.emailAddress)) {
      setSubmitMessage('Please enter a valid email address.');
      return;
    }
    
    // Create and send email
    let emailBody = `STONEHOUSE ESTATES CONTACT REQUEST\n\n`;
    emailBody += `CLIENT INFORMATION:\n`;
    emailBody += `Full Name: ${contactForm.fullName}\n`;
    emailBody += `Contact Number: ${contactForm.contactNumber}\n`;
    emailBody += `Email Address: ${contactForm.emailAddress}\n\n`;
    if (contactForm.comments.trim()) {
      emailBody += `MESSAGE:\n${contactForm.comments}\n\n`;
    }
    emailBody += `Please respond to this Stonehouse Estates inquiry.\n\n`;
    emailBody += `Best regards,\n${contactForm.fullName}`;
    
    const emailSubject = `Stonehouse Estates Contact Request - ${contactForm.fullName}`;
    const mailtoLink = `mailto:stonehouseholdings24@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    setSubmitMessage('Thank you! Your message has been submitted successfully.');
    
    // Reset form
    setContactForm({
      fullName: '',
      contactNumber: '',
      emailAddress: '',
      comments: ''
    });
    
    // Clear message after 3 seconds and close form
    setTimeout(() => {
      setSubmitMessage('');
      setShowContactForm(false);
    }, 3000);
  };

  // Close form function
  const closeContactForm = () => {
    setShowContactForm(false);
    setSubmitMessage('');
    setContactForm({
      fullName: '',
      contactNumber: '',
      emailAddress: '',
      comments: ''
    });
  };

  useEffect(() => {
    // Load QR code library and generate QR codes
    const loadQRCode = async () => {
      if (typeof window !== 'undefined') {
        const QRCode = (await import('qrcode')).default;
        
        // Generate Facebook QR code
        if (facebookQrRef.current) {
          QRCode.toCanvas(facebookQrRef.current, 
            'https://www.facebook.com/share/1Avd5zjM2y/?mibextid=wwXIfr', 
            {
              width: 80,
              height: 80,
              color: {
                dark: '#1877f2',
                light: '#ffffff'
              },
              margin: 1
            }
          );
        }
        
        // Generate WhatsApp QR code
        if (whatsappQrRef.current) {
          QRCode.toCanvas(whatsappQrRef.current, 
            'https://wa.me/message/EBQN6GQHWTKDH1', 
            {
              width: 80,
              height: 80,
              color: {
                dark: '#25d366',
                light: '#ffffff'
              },
              margin: 1
            }
          );
        }
      }
    };

    loadQRCode();
  }, []);

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
        backgroundImage: 'url("/Estates 2.jpg")',
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
            Stonehouse Estates
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            fontWeight: 500, 
            color: '#fff', 
            textShadow: '0 2px 4px rgba(0,0,0,0.6)', 
            marginBottom: 0,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.4'
          }}>
            Professional deceased estate administration and asset management services
          </p>
        </div>
        
        {/* Contact Us Button */}
        <div style={{ 
          position: 'absolute', 
          bottom: 32, 
          left: 0, 
          width: '100%', 
          zIndex: 3, 
          display: 'flex', 
          justifyContent: 'center' 
        }}>
          <button
            onClick={() => setShowContactForm(true)}
            style={{
              background: '#fff',
              color: '#1D2A35',
              border: '2px solid #FFD700',
              borderRadius: 40,
              width: 140,
              height: 48,
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#FFD700';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#1D2A35';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
            }}
          >
            Contact Us
          </button>
        </div>
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
          Deceased Estate Administration
        </h2>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: theme === 'dark' ? '#cbd5e0' : '#4a5568',
          textAlign: 'center',
        }}>
          <p style={{ marginBottom: '2rem' }}>
            Stonehouse Estates specializes in the comprehensive administration of deceased estates, providing compassionate 
            and professional services during difficult times. Our experienced team, with over 10 years of experience, handles all aspects of estate management, 
            from initial valuations to final distribution, ensuring legal compliance and family peace of mind.
          </p>
          
          <p style={{ marginBottom: '2rem' }}>
            We offer complete estate administration services including asset identification and valuation, debt settlement, 
            tax compliance, and beneficiary distribution. Our expertise covers residential and commercial properties, 
            personal assets, investments, and business interests, providing thorough and transparent estate management.
          </p>
          
          <p>
            With sensitivity to family dynamics and a deep understanding of estate law, we guide executors and beneficiaries 
            through the complex process of estate settlement. Our commitment extends to maximizing estate value while 
            minimizing administrative burden and ensuring timely, equitable distribution of assets.
          </p>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
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
        }}
        onClick={closeContactForm}
        >
          <div style={{
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
            transition: 'all 0.3s ease'
          }}
          onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeContactForm}
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                color: '#999',
                borderRadius: '50%',
                width: 35,
                height: 35,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              aria-label="Close form"
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = '#999'}
            >
              ×
            </button>

            {/* Form Header */}
            <div style={{
              padding: '30px 30px 20px',
              flexShrink: 0,
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              textAlign: 'center'
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: 24,
                color: '#1D2A35',
                marginBottom: 10
              }}>
                Contact Stonehouse Estates
              </div>
              <div style={{
                color: '#666',
                fontSize: 14
              }}>
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </div>
            </div>

            {/* Form Content */}
            <div style={{
              overflowY: 'auto',
              padding: '0 30px 30px',
              flexGrow: 1
            }}>
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
                
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
                    Contact Information
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        value={contactForm.fullName}
                        onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })}
                        placeholder="Full Name *"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: 10,
                          border: '2px solid #e0e0e0',
                          fontSize: 15,
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff',
                          color: '#1D2A35'
                        }}
                        required
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <input
                        type="tel"
                        value={contactForm.contactNumber}
                        onChange={e => setContactForm({ ...contactForm, contactNumber: e.target.value })}
                        placeholder="Contact Number *"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: 10,
                          border: '2px solid #e0e0e0',
                          fontSize: 15,
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff',
                          color: '#1D2A35'
                        }}
                        required
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <input
                        type="email"
                        value={contactForm.emailAddress}
                        onChange={e => setContactForm({ ...contactForm, emailAddress: e.target.value })}
                        placeholder="Email Address *"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: 10,
                          border: '2px solid #e0e0e0',
                          fontSize: 15,
                          boxSizing: 'border-box',
                          outline: 'none',
                          background: '#fff',
                          color: '#1D2A35'
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message Section */}
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
                    Your Message
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                    {/* Comments */}
                    <div>
                      <textarea
                        value={contactForm.comments}
                        onChange={e => setContactForm({ ...contactForm, comments: e.target.value })}
                        placeholder="Tell us about your inquiry or how we can help you (optional)"
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: 10,
                          border: '2px solid #e0e0e0',
                          minHeight: 100,
                          fontSize: 15,
                          resize: 'vertical',
                          boxSizing: 'border-box',
                          outline: 'none',
                          fontFamily: 'inherit',
                          background: '#fff',
                          color: '#1D2A35'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div style={{
                    color: submitMessage.includes('successfully') ? '#38a169' : '#e53e3e',
                    fontWeight: 600,
                    fontSize: 14,
                    textAlign: 'center',
                    padding: '10px',
                    borderRadius: 8,
                    background: submitMessage.includes('successfully') ? '#f0fff4' : '#fed7d7'
                  }}>
                    {submitMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1D2A35',
                    border: 'none',
                    borderRadius: 50,
                    height: 52,
                    fontWeight: 800,
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: 10,
                    boxShadow: '0 4px 16px rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)'; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.3)'; 
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
