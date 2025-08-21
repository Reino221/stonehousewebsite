import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext, AuthKycContext } from '../pages/_app';

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

const activeTextStyle = {
  background: 'linear-gradient(90deg, #C99700, #FFD700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  color: 'unset',
  border: 'none',
  display: 'inline',
};

const hoverTextStyle = {
  background: 'linear-gradient(90deg, #C99700, #FFD700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  color: 'unset',
  border: 'none',
  display: 'inline',
};

const menubarButtonRing = (theme) => theme === 'dark' ? {
  boxShadow: '0 0 0 2.5px #FFD700',
  border: 'none',
} : {
  boxShadow: 'none',
  border: 'none',
};

const MenuBar = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState('');
  const [selected, setSelected] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { isSignedIn, userProfile } = useContext(AuthKycContext);

  // Helper for scaling style
  const scaleIfSelected = (btn) => selected === btn ? { transform: 'scale(1.12)', zIndex: 1, transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' } : { transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' };

  // Get page title based on current route
  const getPageTitle = () => {
    switch (router.pathname) {
      case '/refineries':
        return 'Refineries';
      case '/diesel-ulp':
        return 'FUEL DISTRIBUTION RSA';
      case '/stonehouse-estates':
        return 'Stonehouse Estates';
      case '/agriculture':
        return 'Agriculture';
      case '/minerals':
        return 'Minerals';
      default:
        return 'Stonehouse Holdings';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSignedUp(!!localStorage.getItem('stonehouse_profile'));
    }
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: '#1D2A35',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          color: '#fff',
          zIndex: 1200, // increase z-index to float above sidebar
          boxSizing: 'border-box',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)', // floating shadow effect
          backdropFilter: 'blur(8px)', // subtle glassy effect
          borderBottom: '1.5px solid #223044',
        }}
      >
        <Link href="/" legacyBehavior passHref>
          <a
            style={{ color: '#fff', marginRight: '2rem', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', fontSize: '1.5rem', cursor: 'pointer', ...scaleIfSelected('logo') }}
            onClick={() => setSelected('logo')}
          >
            <img src="/Stonehouse Logo 2.PNG" alt="Stonehouse Logo" style={{ height: '2.2rem', width: 'auto', marginRight: '0.7rem', verticalAlign: 'middle', borderRadius: '4px', background: 'transparent', boxShadow: 'none' }} />
            {getPageTitle() === 'Stonehouse Holdings' ? (
              <>
                <span style={{ background: 'linear-gradient(90deg, #C99700, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>Stonehouse</span>{' '}
                <span style={{ background: 'linear-gradient(90deg, #C0C0C0, #888888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>Holdings</span>
              </>
            ) : (
              <span style={{ background: 'linear-gradient(90deg, #C99700, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>{getPageTitle()}</span>
            )}
          </a>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <Link href="/" legacyBehavior passHref>
            <a style={{ ...buttonStyle(theme), ...scaleIfSelected('home') }}
              onMouseEnter={() => setHovered('home')}
              onMouseLeave={() => setHovered('')}
              onClick={() => setSelected('home')}
            >
              <span style={router.asPath === '/' || hovered === 'home' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>Home</span>
            </a>
          </Link>
          <Link href="/about" legacyBehavior passHref>
            <a style={{ ...buttonStyle(theme), ...scaleIfSelected('about') }}
              onMouseEnter={() => setHovered('about')}
              onMouseLeave={() => setHovered('')}
              onClick={() => setSelected('about')}
            >
              <span style={router.asPath.startsWith('/about') || hovered === 'about' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>About</span>
            </a>
          </Link>
          <Link href="/store" legacyBehavior passHref>
            <a style={{ ...buttonStyle(theme), ...scaleIfSelected('store') }}
              onMouseEnter={() => setHovered('store')}
              onMouseLeave={() => setHovered('')}
              onClick={() => setSelected('store')}
            >
              <span style={router.asPath.startsWith('/store') || hovered === 'store' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>Store</span>
            </a>
          </Link>
          <Link href="/contact" legacyBehavior passHref>
            <a style={{ ...buttonStyle(theme), marginRight: 0, ...scaleIfSelected('contact') }}
              onMouseEnter={() => setHovered('contact')}
              onMouseLeave={() => setHovered('')}
              onClick={() => setSelected('contact')}
            >
              <span style={router.asPath.startsWith('/contact') || hovered === 'contact' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>Contact</span>
            </a>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {/* Dropdown button removed */}
        </div>
      </nav>
    </>
  );
};

export default MenuBar;
