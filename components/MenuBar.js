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

const MenuBar = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState('');
  const [selected, setSelected] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { isSignedIn, userProfile } = useContext(AuthKycContext);
  const menuRef = useRef(null);

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

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSignedUp(!!localStorage.getItem('stonehouse_profile'));
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/about', label: 'About', key: 'about' },
    { href: '/store', label: 'Store', key: 'store' },
    { href: '/contact', label: 'Contact', key: 'contact' }
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: '#1D2A35',
          padding: isMobile ? '1rem' : '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          zIndex: 1200,
          boxSizing: 'border-box',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1.5px solid #223044',
        }}
        ref={menuRef}
      >
        {/* Logo */}
        <Link href="/" legacyBehavior passHref>
          <a
            style={{ 
              color: '#fff', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: isMobile ? '1.2rem' : '1.5rem', 
              cursor: 'pointer',
              flex: 1
            }}
            onClick={() => {
              setSelected('logo');
              setIsMobileMenuOpen(false);
            }}
          >
            <img 
              src="/stonehouse logo.jpg" 
              alt="Stonehouse Logo" 
              style={{ 
                height: isMobile ? '1.8rem' : '2.2rem', 
                width: 'auto', 
                marginRight: '0.5rem', 
                verticalAlign: 'middle', 
                borderRadius: '4px', 
                background: 'transparent', 
                boxShadow: 'none' 
              }} 
            />
            {isMobile ? (
              <span style={{ 
                background: 'linear-gradient(90deg, #C99700, #FFD700)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                fontWeight: 'bold' 
              }}>
                Stonehouse
              </span>
            ) : (
              getPageTitle() === 'Stonehouse Holdings' ? (
                <>
                  <span style={{ background: 'linear-gradient(90deg, #C99700, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>Stonehouse</span>{' '}
                  <span style={{ background: 'linear-gradient(90deg, #C0C0C0, #888888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>Holdings</span>
                </>
              ) : (
                <span style={{ background: 'linear-gradient(90deg, #C99700, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold', padding: '0 0.3em' }}>{getPageTitle()}</span>
              )
            )}
          </a>
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)' 
          }}>
            {menuItems.map((item) => (
              <Link key={item.key} href={item.href} legacyBehavior passHref>
                <a 
                  style={{ 
                    ...buttonStyle(theme), 
                    ...scaleIfSelected(item.key),
                    marginRight: item.key === 'contact' ? 0 : '1rem'
                  }}
                  onMouseEnter={() => setHovered(item.key)}
                  onMouseLeave={() => setHovered('')}
                  onClick={() => setSelected(item.key)}
                >
                  <span style={
                    (router.asPath === item.href || router.asPath.startsWith(item.href + '/') || hovered === item.key) ? 
                    activeTextStyle : 
                    { color: '#fff', transition: 'color 0.2s' }
                  }>
                    {item.label}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Hamburger Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            aria-label="Toggle menu"
          >
            <div style={{
              width: '25px',
              height: '3px',
              background: isMobileMenuOpen ? 'transparent' : '#fff',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: '25px',
                height: '3px',
                background: '#fff',
                top: isMobileMenuOpen ? '0' : '-8px',
                transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'all 0.3s ease'
              }} />
              <div style={{
                position: 'absolute',
                width: '25px',
                height: '3px',
                background: '#fff',
                top: isMobileMenuOpen ? '0' : '8px',
                transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)',
                transition: 'all 0.3s ease'
              }} />
            </div>
          </button>
        )}

        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#1D2A35',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            borderTop: '1px solid #223044',
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease',
            zIndex: 1199
          }}>
            {menuItems.map((item, index) => (
              <Link key={item.key} href={item.href} legacyBehavior passHref>
                <a
                  style={{
                    display: 'block',
                    padding: '1rem 1.5rem',
                    color: (router.asPath === item.href || router.asPath.startsWith(item.href + '/')) ? '#FFD700' : '#fff',
                    textDecoration: 'none',
                    borderBottom: index < menuItems.length - 1 ? '1px solid #223044' : 'none',
                    background: (router.asPath === item.href || router.asPath.startsWith(item.href + '/')) ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                    transition: 'all 0.2s ease',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}
                  onClick={() => {
                    setSelected(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default MenuBar;
