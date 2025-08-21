import React, { useState, useContext } from 'react';
import { ThemeContext, AuthKycContext } from '../pages/_app';

const SignupForm = ({ onClose, onSuccess }) => {
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
      const userExists = existingUsers.find(u => u.email === form.email);
      
      if (userExists) {
        setError('An account with this email already exists.');
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        company: form.company || '',
        phone: form.phone || '',
        password: form.password,
        signupDate: new Date().toISOString(),
        status: 'Active'
      };

      // Save to users array
      existingUsers.push(newUser);
      localStorage.setItem('stonehouse_users', JSON.stringify(existingUsers));

      // Create user profile (without password)
      const userProfile = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company,
        phone: newUser.phone,
        signupDate: newUser.signupDate,
        status: newUser.status
      };

      // Set user as signed in
      localStorage.setItem('stonehouse_isSignedIn', 'true');
      localStorage.setItem('stonehouse_profile', JSON.stringify(userProfile));
      setIsSignedIn(true);
      setUserProfile(userProfile);

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 500, 
      width: '100%',
      padding: '1rem'
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
        maxWidth: '350px',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem'
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
      </form>
    </div>
  );
};

export default SignupForm;
