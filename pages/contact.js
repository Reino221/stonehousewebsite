import React, { useContext } from 'react';
import { ThemeContext } from './_app';

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'flex-start', 
      minHeight: '100vh', 
      width: '100%',
      padding: '0.5rem 1rem 2rem 1rem',
      background: theme === 'dark' ? '#181d23' : '#e5e5e5'
    }}>
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        maxWidth: '1000px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          marginBottom: '2rem', 
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>Contact Us</h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '3rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
          width: '100%',
          maxWidth: 800,
          background: theme === 'dark' ? 'rgba(34,48,68,0.97)' : 'rgba(255,255,255,0.97)',
          borderRadius: 18,
          boxShadow: theme === 'dark' ? '0 4px 24px rgba(200,200,0,0.10)' : '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.2rem 2.5rem',
          border: theme === 'dark' ? '1.5px solid #FFD700' : '1.5px solid #e7e7e7',
        }}>
          <div style={{ minWidth: 260, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.7rem', color: theme === 'dark' ? '#FFD700' : '#1D2A35', letterSpacing: 0.5 }}>Stonehouse Holdings</h2>
            <ul style={{ listStyle: 'none', padding: 0, color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.08rem', lineHeight: 1.7, width: '100%' }}>
              <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Name:</span> Reino Fourie</li>
              <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Email:</span> <a href="mailto:info@stonehouseltd.co.za" style={{ color: theme === 'dark' ? 'white' : '#1D2A35', textDecoration: 'none', fontWeight: 500 }}>info@stonehouseltd.co.za</a></li>
              <li><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Phone:</span> <a href="tel:0645598007" style={{ color: theme === 'dark' ? 'white' : '#1D2A35', textDecoration: 'none', fontWeight: 500 }}>064 559 8007</a></li>
            </ul>
          </div>
          <div style={{ minWidth: 260, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.7rem', color: theme === 'dark' ? '#FFD700' : '#1D2A35', letterSpacing: 0.5 }}>Working Hours</h2>
            <ul style={{ listStyle: 'none', padding: 0, color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.08rem', lineHeight: 1.7, width: '100%' }}>
              <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Monday - Thursday:</span> 08:00 - 16:30</li>
              <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Friday:</span> 08:00 - 14:00</li>
              <li style={{ marginBottom: 8 }}><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Saturday / Sunday:</span> Closed</li>
              <li><span style={{ fontWeight: 600, color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Public Holidays:</span> Closed</li>
            </ul>
          </div>
        </div>
        {/* Removed the bottom inquiry email paragraph as requested */}
      </div>
      {/* Sign Up button (previous modal logic removed, revert to original or no button) */}
    </div>
  );
};

export default Contact;
