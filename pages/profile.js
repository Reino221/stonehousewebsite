import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Theme context import
import { ThemeContext, AuthKycContext } from './_app';

const Profile = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isSignedIn, userProfile, quoteHistory, setIsSignedIn, setUserProfile } = useContext(AuthKycContext);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
  }, [isSignedIn, router]);

  const handleLogout = () => {
    localStorage.removeItem('stonehouse_isSignedIn');
    localStorage.removeItem('stonehouse_profile');
    setIsSignedIn(false);
    setUserProfile(null);
    router.push('/');
  };

  if (!isSignedIn || !userProfile) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: theme === 'dark' ? '#fff' : '#333'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return '#FFA500';
      case 'Processing': return '#2196F3';
      case 'Completed': return '#4CAF50';
      case 'Cancelled': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: theme === 'dark' ? '#181f26' : '#faf9f6',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: theme === 'dark' ? '#1D2A35' : '#fff',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #C99700, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              Welcome, {userProfile.name}
            </h1>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Theme Toggle - Only for signed-in users */}
              <button
                onClick={toggleTheme}
                style={{
                  background: theme === 'dark' ? '#2a3441' : '#e0e0e0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  color: theme === 'dark' ? '#FFD700' : '#1D2A35',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
              
              <button
                onClick={handleLogout}
                style={{
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
              >
                Logout
              </button>
            </div>
          </div>
          
          <p style={{
            margin: 0,
            color: theme === 'dark' ? '#ccc' : '#666',
            fontSize: '1.1rem'
          }}>
            Manage your account and view your quote history
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              background: activeTab === 'profile' ? 'linear-gradient(90deg, #C99700, #FFD700)' : (theme === 'dark' ? '#2a3441' : '#e0e0e0'),
              color: activeTab === 'profile' ? '#fff' : (theme === 'dark' ? '#ccc' : '#666'),
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            style={{
              background: activeTab === 'quotes' ? 'linear-gradient(90deg, #C99700, #FFD700)' : (theme === 'dark' ? '#2a3441' : '#e0e0e0'),
              color: activeTab === 'quotes' ? '#fff' : (theme === 'dark' ? '#ccc' : '#666'),
              border: 'none',
              borderRadius: '8px',
              padding: '0.8rem 1.5rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            Quote History ({quoteHistory.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div style={{
            background: theme === 'dark' ? '#1D2A35' : '#fff',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: theme === 'dark' ? '#FFD700' : '#1D2A35'
            }}>
              Profile Information
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Full Name:</label>
                <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem' }}>{userProfile.name}</p>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Email:</label>
                <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem' }}>{userProfile.email}</p>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Company:</label>
                <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem' }}>{userProfile.company || 'Not specified'}</p>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Phone:</label>
                <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem' }}>{userProfile.phone || 'Not specified'}</p>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Member Since:</label>
                <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.1rem' }}>{formatDate(userProfile.signupDate)}</p>
              </div>
              
              <div>
                <label style={{ fontWeight: 'bold', color: theme === 'dark' ? '#FFD700' : '#C99700' }}>Status:</label>
                <p style={{ 
                  margin: '0.5rem 0 1rem 0', 
                  fontSize: '1.1rem',
                  color: '#4CAF50',
                  fontWeight: 'bold'
                }}>
                  {userProfile.status}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div style={{
            background: theme === 'dark' ? '#1D2A35' : '#fff',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: theme === 'dark' ? '#FFD700' : '#1D2A35'
            }}>
              Quote Request History
            </h2>
            
            {quoteHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: theme === 'dark' ? '#ccc' : '#666'
              }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No quote requests yet</p>
                <p>Start by requesting a quote from our services pages</p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/diesel-ulp" style={{
                    background: 'linear-gradient(90deg, #C99700, #FFD700)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}>
                    Fuel Distribution
                  </a>
                  <a href="/minerals" style={{
                    background: 'linear-gradient(90deg, #C99700, #FFD700)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}>
                    Minerals
                  </a>
                  <a href="/refineries" style={{
                    background: 'linear-gradient(90deg, #C99700, #FFD700)',
                    color: '#fff',
                    textDecoration: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}>
                    Refineries
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {quoteHistory.map((quote) => (
                  <div key={quote.id} style={{
                    background: theme === 'dark' ? '#2a3441' : '#f8f9fa',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    border: `1px solid ${theme === 'dark' ? '#444' : '#e0e0e0'}`
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <h3 style={{
                        margin: 0,
                        color: theme === 'dark' ? '#FFD700' : '#1D2A35',
                        fontSize: '1.2rem'
                      }}>
                        {quote.product}
                      </h3>
                      <span style={{
                        background: getStatusColor(quote.status),
                        color: '#fff',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {quote.status}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      {quote.mineralType && (
                        <div>
                          <strong>Product:</strong> {quote.mineralType}
                        </div>
                      )}
                      {quote.quantity && (
                        <div>
                          <strong>Quantity:</strong> {quote.quantity}
                        </div>
                      )}
                      {quote.company && (
                        <div>
                          <strong>Company:</strong> {quote.company}
                        </div>
                      )}
                      <div>
                        <strong>Submitted:</strong> {formatDate(quote.timestamp)}
                      </div>
                    </div>
                    
                    {quote.message && (
                      <div style={{
                        background: theme === 'dark' ? '#1D2A35' : '#fff',
                        padding: '1rem',
                        borderRadius: '6px',
                        marginTop: '1rem'
                      }}>
                        <strong>Message:</strong>
                        <p style={{ margin: '0.5rem 0 0 0' }}>{quote.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
