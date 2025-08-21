import React, { createContext, useState, useMemo, useEffect } from 'react';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import '../styles/global.css';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const appContainerStyle = (theme) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme === 'dark' ? '#181f26' : '#e5e5e5',
  color: theme === 'dark' ? '#fff' : '#222',
  transition: 'background 0.2s, color 0.2s',
  boxShadow: theme === 'dark' ? '0 0 0 100vmax #181f26' : '0 0 0 100vmax #e5e5e5', // fix white edge
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflowX: 'hidden',
});

const contentStyle = {
  flex: 1,
  paddingTop: '5.5rem', // to account for fixed MenuBar height
};

export const AuthKycContext = createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
  isKycComplete: false,
  setIsKycComplete: () => {},
  userProfile: null,
  setUserProfile: () => {},
  quoteHistory: [],
  addQuoteToHistory: () => {},
});

export const AuthKycProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isKycComplete, setIsKycComplete] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [quoteHistory, setQuoteHistory] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const signedIn = !!localStorage.getItem('stonehouse_isSignedIn');
      const profile = localStorage.getItem('stonehouse_profile');
      const quotes = localStorage.getItem('stonehouse_quotes');
      
      setIsSignedIn(signedIn);
      setIsKycComplete(!!localStorage.getItem('isKycComplete'));
      
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
      
      if (quotes) {
        setQuoteHistory(JSON.parse(quotes));
      }
    }
  }, []);

  const addQuoteToHistory = (quote) => {
    const newQuote = {
      ...quote,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'Submitted'
    };
    
    const updatedHistory = [newQuote, ...quoteHistory];
    setQuoteHistory(updatedHistory);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('stonehouse_quotes', JSON.stringify(updatedHistory));
    }
  };

  return (
    <AuthKycContext.Provider value={{ 
      isSignedIn, 
      setIsSignedIn, 
      isKycComplete, 
      setIsKycComplete,
      userProfile,
      setUserProfile,
      quoteHistory,
      addQuoteToHistory
    }}>
      {children}
    </AuthKycContext.Provider>
  );
};

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  // Persist theme in localStorage and apply to <html> for new pages
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('stonehouse-theme') : null;
    if (stored && (stored === 'dark' || stored === 'light')) setTheme(stored);
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stonehouse-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.background = theme === 'dark' ? '#181f26' : '#faf9f6';
      document.body.style.color = theme === 'dark' ? '#fff' : '#222';
    }
  }, [theme]);

  // Theme toggle only works for signed-in users
  const toggleTheme = () => {
    const isSignedIn = typeof window !== 'undefined' ? !!localStorage.getItem('stonehouse_isSignedIn') : false;
    if (isSignedIn) {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }
  };
  
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <AuthKycProvider>
      <ThemeContext.Provider value={themeContextValue}>
        <div style={appContainerStyle(theme)}>
          <MenuBar />
          <div style={contentStyle}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </AuthKycProvider>
  );
}
