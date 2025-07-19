import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from './_app';

const sidebarStyle = {
  width: '120px',
  minHeight: '420px',
  maxHeight: '94vh',
  background: '#1D2A35',
  color: '#fff',
  position: 'fixed',
  top: 90,
  left: 12,
  display: 'flex',
  flexDirection: 'column',
  padding: '1.2rem 0.7rem 1.2rem 0.7rem',
  zIndex: 1200,
  borderRadius: '16px',
  border: '1.5px solid #223044',
  backgroundClip: 'padding-box',
  alignItems: 'center',
  overflowY: 'auto',
  transition: 'box-shadow 0.2s',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  marginBottom: '1.2rem',
  transition: 'color 0.2s',
  display: 'block',
  padding: '0.4rem 0.7rem',
  borderRadius: '6px',
  textAlign: 'center',
};

const linkHoverStyle = {
  background: 'linear-gradient(90deg, #C99700, #FFD700)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
};

const switchContainer = {
  margin: '2.2rem 0 1.2rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
};

const switchLabel = {
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: 'inherit',
};

const switchButton = {
  width: '46px',
  height: '26px',
  borderRadius: '13px',
  background: '#333',
  border: '1.5px solid #C99700',
  position: 'relative',
  cursor: 'pointer',
  outline: 'none',
  transition: 'background 0.2s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box',
  padding: 0,
};

const switchCircle = (isDark) => ({
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  background: isDark
    ? 'linear-gradient(135deg, #C99700 40%, #FFD700 100%)'
    : 'linear-gradient(135deg, #bbb 40%, #fff 100%)',
  position: 'absolute',
  left: isDark ? '26px' : '2px',
  right: isDark ? '2px' : 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'left 0.2s, right 0.2s',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  boxSizing: 'border-box',
});

const DashboardSidebar = ({ selected, setSelected }) => {
  const [hovered, setHovered] = React.useState('');
  const [themeHovered, setThemeHovered] = React.useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const scaleIfSelected = (btn) => selected === btn ? { transform: 'scale(1.12)', zIndex: 1, transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' } : { transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' };

  return (
    <aside style={{ ...sidebarStyle, background: isDark ? '#1D2A35' : '#e0e0e0', color: isDark ? '#fff' : '#222', border: isDark ? '1.5px solid #223044' : '1.5px solid #e0e0e0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ width: '100%' }}>
        <h2
          style={{
            fontSize: '1.4rem',
            marginBottom: '2rem',
            fontWeight: 800,
            letterSpacing: 0.5,
            textAlign: 'center',
            width: '100%',
            background: selected === 'dashboard' ? 'linear-gradient(90deg, #C99700, #FFD700)' : 'none',
            WebkitBackgroundClip: selected === 'dashboard' ? 'text' : 'unset',
            WebkitTextFillColor: selected === 'dashboard' ? 'transparent' : 'unset',
            color: selected === 'dashboard' ? 'unset' : (isDark ? '#fff' : '#222'),
            ...scaleIfSelected('dashboard'),
            cursor: 'pointer',
          }}
          onClick={() => setSelected('dashboard')}
        >Dashboard</h2>
        <a
          href="#"
          style={{ ...linkStyle, color: isDark ? '#fff' : '#222', marginBottom: '1.2rem', ...(hovered === 'profile' || selected === 'profile' ? linkHoverStyle : {}), ...scaleIfSelected('profile') }}
          onMouseEnter={() => setHovered('profile')}
          onMouseLeave={() => setHovered('')}
          onClick={e => {
            e.preventDefault();
            setSelected('profile');
            if (typeof window !== 'undefined') {
              localStorage.setItem('sidebarSelected', 'profile');
              localStorage.setItem('menubarSelected', 'dropdown-profile');
            }
          }}
        >Profile</a>
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{ ...switchContainer, margin: 0, marginTop: 'auto', marginBottom: '2.7rem', ...scaleIfSelected('theme'), cursor: 'pointer' }}
          onMouseEnter={() => setThemeHovered(true)}
          onMouseLeave={() => setThemeHovered(false)}
          onClick={() => setSelected('theme')}
        >
          <span style={{
            ...switchLabel,
            ...(themeHovered ? linkHoverStyle : {}),
            ...scaleIfSelected('theme')
          }}>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <button
            aria-label="Toggle theme"
            style={{ ...switchButton, background: isDark ? '#222' : '#eee', border: isDark ? '1.5px solid #C99700' : '1.5px solid #bbb' }}
            onClick={toggleTheme}
          >
            <span style={switchCircle(isDark)}></span>
          </button>
        </div>
        <a
          href="#logout"
          style={{ ...linkStyle, color: isDark ? '#fff' : '#222', marginBottom: 0, fontSize: '1.22rem', fontWeight: 800, ...(hovered === 'logout' ? linkHoverStyle : {}), ...scaleIfSelected('logout') }}
          onMouseEnter={() => setHovered('logout')}
          onMouseLeave={() => setHovered('')}
          onClick={() => setSelected('logout')}
        >Logout</a>
      </div>
    </aside>
  );
};

const DashboardPage = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const router = useRouter();
  const [selected, setSelected] = React.useState('dashboard');

  React.useEffect(() => {
    let initial = 'dashboard';
    if (router.query.sidebar === 'profile') {
      initial = 'profile';
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('sidebarSelected');
      if (stored === 'profile') {
        initial = 'profile';
        localStorage.removeItem('sidebarSelected');
      }
    }
    setSelected(initial);
  }, [router.query.sidebar]);

  // Get profile from localStorage
  let profile = null;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('stonehouse_profile');
    if (stored) {
      try {
        profile = JSON.parse(stored);
      } catch {}
    }
  }

  // Get quotation requests from localStorage
  let quotations = [];
  if (typeof window !== 'undefined') {
    const storedQuotes = localStorage.getItem('stonehouse_quotations');
    if (storedQuotes) {
      try {
        quotations = JSON.parse(storedQuotes);
      } catch {}
    }
  }

  // Helper for welcome message
  let welcomeText = '';
  if (selected === 'dashboard') {
    welcomeText = 'Welcome to Your Dashboard';
  } else if (selected === 'profile') {
    welcomeText = 'Welcome to Your Profile';
  }

  return (
    <div style={{ display: 'flex', background: isDark ? '#181f26' : '#faf9f6', minHeight: '100vh' }}>
      <DashboardSidebar selected={selected} setSelected={setSelected} />
      <main style={{ marginLeft: 140, padding: '2.5rem 2rem', width: '100%' }}>
        {welcomeText && (
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: isDark ? '#fff' : '#1D2A35' }}>{welcomeText}</h1>
        )}
        {selected === 'dashboard' && !profile && (
          <div style={{ color: isDark ? '#bbb' : '#333', fontSize: '1.1rem', marginBottom: 24 }}>
            No profile found. Please <a href="/signup" style={{ color: isDark ? '#FFD700' : '#C99700', textDecoration: 'underline' }}>sign up</a> to access your dashboard.
          </div>
        )}
        {selected === 'dashboard' && profile && (
          <>
            <div style={{ background: isDark ? '#232b36' : '#fff', borderRadius: 12, padding: '1.5rem 1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: isDark ? '1.5px solid #223044' : '1.5px solid #e0e0e0', maxWidth: 400, marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: isDark ? '#FFD700' : '#C99700' }}>Your Details</h2>
              <div style={{ marginBottom: 8 }}><b>Name:</b> {profile.name}</div>
              <div style={{ marginBottom: 8 }}><b>Email:</b> {profile.email}</div>
              {profile.company && <div style={{ marginBottom: 8 }}><b>Company:</b> {profile.company}</div>}
            </div>
            <div style={{ background: isDark ? '#232b36' : '#fff', borderRadius: 12, padding: '1.5rem 1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', border: isDark ? '1.5px solid #223044' : '1.5px solid #e0e0e0', maxWidth: 600, marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 12, color: isDark ? '#FFD700' : '#C99700' }}>Your Quotation Requests</h2>
              {quotations.length === 0 ? (
                <div style={{ color: isDark ? '#bbb' : '#333', fontSize: '1.1rem' }}>No quotation requests found. Please request a quote from the homepage.</div>
              ) : (
                <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                  {quotations.map((q, i) => (
                    <li key={i} style={{ marginBottom: 16, padding: 12, border: '1px solid #e0e0e0', borderRadius: 8, background: isDark ? '#1D2A35' : '#f7f7f7' }}>
                      <div><b>Product:</b> {q.productOption || q.product}</div>
                      {q.quantity && <div><b>Quantity:</b> {q.quantity}</div>}
                      {q.message && <div><b>Message:</b> {q.message}</div>}
                      <div><b>Date:</b> {q.date || 'N/A'}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        <p style={{ color: isDark ? '#bbb' : '#333', fontSize: '1.1rem' }}>
          Here you can view your details and track your quotation requests. Use the sidebar to switch between your dashboard and profile.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
