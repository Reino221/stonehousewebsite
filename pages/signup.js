import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeContext } from './_app';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Name and Email are required.');
      return;
    }
    // Save to localStorage for demo
    localStorage.setItem('stonehouse_profile', JSON.stringify(form));
    router.push('/profile');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1D2A35' }}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: 8, border: '1.2px solid #e0e0e0', fontSize: 15 }} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: 8, border: '1.2px solid #e0e0e0', fontSize: 15 }} required />
        <input name="company" type="text" placeholder="Company (optional)" value={form.company} onChange={handleChange} style={{ padding: '0.8rem', borderRadius: 8, border: '1.2px solid #e0e0e0', fontSize: 15 }} />
        {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
        <button type="submit" style={{ background: '#1D2A35', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
