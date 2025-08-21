import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext, AuthKycContext } from './_app';

const Signup = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '', 
    phone: '', 
    password: '',
    confirmPassword: ''
  });
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

    // Validation
    if (!form.name || !form.email || !form.password) {
      setError('Name, Email, and Password are required.');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('stonehouse_users') || '[]');
      const userExists = existingUsers.find(user => user.email === form.email);
      
      if (userExists) {
        setError('User with this email already exists.');
        setLoading(false);
        return;
      }

      // Create new user profile
      const userProfile = {
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        signupDate: new Date().toISOString(),
        status: 'Active'
      };

      // Save user credentials (in real app, password would be hashed)
      const newUser = {
        ...userProfile,
        password: form.password // In production, this should be hashed
      };

      // Update users array
      existingUsers.push(newUser);
      localStorage.setItem('stonehouse_users', JSON.stringify(existingUsers));

      // Set user as signed in
      localStorage.setItem('stonehouse_isSignedIn', 'true');
      localStorage.setItem('stonehouse_profile', JSON.stringify(userProfile));
      
      // Update context
      setIsSignedIn(true);
      setUserProfile(userProfile);

      // Redirect to profile
      router.push('/profile');

    } catch (err) {
      setError('Signup failed. Please try again.');
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
        Create Account
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
          name="name" 
          type="text" 
          placeholder="Full Name *" 
          value={form.name} 
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
          name="email" 
          type="email" 
          placeholder="Email Address *" 
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
          name="company" 
          type="text" 
          placeholder="Company Name" 
          value={form.company} 
          onChange={handleChange} 
          style={{ 
            padding: '0.8rem', 
            borderRadius: '8px', 
            border: theme === 'dark' ? '1px solid #444' : '1px solid #e0e0e0', 
            fontSize: '15px',
            background: theme === 'dark' ? '#2a3441' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333'
          }} 
        />
        
        <input 
          name="phone" 
          type="tel" 
          placeholder="Phone Number" 
          value={form.phone} 
          onChange={handleChange} 
          style={{ 
            padding: '0.8rem', 
            borderRadius: '8px', 
            border: theme === 'dark' ? '1px solid #444' : '1px solid #e0e0e0', 
            fontSize: '15px',
            background: theme === 'dark' ? '#2a3441' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333'
          }} 
        />
        
        <input 
          name="password" 
          type="password" 
          placeholder="Password (min 6 characters) *" 
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
        
        <input 
          name="confirmPassword" 
          type="password" 
          placeholder="Confirm Password *" 
          value={form.confirmPassword} 
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
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem',
          color: theme === 'dark' ? '#ccc' : '#666',
          fontSize: '14px'
        }}>
          Already have an account? <a 
            href="/login" 
            style={{ 
              color: theme === 'dark' ? '#FFD700' : '#C99700',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
