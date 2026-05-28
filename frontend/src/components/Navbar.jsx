import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
<<<<<<< HEAD
    { path: '/', label: 'Beranda' },
    { path: '/input', label: 'Prediksi' },
    { path: '/prediction', label: 'Hasil' },
    { path: '/about', label: 'Tentang' },
  ]
=======
  { path: '/', label: 'Beranda' },
  { path: '/input', label: 'Prediksi' },
  { path: '/prediction', label: 'Hasil' },
  { path: '/insight', label: 'Insight' },
  { path: '/about', label: 'Tentang' },
]
>>>>>>> feat/frontend-vika

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      background: scrolled ? 'rgba(251,246,238,0.97)' : 'rgba(251,246,238,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${scrolled ? '#E8DCCB' : 'transparent'}`,
      padding: '0 64px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      transition: 'all 0.3s ease'
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #C1622F, #E4A848)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            🍽️
          </div>
          <div style={{
            position: 'absolute', top: '-3px', right: '-3px',
            width: '10px', height: '10px', borderRadius: '50%',
            background: '#E4A848',
            border: '2px solid #FBF6EE',
            animation: 'pulse 2s ease-in-out infinite'
          }} />
        </div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem', fontWeight: 900,
            color: '#1E1208', letterSpacing: '-0.3px', lineHeight: 1
          }}>
            Di<span style={{ color: '#C1622F' }}>cto</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#A0876A', letterSpacing: '0.04em' }}>
            AI Revenue Prediction
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontSize: '0.875rem', fontWeight: 500,
              color: location.pathname === item.path ? '#C1622F' : '#7A6550',
              textDecoration: 'none',
              borderBottom: location.pathname === item.path ? '2px solid #C1622F' : '2px solid transparent',
              paddingBottom: '4px', transition: 'all .2s'
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link to="/input" style={{
        background: '#C1622F', color: 'white',
        padding: '10px 22px', borderRadius: '8px',
        fontSize: '0.875rem', fontWeight: 600,
        textDecoration: 'none', transition: 'all .2s',
        boxShadow: '0 4px 12px rgba(193,98,47,0.25)',
        display: 'flex', alignItems: 'center', gap: '6px'
      }}
        onMouseOver={e => {
          e.currentTarget.style.background = '#1E1208'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = '#C1622F'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Mulai Prediksi →
      </Link>
    </nav>
  )
}

export default Navbar