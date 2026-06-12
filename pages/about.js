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
            Stonehouse Holdings, founded in 2024, is a professional transport and logistics company committed to providing reliable, efficient, and cost-effective transportation solutions throughout South Africa and neighbouring regions.
          </p>

          <p style={{
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            We specialize in the movement of bulk materials and general freight, serving clients across various industries with a strong focus on safety, punctuality, and operational excellence. Our experienced team works closely with customers to ensure that every load is transported efficiently and delivered according to schedule.
          </p>

          <p style={{
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            Through our streamlined quotation system, clients can easily request transport rates and logistics solutions tailored to their specific requirements. We understand that every project is unique and strive to provide flexible services that meet the demands of each customer.
          </p>

          <p style={{
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568',
            fontSize: '1.2rem',
            marginBottom: '1.5rem',
            textAlign: 'justify'
          }}>
            At Stonehouse Holdings, integrity, reliability, and exceptional service are the foundation of our business. We are dedicated to building long-term relationships through transparent communication, professional service delivery, and a commitment to exceeding client expectations.
          </p>

          <p style={{
            color: theme === 'dark' ? '#e0e0e0' : '#4a5568',
            fontSize: '1.2rem',
            textAlign: 'justify'
          }}>
            As a growing transport and logistics company, Stonehouse Holdings continues to expand its capabilities and network, providing dependable transportation solutions that support the success of our clients and partners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
