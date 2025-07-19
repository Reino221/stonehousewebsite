import { useContext } from 'react';
import { ThemeContext } from '../pages/_app';

const footerStyle = (theme) => ({
  width: '100%',
  color: theme === 'dark' ? '#fff' : '#222',
  textAlign: 'center',
  padding: '1rem 0',
  fontSize: '1rem',
  letterSpacing: '0.02em',
  background: 'none',
  position: 'static',
});

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer style={footerStyle(theme)}>
      © 2025 Stonehouse Holdings. All rights reserved.
    </footer>
  );
};

export default Footer;
