import { useContext } from 'react';
import { ThemeContext } from './_app';

export default function Agriculture() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: theme === 'dark' ? '#181d23' : '#e5e5e5',
      padding: '2rem 1rem',
    }}>
      {/* Hero Section with Background */}
      <div style={{
        width: 'calc(100% - 2rem)',
        maxWidth: 1200,
        height: 400,
        borderRadius: '24px',
        backgroundImage: 'url("/Agri 2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        /* No boxShadow, no overlay, just the image */
      }}>
        {/* Title */}
        <div style={{ position: 'absolute', top: 32, left: 0, width: '100%', zIndex: 2, textAlign: 'center', color: '#fff' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}>
            Agriculture
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        width: '100%',
        maxWidth: 1000,
        background: theme === 'dark' ? '#232b36' : '#ffffff',
        borderRadius: '24px',
        padding: '3rem 2rem',
        boxShadow: theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.1)',
        border: theme === 'dark' ? '1px solid #3a4248' : '1px solid #e0e0e0',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem',
        }}>
          Coming Soon
        </h2>
        
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: theme === 'dark' ? '#cbd5e0' : '#4a5568',
        }}>
          <p>
            Our Agriculture division is currently under development. Please check back soon for updates.
          </p>
          <p style={{ marginTop: '1.5rem' }}>
            We believe in doing honest, reliable work that adds real value to our clients. Every farm and field is different, so we don't make big promises we can't keep — just steady, consistent service you can count on. Our focus is simple: treat people right, do the job well, and build relationships that last.
          </p>
        </div>
      </div>
    </div>
  );
}
