import React, { useContext } from 'react';
import { ThemeContext } from './_app';

const About = () => {
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
          fontWeight: 900, 
          marginBottom: '2rem', 
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: '1.1',
        }}>
          About Stonehouse Holdings
        </h1>
        
        <div style={{
          background: theme === 'dark' ? '#232b36' : '#ffffff',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
          border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0',
          textAlign: 'center',
          lineHeight: '1.8'
        }}>
          <p style={{ 
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568', 
            fontSize: '1.2rem', 
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            Founded in 2024, Stonehouse Holdings is a dynamic trading company specializing in the supply of essential minerals such as coal and chrome. We provide diesel and ULP fuel locally throughout South Africa, catering to farms, mining industries, and commercial sectors.
          </p>
          
          <p style={{ 
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568', 
            fontSize: '1.2rem', 
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            Our fuel products are sourced directly from trusted global refineries, guaranteeing a reliable supply and consistent quality. Beyond local fuel supply, we engage in the international trading of LPG, LNG, and fertilizers, establishing ourselves as a versatile player in the energy and minerals markets.
          </p>
          
          <p style={{ 
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568', 
            fontSize: '1.2rem', 
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            Through our comprehensive quotation system, clients can effortlessly request pricing for minerals (FOT) and fuel products across our dedicated business divisions.
          </p>
          
          <p style={{ 
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568', 
            fontSize: '1.2rem',
            textAlign: 'justify'
          }}>
            At Stonehouse Holdings, we are committed to delivering exceptional service in every transaction. With secure payment procedures, including Tradesafe purchase orders, we ensure trust and reliability as the foundation of our client relationships.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
