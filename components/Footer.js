import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer style={{
      width: '100%',
      color: theme === 'dark' ? '#fff' : '#222',
      padding: '1rem 2rem',
      fontSize: '1rem',
      letterSpacing: '0.02em',
      background: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box',
    }}>
      <span>Stonehouse Holdings</span>
      <span>All Rights Reserved</span>
    </footer>
  );
};

export default Footer;
