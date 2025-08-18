import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './_app';
import * as XLSX from 'xlsx';
import SignupForm from '../components/SignupForm'; // Correct import for SignupForm
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

// Button and highlight styles for Sign Up modal trigger
const buttonStyle = (theme) => ({
  background: 'none',
  color: '#fff',
  border: theme === 'dark' ? '2px solid #FFD700' : 'none',
  borderRadius: theme === 'dark' ? '999px' : '6px',
  padding: '0.5rem 1.2rem',
  marginRight: '1rem',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s, border 0.2s',
  outline: 'none',
  display: 'inline-block',
  boxShadow: theme === 'dark' ? '0 2px 8px rgba(200,200,0,0.10)' : 'none',
});

const hoverTextStyle = {
  background: 'linear-gradient(90deg, #C99700, #FFD700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  color: 'unset',
  border: 'none',
  display: 'inline',
};

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [quoteHovered, setQuoteHovered] = useState('');
  const [quoteSelected, setQuoteSelected] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false); // State for signup modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    product: '',
    productOption: '',
    quantity: '',
    message: '',
    date: null, // for react-datepicker
    paymentType: 'COC', // default to COC
  });
  const [selected, setSelected] = useState(''); // Add state for selected button highlight
  const [litresError, setLitresError] = useState(false);
  const [quantityError, setQuantityError] = useState(false); // Add error state for quantity/volume fields (for all forms)
  const [isAdminClient, setIsAdminClient] = useState(false);
  const [showProcedureDropdown, setShowProcedureDropdown] = useState(false); // For Fertilizer/LPG-LNG procedure dropdown
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('stonehouse_profile');
      if (stored) {
        try {
          const profile = JSON.parse(stored);
          if (profile.email === 'reinofourie@icloud.com') {
            setIsAdminClient(true);
          }
        } catch {}
      }
    }
  }, []);

  // Helper to open form with product type
  const openQuoteForm = (product) => {
    // Reset form fields for each new form
    setFormData({
      name: '',
      email: '',
      company: '',
      product,
      productOption: '',
      quantity: '',
      litres: '',
      message: '',
      date: null,
      paymentType: (product === 'International Fuel Quotation') ? '' : (product === 'Fertilizer Quotation' || product === 'LPG / LNG Quotation' ? '' : 'COC'),
      address: '',
      comments: '',
    });
    setShowQuoteForm(true);
    setQuoteSelected(product);
  };

  // Helper to close form
  const closeQuoteForm = () => {
    setShowQuoteForm(false);
    setQuoteSelected('');
  };

  // Helper to handle form input
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update litres input handler for error logic
  const handleLitresChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, litres: value });
    if (value !== '' && Number(value) < 20000) {
      setLitresError(true);
    } else {
      setLitresError(false);
    }
  };

  // Generalized handler for volume/quantity fields (min/max logic can be customized per product)
  const handleQuantityChange = (e, min = 1, max = null) => {
    const value = e.target.value;
    setFormData({ ...formData, quantity: value });
    let error = false;
    if (value !== '') {
      if (Number(value) < min) error = true;
      if (max !== null && Number(value) > max) error = true;
    }
    setQuantityError(error);
  };

  // Excel download handler
  const handleDownloadExcel = () => {
    // Sample data
    const data = [
      { Name: 'John Doe', Email: 'john@example.com', Company: 'Acme Inc.' },
      { Name: 'Jane Smith', Email: 'jane@example.com', Company: 'Beta LLC' },
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'stonehouse_sample.xlsx');
  };

  // Helper for scaling style for button highlight
  const scaleIfSelected = (btn, selected) => selected === btn ? { transform: 'scale(1.12)', zIndex: 1, transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' } : {};

  // Define a shared style for all modal fields to ensure pixel-perfect match
  const modalFieldStyle = {
    width: '100%',
    height: 48,
    borderRadius: 12,
    border: '1.5px solid #e0e0e0',
    fontSize: 16,
    background: '#f7f7f7',
    color: '#1D2A35',
    padding: '1.1rem 0.9rem 0.5rem 0.9rem',
    outline: 'none',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(200,200,200,0.10)',
    transition: 'border 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    appearance: 'none',
    resize: 'none',
    lineHeight: 'normal',
    display: 'block',
    overflow: 'hidden',
  };

  // Map for min/max per fuel type (International)
  const fuelTypeLimits = {
    'JET A1': { min: 350000, max: 3000000, unit: 'MT', label: 'Litres needed (min 350,000MT pm - max 3,000,000MT pm)' },
    'EN 590': { min: 20000, max: 300000, unit: 'MT', label: 'Litres needed (min 20,000MT pm - max 300,000MT pm)' },
    'D6': { min: 25000000, max: 400000000, unit: 'Gallons', label: 'Gallons needed (min 25MM - max 400MM Gallons pm)' },
    'JP 54': { min: 350000, max: 3000000, unit: 'BBLS', label: 'BBLS needed (min 350,000BBLS - max 3,000,000BBLS pm)' },
    'Diesel D2': { min: 20000, max: 200000, unit: 'MT', label: 'Litres needed (min 20,000MT pm - max 200,000MT pm)' },
    'WTI': { min: 500000, max: 3000000, unit: 'BBLS', label: 'BBLS needed (min 500,000BBLS pm - max 3,000,000BBLS pm)' },
  };

  // Add fertilizerTypeLimits for Fertilizer Quotation
  const fertilizerTypeLimits = {
    'Urea N46 - Prilled': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'Urea N46 - Granulated': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'DAP': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'NPK': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'Sulphur': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'Ammonium Nitrate': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
    'MOP': { min: 10000, max: 500000, unit: 'MT', label: 'Quantity Needed (min 10,000MT pm - max 500,000MT pm)' },
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: theme === 'dark' ? '#181d23' : '#f7f7f7', paddingTop: '2rem' }}>




              {[{
                key: 'fuel-rsa',
                label: 'Fuel Quotation (RSA)'
              }, {
                key: 'fuel-int',
                label: 'International Fuel Quotation'
              }, {
                key: 'fertilizer',
                label: 'Fertilizer Quotation'
              }, {
                key: 'lpg-lng',
                label: 'LPG / LNG Quotation'
              }].map(btn => (
                <button
                  key={btn.key}
                  style={{
                    background: quoteHovered === btn.key || quoteSelected === btn.label ? '#FFD700' : '#fff',
                    color: '#1D2A35',
                    border: '2.5px solid #FFD700',
                    borderRadius: 14,
                    padding: '0.9rem 1.1rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s, border 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    outline: 'none',
                    margin: 0,
                    minWidth: 120,
                    maxWidth: 200,
                    minHeight: 44,
                    maxHeight: 52,
                    flex: '1 1 120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    lineHeight: 1.18,
                    letterSpacing: 0.1,
                  }}
                  onMouseEnter={() => setQuoteHovered(btn.key)}
                  onMouseLeave={() => setQuoteHovered('')}
                  onClick={() => openQuoteForm(btn.label)}
                >
                  <span style={{
                    width: '100%',
                    textAlign: 'center',
                    display: 'block',
                    fontWeight: 700,
                    borderRadius: 8,
                    background: 'transparent',
                    color: '#1D2A35',
                    transition: 'background 0.18s, color 0.18s',
                    padding: '0.1rem 0.2rem',
                  }}>{btn.label}</span>
                </button>
              ))}
            </div>
            <div style={{
              width: '100%',
              maxWidth: 900, // limit width for better readability
              background: '#d3d6db', // changed to a calm grey
              borderRadius: 16,
              boxShadow: theme === 'dark' ? '0 2px 12px rgba(200,200,0,0.07)' : '0 2px 12px rgba(0,0,0,0.07)',
              padding: '1.2rem 1.5rem', // reduced padding for more space
              textAlign: 'center',
              border: theme === 'dark' ? '1.5px solid #223044' : '1.5px solid #e0e0e0',
              color: theme === 'dark' ? '#1D2A35' : '#1D2A35', // always dark text for visibility
              fontSize: '1.18rem',
              fontWeight: 500,
              letterSpacing: 0.1,
              marginBottom: '1.2rem',
              pointerEvents: 'auto',
              maxHeight: '60%',
              overflowY: 'auto',
              lineHeight: 1.5,
              wordBreak: 'break-word',
            }}>
              <span style={{ fontWeight: 700 }}>
                <span style={{
                  background: 'linear-gradient(90deg, #C99700, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  padding: '0 0.15em'
                }}>Stonehouse</span>{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #C0C0C0, #888888)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  padding: '0 0.15em'
                }}>Holdings</span>
              </span> is proud to announce our strategic partnership with <span style={{ fontWeight: 700, background: 'linear-gradient(90deg, #C99700, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mansasol</span>, combining our strengths to deliver greater value and reliability in the fuel and energy sector.<br /><br />Together, we supply <span style={{ fontWeight: 700 }}>Diesel, ULP, Jet A1, Fertilizers, LPG,</span> and <span style={{ fontWeight: 700 }}>LNG</span> across various industries and markets <span style={{ fontWeight: 700 }}>(locally and globally)</span>.
            </div>
          </div>
        </div>
      </div>
      {/* Four clickable columns section - Modern Design */}
      <div style={{
        width: '100%',
        maxWidth: 1400,
        padding: '4rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3.5rem',
        background: theme === 'dark' ? 'linear-gradient(135deg, #181f26 0%, #1a2027 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '32px',
        margin: '2rem auto',
      }}>
        {/* Modern section title with subtitle */}
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
              : 'linear-gradient(135deg, #1D2A35 0%, #2D3748 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}>
            Our Business Divisions
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: theme === 'dark' ? '#a0a0a0' : '#64748b',
            textAlign: 'center',
            fontWeight: 400,
            lineHeight: '1.6',
            marginBottom: '0',
          }}>
            Explore our diverse portfolio of industry-leading services and solutions
          </p>
        </div>
        
        {/* Four columns container - 2x2 Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '2.5rem',
          width: '100%',
          maxWidth: '900px',
        }}>
          {/* Add responsive CSS for mobile */}
          <style jsx>{`
            @media (max-width: 768px) {
              div[style*="gridTemplateColumns"] {
                grid-template-columns: 1fr !important;
                grid-template-rows: repeat(4, 1fr) !important;
                max-width: 400px !important;
              }
            }
          `}</style>
          {/* Column 1: Refineries - Modern Glass Card with Background */}
          <div
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(145deg, rgba(35,43,54,0.8) 0%, rgba(28,35,42,0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backgroundImage: 'url("/Refineries.jpg")', // Added .jpg extension
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={() => {
              router.push('/refineries');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 20px 60px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,215,0,0.3)'
                : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)';
            }}
          >
            {/* Dark overlay for better text readability over background image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            {/* Gradient overlay effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,165,0,0.05) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                Refineries
              </h3>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: '1.7',
              marginBottom: '0',
              fontWeight: 500,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            }}>
              Industrial-scale fuel processing and production facilities serving global markets with cutting-edge technology
            </p>
          </div>

          {/* Column 2: Diesel / ULP Local - Modern Glass Card with Background */}
          <div
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(145deg, rgba(35,43,54,0.8) 0%, rgba(28,35,42,0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backgroundImage: 'url("/Diesel.jpg")', // Updated to use Diesel.jpg
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={() => {
              router.push('/diesel-ulp');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 20px 60px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,215,0,0.3)'
                : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)';
            }}
          >
            {/* Dark overlay for better text readability over background image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            {/* Green accent gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(16,185,129,0.05) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                Diesel / ULP RSA
              </h3>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: '1.7',
              marginBottom: '0',
              fontWeight: 500,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            }}>
              Local fuel distribution and supply services for diesel and unleaded petrol throughout South Africa with reliable delivery networks
            </p>
          </div>

          {/* Column 3: Stonehouse Estates - Modern Glass Card with Background */}
          <div
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(145deg, rgba(35,43,54,0.8) 0%, rgba(28,35,42,0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backgroundImage: 'url("/Estates.jpg")', // Updated to use Estates.jpg
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={() => {
              router.push('/stonehouse-estates');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 20px 60px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,215,0,0.3)'
                : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)';
            }}
          >
            {/* Dark overlay for better text readability over background image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            {/* Purple accent gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(124,58,237,0.05) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                Stonehouse Estates
              </h3>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: '1.7',
              marginBottom: '0',
              fontWeight: 500,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            }}>
              Professional deceased estate administration and asset management services with comprehensive legal support
            </p>
          </div>

          {/* Column 4: Agriculture - Modern Glass Card with Background */}
          <div
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(145deg, rgba(35,43,54,0.8) 0%, rgba(28,35,42,0.9) 100%)'
                : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)',
              backgroundImage: 'url("/Agri.jpg")', // Updated to use Agri.jpg (capital A)
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              boxShadow: theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
              border: theme === 'dark' ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={() => {
              router.push('/agriculture');
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 20px 60px rgba(255,215,0,0.2), 0 0 0 1px rgba(255,215,0,0.3)'
                : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,215,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = theme === 'dark' 
                ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.1)'
                : '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)';
            }}
          >
            {/* Dark overlay for better text readability over background image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            {/* Green accent gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(22,163,74,0.05) 100%)',
              borderRadius: '24px',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}>
                Agriculture
              </h3>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: '1.7',
              marginBottom: '0',
              fontWeight: 500,
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)',
            }}>
              Agricultural supplies, fertilizers, and farming solution services supporting sustainable agriculture
            </p>
          </div>
        </div>
      </div>

      {/* Main content below announcement and quotation buttons */}
      <div style={{ flex: 1 }} />
      {/* Quotation Form Modal */}
      {showQuoteForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000
        }}
          onClick={closeQuoteForm}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '2rem 1.5rem 1.5rem 1.5rem',
              minWidth: '320px',
              maxWidth: '400px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
              position: 'relative',
              color: '#222',
              border: '1.5px solid #e7e7e7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh', // Make modal content scrollable
              overflowY: 'auto', // Enable vertical scrolling
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={closeQuoteForm} style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#bbb', transition: 'color 0.2s', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }} onMouseOver={e => e.currentTarget.style.color = '#C99700'} onMouseOut={e => e.currentTarget.style.color = '#bbb'} aria-label="Close form">&times;</button>
            <div style={{ fontWeight: 800, fontSize: 20, color: '#C99700', marginBottom: 6, textAlign: 'center', letterSpacing: 0.5 }}>{formData.product.replace('Quotation', '').trim()}</div>
            <h2 style={{ marginBottom: '1.2rem', color: '#1D2A35', textAlign: 'center', fontWeight: 800, letterSpacing: 0.5, fontSize: 22 }}>Request a Quotation</h2>
            <form onSubmit={e => { e.preventDefault(); /* handle submit logic here */ }} style={{ width: '100%' }}>
              {/* All modal fields start here */}
              {/* Select dropdown: custom options for Fertilizer and LPG/LNG, fuel options for International */}
              {(formData.product === 'International Fuel Quotation' || formData.product === 'Fertilizer Quotation' || formData.product === 'LPG / LNG Quotation') && (
                <>
                  <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                    <select
                      name="productOption"
                      value={formData.productOption || ''}
                      onChange={e => setFormData({ ...formData, productOption: e.target.value })}
                      required
                      style={{
                        ...modalFieldStyle,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        paddingRight: '0.9rem',
                        background: '#f7f7f7',
                      }}
                    >
                      {formData.product === 'Fertilizer Quotation' ? (
                        <>
                          <option value="" disabled>Select Fertilizer</option>
                          <option value="Urea N46 - Prilled">Urea N46 - Prilled (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="Urea N46 - Granulated">Urea N46 - Granulated (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="DAP">DAP (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="NPK">NPK (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="Sulphur">Sulphur (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="Ammonium Nitrate">Ammonium Nitrate (min 10,000MT pm - max 500,000MT pm)</option>
                          <option value="MOP">MOP (min 10,000MT pm - max 500,000MT pm)</option>
                        </>
                      ) : formData.product === 'LPG / LNG Quotation' ? (
                        <>
                          <option value="" disabled>Select Product</option>
                          <option value="LPG">LPG</option>
                          <option value="LNG">LNG</option>
                        </>
                      ) : (
                        <>
                          <option value="" disabled>Select Fuel Type</option>
                          <option value="JET A1">JET A1 (min 350,000MT pm - max 3,000,000MT pm)</option>
                          <option value="EN 590">EN 590 (min 20,000MT pm - max 300,000MT pm)</option>
                          <option value="D6">D6 (min 25MM - max 400MM Gallons pm)</option>
                          <option value="JP 54">JP 54 (min 350,000BBLS - max 3,000,000BBLS pm)</option>
                          <option value="Diesel D2">Diesel D2 (min 20,000MT pm - max 200,000MT pm)</option>
                          <option value="WTI">WTI (min 500,000BBLS pm - max 3,000,000BBLS pm)</option>
                        </>
                      )}
                    </select>
                  </div>
                  {/* Custom dropdown button for Procedure for International Fuel Quotation only */}
                  {formData.product === 'International Fuel Quotation' && (
                    <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                      <button
                        type="button"
                        style={{
                          ...modalFieldStyle,
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#f7f7f7',
                          border: '1.5px solid #e0e0e0',
                          fontWeight: 500,
                          fontSize: 16,
                          color: formData.paymentType ? '#1D2A35' : '#888',
                          position: 'relative',
                          zIndex: 10,
                        }}
                        onClick={() => setShowProcedureDropdown(prev => !prev)}
                      >
                        {formData.paymentType || 'Select Procedure'}
                        <span style={{ marginLeft: 8, fontSize: 18, color: '#888' }}>&#9662;</span>
                      </button>
                      {showProcedureDropdown && (
                        <div style={{
                          position: 'absolute',
                          top: 50,
                          left: 0,
                          width: '100%',
                          background: '#fff',
                          border: '1.5px solid #e0e0e0',
                          borderRadius: 10,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          zIndex: 20,
                          maxHeight: 180,
                          overflowY: 'auto',
                        }}>
                          {['FOB - TTT', 'FOB - TTO', 'FOB - VTO', 'FOB - TTV', 'CIF'].map(proc => (
                            <div
                              key={proc}
                              style={{
                                padding: '0.7rem 1rem',
                                cursor: 'pointer',
                                color: '#1D2A35',
                                fontWeight: 500,
                                fontSize: 16,
                                background: formData.paymentType === proc ? '#FFE066' : 'transparent',
                                borderRadius: 8,
                                transition: 'background 0.18s',
                              }}
                              onClick={() => {
                                setFormData({ ...formData, paymentType: proc });
                                setShowProcedureDropdown(false);
                              }}
                            >
                              {proc}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Custom dropdown button for Procedure for Fertilizer and LPG/LNG only */}
                  {(formData.product === 'Fertilizer Quotation' || formData.product === 'LPG / LNG Quotation') && (
                    <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                      <button
                        type="button"
                        style={{
                          ...modalFieldStyle,
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#f7f7f7',
                          border: '1.5px solid #e0e0e0',
                          fontWeight: 500,
                          fontSize: 16,
                          color: formData.paymentType ? '#1D2A35' : '#888',
                          position: 'relative',
                          zIndex: 10,
                        }}
                        onClick={() => setShowProcedureDropdown(prev => !prev)}
                      >
                        {formData.paymentType || 'Select Procedure'}
                        <span style={{ marginLeft: 8, fontSize: 18, color: '#888' }}>&#9662;</span>
                      </button>
                      {showProcedureDropdown && (
                        <div style={{
                          position: 'absolute',
                          top: 50,
                          left: 0,
                          width: '100%',
                          background: '#fff',
                          border: '1.5px solid #e0e0e0',
                          borderRadius: 10,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          zIndex: 20,
                          maxHeight: 180,
                          overflowY: 'auto',
                        }}>
                          {['FOB - TTT', 'FOB - TTO', 'FOB - VTO', 'FOB - TTV', 'CIF'].map(proc => (
                            <div
                              key={proc}
                              style={{
                                padding: '0.7rem 1rem',
                                cursor: 'pointer',
                                color: '#1D2A35',
                                fontWeight: 500,
                                fontSize: 16,
                                background: formData.paymentType === proc ? '#FFE066' : 'transparent',
                                borderRadius: 8,
                                transition: 'background 0.18s',
                              }}
                              onClick={() => {
                                setFormData({ ...formData, paymentType: proc });
                                setShowProcedureDropdown(false);
                              }}
                            >
                              {proc}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Show non-negotiable procedures if FOB - TTT is selected (International only) */}
                  {(formData.product === 'International Fuel Quotation' || formData.product === 'Fertilizer Quotation' || formData.product === 'LPG / LNG Quotation') && formData.paymentType === 'FOB - TTT' && (
                    <div style={{
                      background: '#f7f7f7',
                      border: '1.5px solid #e0e0e0',
                      borderRadius: 12,
                      padding: '1.1rem 1rem',
                      marginBottom: 18,
                      color: '#1D2A35',
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: 1.6,
                    }}>
                      <div style={{fontWeight:700, marginBottom:8, color:'#C99700'}}>Non-Negotiable Procedures (FOB - TTT):</div>
                      <ol style={{paddingLeft:20, margin:0}}>
                        <li>Buyer issues ICPO, Company Registration Certificate and TSA.</li>
                        <li>Seller issues commercial invoice, Buyer signs and return commercial invoice along with an acceptance letter of commitment to execute transaction.</li>
                        <li>Seller issues to Buyer the below Partial POP Documents:
                          <ol type="a" style={{paddingLeft:18}}>
                            <li>Statement of Product Availability.</li>
                            <li>Unconditional Commitment to Supply.</li>
                            <li>SGS/CCIC Chemical Testing Application Form issued by Seller, to be signed by Buyer for processing of Fresh SGS/CCIC.</li>
                            <li>Inspection Approval Letter to be signed by buyer’s tank farm.</li>
                          </ol>
                        </li>
                        <li>Upon confirmation of the above documents by Buyer, Seller issues to the Buyer the below Full POP Documents:
                          <ol type="a" style={{paddingLeft:18}}>
                            <li>Injection Schedule.</li>
                            <li>Act of Transfer / Change of Ownership Documents.</li>
                            <li>Authority to Sell and Collect (ATSC)</li>
                            <li>Freshly Updated SGS/CCIC Report (72 Hours).</li>
                            <li>Injection / Q&Q Report.</li>
                            <li>Tank Storage Receipt (TSR) with tank number, GPS coordinates and tank location.</li>
                            <li>Authorization to Verify (ATV) physical verification.</li>
                            <li>Unconditional Dip Test Authorization (DTA).</li>
                          </ol>
                        </li>
                        <li>NCNDA/IMFPA is signed by all intermediaries / agents / mandates involved. Upon successful dip test by Buyer, Buyer presents its TSR and Seller injects product into Buyer’s tanks and Buyer makes payment for the total value of product injected into the tanks by MT103/TT.</li>
                        <li>Seller pays all intermediaries / agents / mandates involved in the transaction. Upon satisfaction by Buyer, both Buyer and Seller sign contract for monthly delivery with rolls and extension. Within 24 hours of the completion of the injection, the Seller pays commissions to all intermediaries involved for the initial lift and on all subsequent lifts.</li>
                      </ol>
                    </div>
                  )}
                  {/* Fuel Quotation (RSA): Swap COC/COD selector above Select Fuel Type dropdown, restore static min litres logic */}
                  {formData.product === 'Fuel Quotation (RSA)' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 18 }}>
                        {['COC', 'COD'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, paymentType: type })}
                            style={{
                              padding: '0.7rem 1.5rem',
                              borderRadius: 12,
                              border: formData.paymentType === type ? '2px solid #FFD700' : '1.5px solid #e0e0e0',
                              background: formData.paymentType === type ? 'linear-gradient(90deg, #FFD700, #C99700)' : '#f7f7f7',
                              color: formData.paymentType === type ? '#1D2A35' : '#888',
                              fontWeight: 700,
                              fontSize: 16,
                              cursor: 'pointer',
                              boxShadow: formData.paymentType === type ? '0 2px 8px rgba(200,200,0,0.10)' : '0 2px 8px rgba(200,200,200,0.10)',
                              outline: 'none',
                              transition: 'background 0.2s, color 0.2s, border 0.2s',
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                        <select
                          name="productOption"
                          value={formData.productOption || ''}
                          onChange={e => setFormData({ ...formData, productOption: e.target.value })}
                          required
                          style={modalFieldStyle}
                        >
                          <option value="" disabled>Select Fuel Type</option>
                          <option value="ULP 93">ULP 93</option>
                          <option value="ULP 95">ULP 95</option>
                          <option value="Diesel 10 PPM">Diesel 10 PPM</option>
                          <option value="Diesel 50 PPM">Diesel 50 PPM</option>
                        </select>
                      </div>
                    </>
                  )}
                  {/* Litres input: static min for RSA, dynamic for others */}
                  <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                    <input
                      name="litres"
                      type="number"
                      min={formData.product === 'Fuel Quotation (RSA)'
                        ? 20000
                        : formData.product === 'Fertilizer Quotation'
                          ? (fertilizerTypeLimits[formData.productOption]?.min || 1)
                          : (fuelTypeLimits[formData.productOption]?.min || 1)}
                      max={formData.product === 'Fuel Quotation (RSA)'
                        ? ''
                        : formData.product === 'Fertilizer Quotation'
                          ? (fertilizerTypeLimits[formData.productOption]?.max || '')
                          : (fuelTypeLimits[formData.productOption]?.max || '')}
                      placeholder={formData.product === 'Fuel Quotation (RSA)'
                        ? 'Litres needed (min 20,000 litres)'
                        : formData.product === 'Fertilizer Quotation'
                          ? (fertilizerTypeLimits[formData.productOption]?.label || 'Quantity Needed')
                          : (fuelTypeLimits[formData.productOption]?.label
                              ? fuelTypeLimits[formData.productOption].label.replace(/Litres needed/i, 'Quantity Needed')
                              : 'Quantity Needed')}
                      value={formData.litres || ''}
                      onChange={e => {
                        const value = e.target.value;
                        setFormData({ ...formData, litres: value });
                        if (formData.product === 'Fuel Quotation (RSA)') {
                          setLitresError(value !== '' && Number(value) < 20000);
                        } else if (formData.product === 'Fertilizer Quotation') {
                          const limits = fertilizerTypeLimits[formData.productOption];
                          if (limits) {
                            setLitresError(value !== '' && (Number(value) < limits.min || Number(value) > limits.max));
                          } else {
                            setLitresError(false);
                          }
                        } else {
                          const limits = fuelTypeLimits[formData.productOption];
                          if (limits) {
                            setLitresError(value !== '' && (Number(value) < limits.min || Number(value) > limits.max));
                          } else {
                            setLitresError(false);
                          }
                        }
                      }}
                      required
                      style={modalFieldStyle}
                    />
                    {litresError && (
                      <span style={{ color: 'red', fontSize: 13, position: 'absolute', left: 0, bottom: -18 }}>
                        {formData.product === 'Fuel Quotation (RSA)'
                          ? 'Please enter at least 20,000 litres.'
                          : formData.product === 'Fertilizer Quotation'
                            ? `Please enter a value between ${fertilizerTypeLimits[formData.productOption]?.min?.toLocaleString()} and ${fertilizerTypeLimits[formData.productOption]?.max?.toLocaleString()} ${fertilizerTypeLimits[formData.productOption]?.unit || ''}.`
                            : `Please enter a value between ${fuelTypeLimits[formData.productOption]?.min?.toLocaleString()} and ${fuelTypeLimits[formData.productOption]?.max?.toLocaleString()} ${fuelTypeLimits[formData.productOption]?.unit || ''}.`}
                      </span>
                    )}
                  </div>
                  {/* Port Destination replaces Address, Date removed for these forms */}
                  {(formData.product === 'International Fuel Quotation' || formData.product === 'Fertilizer Quotation' || formData.product === 'LPG / LNG Quotation') && (
                    <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                      <input
                        name="address"
                        type="text"
                        placeholder="Port Destination"
                        value={formData.address || ''}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        required
                        style={modalFieldStyle}
                      />
                    </div>
                  )}
                  {/* Fuel Quotation (RSA): keep Date and Address */}
                  {formData.product === 'Fuel Quotation (RSA)' && (
                    <>
                      <div style={{ position: 'relative', width: '100%', marginBottom: 18, cursor: 'pointer' }}>
                        <ReactDatePicker
                          selected={formData.date}
                          onChange={date => setFormData({ ...formData, date })}
                          placeholderText="Date needed"
                          minDate={new Date()}
                          required
                          dateFormat="yyyy-MM-dd"
                          wrapperClassName="stonehouse-datepicker-wrapper"
                          popperPlacement="bottom"
                          className="stonehouse-datepicker-input"
                          style={modalFieldStyle}
                          customInput={
                            <input
                              style={modalFieldStyle}
                              readOnly
                            />
                          }
                        />
                        <style jsx global>{`
                          .stonehouse-datepicker-input {
                            width: 100%;
                            height: 48px;
                            border-radius: 12px;
                            border: 1.5px solid #e0e0e0;
                            font-size: 16px;
                            background: #f7f7f7;
                            color: #1D2A35;
                            padding: 1.1rem 0.9rem 0.5rem 0.9rem;
                            outline: none;
                            font-weight: 500;
                            box-shadow: 0 2px 8px rgba(200,200,200,0.10);
                            transition: border 0.2s, box-shadow 0.2s;
                            box-sizing: border-box;
                          }
                          .react-datepicker__input-container {
                            width: 100%;
                          }
                          .react-datepicker__tab-loop,
                          .react-datepicker-popper {
                            z-index: 4000 !important;
                          }
                          .react-datepicker__header {
                            background: linear-gradient(90deg, #FFD700, #C99700);
                            border-top-left-radius: 12px;
                            border-top-right-radius: 12px;
                          }
                          .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
                            color: #1D2A35;
                            font-weight: 700;
                          }
                          .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
                            background: linear-gradient(90deg, #FFD700, #C99700) !important;
                            color: #1D2A35 !important;
                          }
                          .react-datepicker__day:hover {
                            background: #FFE066 !important;
                            color: #1D2A35 !important;
                          }
                          .react-datepicker {
                            border-radius: 12px !important;
                            box-shadow: 0 6px 24px rgba(0,0,0,0.14);
                            border: 1.5px solid #e7e7e7;
                          }
                        `}</style>
                      </div>
                      <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                        <input
                          name="address"
                          type="text"
                          placeholder="Address"
                          value={formData.address || ''}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                          required
                          style={modalFieldStyle}
                        />
                      </div>
                    </>
                  )}
                  <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
                    <textarea
                      name="comments"
                      placeholder="Comments"
                      value={formData.comments || ''}
                      onChange={e => setFormData({ ...formData, comments: e.target.value })}
                      style={modalFieldStyle}
                      rows={1}
                      maxLength={200}
                    />
                  </div>
                  <div style={{ width: '100%', marginTop: 18 }}>
                    <button type="submit" style={{
                      width: '100%',
                      background: 'linear-gradient(90deg, #C99700, #FFD700)',
                      color: '#1D2A35',
                      border: 'none',
                      borderRadius: 12,
                      padding: '0.9rem',
                      fontWeight: 800,
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(200,200,0,0.10)',
                      transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                      letterSpacing: 0.3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '0.2rem',
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, #FFD700, #C99700)';
                      e.currentTarget.style.color = '#222';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'linear-gradient(90deg, #C99700, #FFD700)';
                      e.currentTarget.style.color = '#1D2A35';
                    }}
                    >
                      <span style={{ transition: 'background 0.2s, color 0.2s', fontWeight: 'bold' }}>Submit</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
      {/* Sign Up button as a modal trigger, not a Link */}
      {showSignupModal && SignupForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000
          }}
          onClick={() => setShowSignupModal(false)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '18px',
              padding: '1.7rem 1.2rem 1.2rem 1.2rem',
              minWidth: '260px',
              maxWidth: '340px',
              width: '100%',
              boxShadow: '0 6px 24px rgba(0,0,0,0.14)',
              position: 'relative',
              color: '#222',
              border: '1.5px solid #e7e7e7',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh', // Make signup modal content scrollable
              overflowY: 'auto', // Enable vertical scrolling
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowSignupModal(false)} style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#bbb', transition: 'color 0.2s', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }} onMouseOver={e => e.currentTarget.style.color = '#C99700'} onMouseOut={e => e.currentTarget.style.color = '#bbb'} aria-label="Close modal">&times;</button>
            <SignupForm onClose={() => setShowSignupModal(false)} />
          </div>
        </div>
      )}
      {/* Download Excel button */}
      {isAdminClient && (
        <button
          onClick={handleDownloadExcel}
          style={{
            margin: '1.5rem 0',
            padding: '0.8rem 2rem',
            background: '#FFD700',
            color: '#1D2A35',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          Download Excel
        </button>
      )}
    </div>
  );
}
