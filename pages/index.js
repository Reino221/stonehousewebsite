
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ThemeContext } from './_app';

export default function Home() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const columns = [
    {
      name: 'Refineries',
      color: '#FFA500',
      video: '/Refinery vid.mp4',
      desc: 'Global trading and distribution of petroleum products for industrial and commercial use.',
      route: '/refineries',
    },
    {
      name: 'FUEL DISTRIBUTION RSA',
      color: '#FFD700',
      video: '/Diesel vid.mp4',
      desc: 'Premium fuel distribution and industrial petroleum solutions for South African markets.',
      route: '/diesel-ulp',
    },
    {
      name: 'Stonehouse Estates',
      color: '#8B5CF6',
      video: '/Estates vid.mp4',
      desc: 'Property development, management, and real estate solutions.',
      route: '/stonehouse-estates',
    },
    {
      name: 'Agriculture',
      color: '#34D399',
      video: '/Agri vid.mp4',
      desc: 'Agricultural supplies, fertilizers, and farming solution services.',
      route: '/agriculture',
    },
    {
      name: 'Minerals',
      color: '#8B5C2A',
      video: '/Coal vid.mp4',
      desc: 'Mining and trading of minerals and natural resources.',
      route: '/minerals',
    },
  ];

  return (
    <div
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        minHeight: '100vh', 
        width: '100%',
        padding: '0.5rem 1rem 2rem 1rem',
        background: theme === 'dark' ? '#181d23' : '#e5e5e5'
      }}
    >
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        maxWidth: '1200px',
        width: '100%'
      }}>
      <h1
        style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}
      >
        Stonehouse Holdings
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '2.5rem',
          width: '100%',
          maxWidth: 1600,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {columns.map((col, idx) => (
          <div
            key={col.name}
            style={{
              borderRadius: '1.5rem',
              boxShadow: theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.08)',
              minHeight: 340,
              minWidth: 300,
              maxWidth: 320,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2.2rem 1.5rem 1.5rem 1.5rem',
              cursor: 'pointer',
              transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)',
              marginBottom: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
              background: 'transparent',
            }}
            onClick={() => router.push(col.route)}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-16px) scale(1.06)';
              e.currentTarget.style.zIndex = 10;
              e.currentTarget.style.boxShadow = theme === 'dark' ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 32px rgba(0,0,0,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.zIndex = 1;
              e.currentTarget.style.boxShadow = theme === 'dark' ? '0 4px 24px rgba(0,0,0,0.3)' : '0 4px 24px rgba(0,0,0,0.08)';
            }}
          >
            <video
              src={col.video}
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                opacity: 1,
                pointerEvents: 'none',
                borderRadius: '1.5rem',
              }}
            />
            {/* Column name at the top */}
            <div
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                marginBottom: '1.2rem',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                letterSpacing: '-0.01em',
                lineHeight: '1.2',
                minHeight: '4.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                padding: '0 0.5rem',
                wordBreak: 'break-word',
                hyphens: 'auto',
              }}
            >
              {col.name}
            </div>
            {/* Description centered vertically */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: 0,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: '1.1rem',
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  textShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  width: '100%',
                }}
              >
                {col.desc}
              </div>
            </div>
            {/* Learn More pill at the bottom */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 'auto',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  marginTop: '2rem',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.82)',
                  background: col.color + 'CC',
                  borderRadius: '50px',
                  padding: '0.7rem 1.6rem',
                  display: 'inline-block',
                  letterSpacing: '0.01em',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  userSelect: 'none',
                  transition: 'background 0.18s, color 0.18s',
                }}
              >
                Learn More
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
