import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../pages/_app';
import SignupForm from './SignupForm';

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
  const [dropdownHovered, setDropdownHovered] = useState('');
  const [dropdownBtnHovered, setDropdownBtnHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useContext(ThemeContext);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    // Highlight dropdown-dashboard if coming from Dashboard dropdown
    if (typeof window !== 'undefined') {
      const menubarSel = localStorage.getItem('menubarSelected');
      if (menubarSel === 'dropdown-dashboard' && router.asPath.includes('/profile?sidebar=dashboard')) {
        setSelected('dropdown-dashboard');
        localStorage.removeItem('menubarSelected');
      }
    }
  }, [router.asPath]);

  useEffect(() => {
    // Sync menubar highlight with sidebar selection
    if (typeof window !== 'undefined') {
      const sidebarSel = localStorage.getItem('sidebarSelected');
      const menubarSel = localStorage.getItem('menubarSelected');
      if (sidebarSel === 'dashboard' && menubarSel === 'dropdown-dashboard') {
        setSelected('dropdown-dashboard');
      }
    }
  }, [router.asPath]);

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
          <div style={{ position: 'relative', marginRight: '1rem' }} ref={dropdownRef}>
            <button
              style={{
                ...buttonStyle(theme),
                background: '#223044',
                color: '#fff',
                border: theme === 'dark' ? '2px solid #FFD700' : '1px solid #334155',
                minWidth: '48px',
                minHeight: '48px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0,
                cursor: 'pointer',
                borderRadius: '50%', // always round for dropdown
                padding: 0,
                transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.18s cubic-bezier(.4,2,.6,1)',
                boxShadow: theme === 'dark' ? '0 2px 8px rgba(200,200,0,0.10)' : 'none',
                ...scaleIfSelected('dropdown')
              }}
              onClick={() => {
                setDropdownOpen((open) => !open);
                setSelected('dropdown');
              }}
              onMouseEnter={() => setDropdownBtnHovered(true)}
              onMouseLeave={() => setDropdownBtnHovered(false)}
              type="button"
              aria-label="Open menu"
            >
              <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px' }}>
                <div style={{
                  width: '20px',
                  height: '3px',
                  borderRadius: '2px',
                  margin: '2px 0',
                  transition: 'background 0.2s',
                  background: dropdownBtnHovered ? 'linear-gradient(90deg, #C99700, #FFD700)' : '#fff',
                }}></div>
                <div style={{
                  width: '20px',
                  height: '3px',
                  borderRadius: '2px',
                  margin: '2px 0',
                  transition: 'background 0.2s',
                  background: dropdownBtnHovered ? 'linear-gradient(90deg, #FFD700, #C99700)' : '#fff',
                }}></div>
                <div style={{
                  width: '20px',
                  height: '3px',
                  borderRadius: '2px',
                  margin: '2px 0',
                  transition: 'background 0.2s',
                  background: dropdownBtnHovered ? 'linear-gradient(90deg, #C99700, #FFD700)' : '#fff',
                }}></div>
              </span>
            </button>
            <div id="dropdown-menu" style={{
              display: dropdownOpen ? 'block' : 'none',
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#223044',
              border: '1px solid #334155',
              borderRadius: '6px',
              minWidth: '120px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 2000,
              padding: '0.5rem 0',
            }}>
              {/* Only show Profile if signed up, hide Dashboard always for clients */}
              {isSignedUp && (
                <Link href="/profile?sidebar=profile" legacyBehavior passHref>
                  <a
                    style={{ ...buttonStyle(theme), border: 'none', outline: 'none', boxShadow: 'none', display: 'block', margin: 0, padding: '0.5rem 1.2rem', ...scaleIfSelected('dropdown-profile') }}
                    onMouseEnter={() => setDropdownHovered('profile')}
                    onMouseLeave={() => setDropdownHovered('')}
                    onClick={() => {
                      setDropdownOpen(false);
                      setSelected('dropdown-profile');
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('sidebarSelected', 'profile');
                        localStorage.setItem('menubarSelected', 'dropdown-profile');
                      }
                    }}
                  >
                    <span style={selected === 'dropdown-profile' || dropdownHovered === 'profile' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>Profile</span>
                  </a>
                </Link>
              )}
              {/* Hide Dashboard for clients */}
              {/* <Link href="/profile?sidebar=dashboard" ...> ... </Link> intentionally removed */}
              <Link href="/logout" legacyBehavior passHref>
                <a
                  style={{ ...buttonStyle(theme), border: 'none', outline: 'none', boxShadow: 'none', display: 'block', margin: 0, padding: '0.5rem 1.2rem', ...scaleIfSelected('dropdown-logout') }}
                  onMouseEnter={() => setDropdownHovered('logout')}
                  onMouseLeave={() => setDropdownHovered('')}
                  onClick={() => {
                    setDropdownOpen(false);
                    setSelected('dropdown-logout');
                  }}
                >
                  <span style={router.asPath.startsWith('/logout') || dropdownHovered === 'logout' ? activeTextStyle : { color: '#fff', transition: 'color 0.2s' }}>Logout</span>
                </a>
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {/* Login button as a modal trigger, not a Link */}
            <a
              style={{
                ...buttonStyle(theme),
                ...scaleIfSelected('login'),
                color: '#fff', // always white wording
                background: 'none',
                border: 'none',
                marginRight: '1rem',
                boxShadow: theme === 'dark' ? '0 0 0 2px #FFD700, 0 2px 8px rgba(200,200,0,0.10)' : 'none',
              }}
              onMouseEnter={() => setHovered('login')}
              onMouseLeave={() => setHovered('')}
              onClick={e => {
                e.preventDefault();
                setDropdownOpen(false);
                setShowSignupModal(false);
                setSelected('login');
                setShowLoginModal(true);
              }}
              href="#"
            >
              <span style={
                selected === 'login' || hovered === 'login'
                  ? activeTextStyle
                  : { color: '#fff', transition: 'color 0.2s' }
              }>Login</span>
            </a>
            {/* Sign Up button as a modal trigger, not a Link */}
            <a
              style={{
                ...buttonStyle(theme),
                marginRight: 0,
                ...scaleIfSelected('signup'),
                color: '#fff', // always white wording
                background: 'none',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: theme === 'dark' ? '0 0 0 2px #FFD700, 0 2px 8px rgba(200,200,0,0.10)' : 'none',
              }}
              onMouseEnter={() => setHovered('signup')}
              onMouseLeave={() => setHovered('')}
              onClick={e => {
                e.preventDefault();
                setDropdownOpen(false);
                setShowSignupModal(true);
                setSelected('signup');
              }}
              href="#"
            >
              <span style={
                selected === 'signup' || hovered === 'signup'
                  ? activeTextStyle
                  : { color: '#fff', transition: 'color 0.2s' }
              }>Sign Up</span>
            </a>
          </div>
        </div>
      </nav>
      {showSignupModal && (
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
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowSignupModal(false)} style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#bbb', transition: 'color 0.2s', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }} onMouseOver={e => e.currentTarget.style.color = '#C99700'} onMouseOut={e => e.currentTarget.style.color = '#bbb'} aria-label="Close modal">&times;</button>
            <SignupForm onClose={() => setShowSignupModal(false)} />
          </div>
        </div>
      )}
      {showLoginModal && (
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
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              borderRadius: '18px',
              padding: '2.2rem 1.5rem 1.5rem 1.5rem',
              minWidth: '280px',
              maxWidth: '370px',
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
              position: 'relative',
              color: '#222',
              border: '1.5px solid #e7e7e7',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animation: 'fadeInModal 0.25s cubic-bezier(.4,2,.6,1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowLoginModal(false)} style={{ position: 'absolute', top: 10, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#bbb', transition: 'color 0.2s', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }} onMouseOver={e => e.currentTarget.style.color = '#C99700'} onMouseOut={e => e.currentTarget.style.color = '#bbb'} aria-label="Close modal">&times;</button>
            <h2 style={{ marginBottom: '1.2rem', color: '#1D2A35', textAlign: 'center', fontWeight: 800, letterSpacing: 0.5, fontSize: 28, letterSpacing: 1 }}>Login</h2>
            <form autoComplete="off" style={{ width: '100%', maxWidth: 270, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input type="email" id="login-email" required style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '1.1rem 0.9rem 0.5rem 0.9rem',
                  borderRadius: 12,
                  border: '1.5px solid #e0e0e0',
                  fontSize: 16,
                  background: 'rgba(245,245,245,0.98)',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(200,200,200,0.10)',
                  color: '#1D2A35',
                  display: 'block',
                  fontWeight: 500,
                }}
                  onFocus={e => e.target.parentNode.querySelector('label').style.top = '-0.7rem'}
                  onBlur={e => { if (!e.target.value) e.target.parentNode.querySelector('label').style.top = '1.1rem'; }}
                />
                <label htmlFor="login-email" style={{
                  position: 'absolute',
                  left: '0.95rem',
                  top: '1.1rem',
                  fontSize: 14,
                  color: '#888',
                  background: 'transparent',
                  pointerEvents: 'none',
                  transition: 'top 0.2s, font-size 0.2s',
                  fontWeight: 600,
                  letterSpacing: 0.2,
                }}>Email</label>
              </div>
              <div style={{ position: 'relative', width: '100%' }}>
                <input type="password" id="login-password" required style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '1.1rem 0.9rem 0.5rem 0.9rem',
                  borderRadius: 12,
                  border: '1.5px solid #e0e0e0',
                  fontSize: 16,
                  background: 'rgba(245,245,245,0.98)',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(200,200,200,0.10)',
                  color: '#1D2A35',
                  display: 'block',
                  fontWeight: 500,
                }}
                  onFocus={e => e.target.parentNode.querySelector('label').style.top = '-0.7rem'}
                  onBlur={e => { if (!e.target.value) e.target.parentNode.querySelector('label').style.top = '1.1rem'; }}
                />
                <label htmlFor="login-password" style={{
                  position: 'absolute',
                  left: '0.95rem',
                  top: '1.1rem',
                  fontSize: 14,
                  color: '#888',
                  background: 'transparent',
                  pointerEvents: 'none',
                  transition: 'top 0.2s, font-size 0.2s',
                  fontWeight: 600,
                  letterSpacing: 0.2,
                }}>Password</label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '-0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: '#222', cursor: 'pointer', userSelect: 'none', fontWeight: 500 }}>
                  <input type="checkbox" style={{ marginRight: 7, accentColor: '#FFD700', width: 16, height: 16, borderRadius: 5, boxShadow: '0 1px 2px rgba(200,200,200,0.12)' }} /> Remember me
                </label>
                <a href="#" style={{ fontSize: 13, color: '#C99700', textDecoration: 'none', fontWeight: 600, marginLeft: 'auto', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#FFD700'} onMouseOut={e => e.currentTarget.style.color = '#C99700'}>Forgot?</a>
              </div>
              <button
                type="submit"
                style={{
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
                <span style={{transition: 'background 0.2s, color 0.2s', fontWeight: 'bold'}}>Login</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuBar;
