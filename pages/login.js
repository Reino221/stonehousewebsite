import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext, AuthKycContext } from './_app';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const { setIsSignedIn, setUserProfile } = useContext(AuthKycContext);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.email || !form.password) {
      setError('Email and Password are required.');
      setLoading(false);
      return;
    }

    try {
      // Get users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('stonehouse_users') || '[]');
      const user = existingUsers.find(u => u.email === form.email && u.password === form.password);
      
      if (!user) {
        setError('Invalid email or password.');
        setLoading(false);
        return;
      }

      // Create user profile without password
      const userProfile = {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        signupDate: user.signupDate,
        status: user.status
      };

      // Set user as signed in
      localStorage.setItem('stonehouse_isSignedIn', 'true');
      localStorage.setItem('stonehouse_profile', JSON.stringify(userProfile));
      
      // Update context
      setIsSignedIn(true);
      setUserProfile(userProfile);

      // Redirect to profile
      router.push('/profile');

    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      width: '100%',
      background: theme === 'dark' ? '#181f26' : '#faf9f6',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 800, 
        marginBottom: '1.5rem', 
        color: theme === 'dark' ? '#FFD700' : '#1D2A35' 
      }}>
        Sign In
      </h1>
      
      <form onSubmit={handleSubmit} style={{ 
        width: '100%',
        maxWidth: '400px',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        background: theme === 'dark' ? '#1D2A35' : '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email Address" 
          value={form.email} 
          onChange={handleChange} 
          style={{ 
            padding: '0.8rem', 
            borderRadius: '8px', 
            border: theme === 'dark' ? '1px solid #444' : '1px solid #e0e0e0', 
            fontSize: '15px',
            background: theme === 'dark' ? '#2a3441' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333'
          }} 
          required 
        />
        
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          style={{ 
            padding: '0.8rem', 
            borderRadius: '8px', 
            border: theme === 'dark' ? '1px solid #444' : '1px solid #e0e0e0', 
            fontSize: '15px',
            background: theme === 'dark' ? '#2a3441' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333'
          }} 
          required 
        />
        
        {error && (
          <div style={{ 
            color: '#ff4444', 
            fontSize: '14px', 
            background: 'rgba(255,68,68,0.1)',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid rgba(255,68,68,0.3)'
          }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            background: loading ? '#666' : 'linear-gradient(90deg, #C99700, #FFD700)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            padding: '0.8rem', 
            fontWeight: '700', 
            fontSize: '16px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '14px'
        }}>
          Don't have an account? <a 
            href="/signup" 
            style={{ 
              color: theme === 'dark' ? '#FFD700' : '#C99700',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Create Account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
