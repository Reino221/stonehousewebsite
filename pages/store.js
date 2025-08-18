import React, { useContext } from 'react';
import { ThemeContext } from './_app';

const Store = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minHeight: '100vh', width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', color: '#FFD700', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Store</h1>
        <p style={{ color: theme === 'dark' ? '#e0e0e0' : '#333', fontSize: '1.1rem', maxWidth: 600, textAlign: 'center', marginBottom: '2.5rem' }}>
          Our store is coming soon. Please check back later for exciting products!
        </p>
      </div>
      {/* Sign Up button (previous modal logic removed, revert to original or no button) */}
    </div>
  );
};

export default Store;
