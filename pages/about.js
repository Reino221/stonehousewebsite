import React, { useContext } from 'react';
import { ThemeContext } from './_app';

const About = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: '100vh', width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: theme === 'dark' ? '#FFD700' : '#1D2A35' }}>About Stonehouse Holdings</h1>
        <p style={{ color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.1rem', maxWidth: 600, textAlign: 'center', marginBottom: '2.5rem' }}>
          Stonehouse Holdings is a leading company in ... (add your about text here).
        </p>
      </div>
      {/* Sign Up button (previous modal logic removed, revert to original or no button) */}
    </div>
  );
};

export default About;
