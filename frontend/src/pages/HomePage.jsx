import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTime = Date.now()
        const timer = setInterval(() => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * end))
          if (progress === 1) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function HomePage() {
  return (
    <div style={{ paddingTop: '64px', background: '#FBF6EE', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '92vh',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        alignItems: 'center', gap: '48px',
        padding: '80px 64px',
        background: '#FBF6EE',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background blobs */}
        <div style={{
          position: 'absolute', right: '-80px', top: '-60px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,168,72,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', left: '-60px', bottom: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(193,98,47,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '60px', right: '42%',
          width: '160px', height: '160px', opacity: 0.05,
          backgroundImage: 'radial-gradient(#C1622F 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px', pointerEvents: 'none'
        }} />

        {/* Left Text */}
        <div style={{ position: 'relative', zIndex: 2, animation: 'fadeUp 0.7s ease both' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(228,168,72,0.15)',
            border: '1px solid rgba(228,168,72,0.35)',
            color: '#8A6010', padding: '6px 14px', borderRadius: '24px',
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '28px'
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#E4A848', animation: 'pulse 2s ease-in-out infinite'
            }} />
            AI Powered · Supervised Learning
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.6rem, 4vw, 3.8rem)',
            fontWeight: 900, lineHeight: 1.08,
            color: '#1E1208', marginBottom: '8px', letterSpacing: '-1.5px'
          }}>
            Prediksi{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: '#C1622F' }}>Revenue</span>
              <span style={{
                position: 'absolute', bottom: '0px', left: 0,
                width: '100%', height: '4px',
                background: 'linear-gradient(90deg, #E4A848, #C1622F80)',
                borderRadius: '2px', display: 'block'
              }} />
            </span>
            <br />Restoran Anda
          </h1>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 700, color: '#C1622F',
            fontStyle: 'italic', marginBottom: '20px', letterSpacing: '-0.5px'
          }}>
            Akurat & Mudah
          </h2>

          {/* Desc */}
          <p style={{
            fontSize: '1.05rem', color: '#7A6550',
            lineHeight: 1.8, maxWidth: '480px',
            marginBottom: '16px', fontWeight: 400
          }}>
            Gunakan kecerdasan buatan berbasis{' '}
            <strong style={{ color: '#1E1208' }}>Supervised Learning Berbasis Regresi</strong>{' '}
            untuk memprediksi pendapatan, menganalisis performa, dan ambil keputusan bisnis lebih cerdas.
          </p>

          {/* Checklist */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {['Akurat & Terpercaya', 'Mudah Digunakan', 'Hasil Instan'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'rgba(193,98,47,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: '#C1622F', fontSize: '10px', fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ fontSize: '0.82rem', color: '#7A6550', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '48px' }}>
            <Link to="/input" style={{
              background: '#C1622F', color: 'white',
              padding: '14px 32px', borderRadius: '12px',
              fontSize: '0.95rem', fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(193,98,47,0.30)',
              transition: 'all .2s', display: 'flex',
              alignItems: 'center', gap: '8px'
            }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#1E1208'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = '#C1622F'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              📊 Mulai Prediksi Sekarang
            </Link>
            <Link to="/about" style={{
              color: '#7A6550', fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none', display: 'flex',
              alignItems: 'center', gap: '6px', transition: 'color .2s'
            }}
              onMouseOver={e => e.currentTarget.style.color = '#1E1208'}
              onMouseOut={e => e.currentTarget.style.color = '#7A6550'}
            >
              ▷ Lihat Demo
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '32px',
            paddingTop: '28px', borderTop: '1px solid #E8DCCB'
          }}>
            {[
              { num: 15, suffix: '', label: 'Variabel Input' },
              { num: 84, suffix: '%', label: 'Akurasi Model' },
              { num: 3, suffix: '', label: 'Model Tersedia' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.8rem', fontWeight: 700,
                  color: '#1E1208', lineHeight: 1
                }}>
                  <CountUp end={stat.num} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7A6550', marginTop: '3px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', justifyContent: 'center',
          animation: 'fadeUp 0.9s 0.2s ease both'
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '28px', width: '360px',
            boxShadow: '0 24px 64px rgba(193,98,47,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            position: 'relative'
          }}>
            {/* Pill top */}
            <div style={{
              position: 'absolute', top: '-16px', right: '-12px',
              background: 'white', borderRadius: '12px',
              padding: '8px 14px',
              boxShadow: '0 6px 20px rgba(193,98,47,0.12)',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.78rem', fontWeight: 600, color: '#1E1208',
              border: '1px solid #E8DCCB'
            }}>
              🍽️ Restoran Nusantara
            </div>

            {/* Card header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A6550' }}>
                  Prediksi Revenue (30 Hari)
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1E1208', marginTop: '2px' }}>
                  Hasil Analisis Model
                </div>
              </div>
              <div style={{
                background: 'rgba(228,168,72,0.15)',
                color: '#8A6010', border: '1px solid rgba(228,168,72,0.30)',
                fontSize: '0.72rem', fontWeight: 700,
                padding: '4px 10px', borderRadius: '20px',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                ↑ 12.5%
              </div>
            </div>

            {/* Revenue box */}
            <div style={{
              background: '#C1622F',
              borderRadius: '14px', padding: '22px',
              textAlign: 'center', marginBottom: '20px',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }} />
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginBottom: '8px', letterSpacing: '0.05em' }}>
                Estimasi Pendapatan Bulanan
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.9rem', fontWeight: 900,
                color: 'white', letterSpacing: '-1px'
              }}>
                Rp 125.750.000
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>
                Dibanding periode sebelumnya
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                background: 'rgba(228,168,72,0.25)', color: '#F5D070',
                fontSize: '0.7rem', fontWeight: 700,
                padding: '3px 10px', borderRadius: '12px', marginTop: '8px'
              }}>
                📈 Naik dari bulan lalu
              </div>
            </div>

            {/* Accuracy */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7A6550', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                Tingkat Akurasi Model
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: '#1E1208' }}>84%</div>
                <div style={{ fontSize: '0.78rem', color: '#C1622F', fontWeight: 600 }}>Sangat Baik</div>
              </div>
              <div style={{ height: '5px', background: '#F0E8DA', borderRadius: '3px' }}>
                <div style={{ width: '84%', height: '5px', background: '#E4A848', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Factors */}
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#7A6550', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
              Faktor Dominan
            </div>
            {[
              { label: 'Marketing Budget', val: 92, color: '#C1622F' },
              { label: 'Rating Restoran', val: 78, color: '#E4A848' },
              { label: 'Kualitas Pelayanan', val: 65, color: '#D4886A' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#1E1208' }}>{item.label}</span>
                  <span style={{ fontSize: '0.72rem', color: '#7A6550', fontFamily: 'DM Mono, monospace' }}>{item.val}%</span>
                </div>
                <div style={{ height: '4px', background: '#F0E8DA', borderRadius: '2px' }}>
                  <div style={{ width: `${item.val}%`, height: '4px', background: item.color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}

            {/* Pill bottom */}
            <div style={{
              position: 'absolute', bottom: '-14px', left: '-14px',
              background: 'white', borderRadius: '12px',
              padding: '8px 14px',
              boxShadow: '0 6px 20px rgba(228,168,72,0.12)',
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.76rem', color: '#7A6550',
              border: '1px solid #E8DCCB'
            }}>
              🤖 Supervised Learning Model
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '90px 64px', background: '#FEF8EE' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '12px'
          }}>
            Kenapa Memilih Dicto?
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1E1208', lineHeight: 1.2, marginBottom: '14px'
          }}>
            Solusi Cerdas untuk<br />Bisnis Restoran Anda
          </h2>
          <p style={{
            color: '#7A6550', fontSize: '1rem', lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto 52px'
          }}>
            Didukung dataset <strong style={{ color: '#1E1208' }}>Restaurant Revenue Prediction</strong>{' '}
            dan metode Supervised Learning Berbasis Regresi yang dioptimasi untuk akurasi tertinggi.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { icon: '📈', title: 'Prediksi Revenue Akurat', desc: 'Analisis data historis & 15 faktor operasional untuk prediksi pendapatan dengan akurasi ~84%.', color: '#C1622F' },
              { icon: '🍜', title: '15 Variabel Analisis', desc: 'Menganalisis kapasitas, rating, harga menu, marketing, hingga kualitas pelayanan restoran.', color: '#E4A848' },
              { icon: '⚡', title: 'Hasil Instan', desc: 'Prediksi pendapatan dalam hitungan detik melalui FastAPI backend yang dioptimasi.', color: '#C1622F' },
              { icon: '🐳', title: 'Docker Ready', desc: 'Sistem dikemas dalam Docker container untuk konsistensi di semua environment.', color: '#E4A848' },
              { icon: '🔬', title: 'MLflow Tracked', desc: 'Eksperimen model dilacak menggunakan MLflow untuk reproducibility yang terjamin.', color: '#C1622F' },
              { icon: '▲', title: 'Vercel Deploy', desc: 'Frontend di-deploy ke Vercel untuk akses cepat dan mudah dari mana saja.', color: '#E4A848' },
            ].map((f) => (
              <div key={f.title} style={{
                background: 'white', borderRadius: '16px',
                padding: '28px 24px', textAlign: 'left',
                border: '1px solid #E8DCCB',
                boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
                transition: 'transform .2s, box-shadow .2s'
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(193,98,47,0.12)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,18,8,0.04)'
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: `${f.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', marginBottom: '16px'
                }}>
                  {f.icon}
                </div>
                <div style={{ fontWeight: 700, color: '#1E1208', fontSize: '0.95rem', marginBottom: '8px' }}>
                  {f.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6 }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATASET SECTION ── */}
      <section style={{
        padding: '90px 64px', background: '#1E1208',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: '-100px', top: '50%',
          transform: 'translateY(-50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(193,98,47,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#E4A848', marginBottom: '12px'
              }}>
                Dataset
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700,
                color: 'white', lineHeight: 1.2, marginBottom: '16px'
              }}>
                Restaurant Revenue<br />
                <span style={{ color: '#D4886A' }}>Prediction Dataset</span>
              </h2>
              <p style={{ color: '#7A6050', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '32px' }}>
                Dataset komprehensif mencakup berbagai faktor operasional restoran —
                dari kapasitas tempat duduk hingga budget marketing — digunakan untuk
                melatih model Supervised Learning Berbasis Regresi.
              </p>
              <Link to="/input" style={{
                background: '#C1622F', color: 'white',
                padding: '12px 28px', borderRadius: '10px',
                fontSize: '0.9rem', fontWeight: 600,
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '0 4px 14px rgba(193,98,47,0.35)'
              }}>
                Coba Prediksi →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1 }}>
              {[
                { num: '15', label: 'Fitur Input', desc: 'Variabel operasional restoran' },
                { num: 'SLR', label: 'Metode', desc: 'Supervised Learning Regresi' },
                { num: '~84%', label: 'Akurasi', desc: 'Hasil validasi model' },
                { num: 'MLflow', label: 'Tracking', desc: 'Eksperimen terkelola' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', padding: '14px 20px',
                  display: 'flex', alignItems: 'center', gap: '16px'
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.3rem', fontWeight: 700,
                    color: '#E4A848', minWidth: '56px'
                  }}>
                    {item.num}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'white', fontSize: '0.88rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.76rem', color: '#5A3E30', marginTop: '2px' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '90px 64px', background: '#FBF6EE' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '12px'
          }}>
            Tim Pengembang
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700,
            color: '#1E1208', marginBottom: '8px'
          }}>
            Project Based Learning
          </h2>
          <p style={{ color: '#7A6550', fontSize: '0.95rem', marginBottom: '8px' }}>
            Proyek Gabungan 3 Mata Kuliah
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {['Data Mining', 'MLOps', 'Teknologi Web Service'].map(mk => (
              <span key={mk} style={{
                background: 'rgba(193,98,47,0.08)',
                border: '1px solid rgba(193,98,47,0.20)',
                color: '#C1622F', fontSize: '0.75rem', fontWeight: 600,
                padding: '4px 14px', borderRadius: '20px'
              }}>
                {mk}
              </span>
            ))}
          </div>
          <p style={{ color: '#A0876A', fontSize: '0.85rem', marginBottom: '48px' }}>
            Politeknik Elektronika Negeri Surabaya
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { name: 'Laudita', role: 'Data Modelling & MLflow', emoji: '🧠', color: '#8BAF8A', desc: 'Bertanggung jawab atas pemodelan Supervised Learning Berbasis Regresi dan eksperimen MLflow untuk pemilihan model terbaik.' },
              { name: 'Indy', role: 'Backend & MLOps', emoji: '⚙️', color: '#E4A848', desc: 'Mengintegrasikan model ML ke FastAPI, mengelola pipeline MLOps, dan menyediakan endpoint prediksi yang siap digunakan.' },
              { name: 'Vika', role: 'Frontend, Docker & Vercel', emoji: '🎨', color: '#C1622F', desc: 'Membangun antarmuka pengguna React.js, mengintegrasikan Docker container, dan melakukan deployment via Vercel.' },
            ].map((member) => (
              <div key={member.name} style={{
                background: 'white', borderRadius: '20px',
                padding: '32px 24px', textAlign: 'center',
                border: '1px solid #E8DCCB',
                boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${member.color}, ${member.color}60)`
                }} />
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: `${member.color}15`,
                  border: `2px solid ${member.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', margin: '0 auto 16px'
                }}>
                  {member.emoji}
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.2rem', fontWeight: 700,
                  color: '#1E1208', marginBottom: '6px'
                }}>
                  {member.name}
                </div>
                <div style={{
                  display: 'inline-block',
                  background: `${member.color}12`,
                  color: member.color,
                  border: `1px solid ${member.color}25`,
                  fontSize: '0.72rem', fontWeight: 700,
                  padding: '4px 12px', borderRadius: '20px', marginBottom: '14px'
                }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6 }}>
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #FBF6EE, #FEF3E2)',
        padding: '64px',
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: '32px', alignItems: 'center',
        borderTop: '1px solid #E8DCCB'
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem', fontWeight: 700,
            color: '#1E1208', marginBottom: '10px'
          }}>
            Siap Meningkatkan Revenue Restoran Anda?
          </h2>
          <p style={{ color: '#7A6550', fontSize: '1rem', lineHeight: 1.6 }}>
            Mulai prediksi sekarang dan dapatkan insight berharga untuk mengembangkan bisnis kuliner Anda.
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/input" style={{
            background: '#C1622F', color: 'white',
            padding: '14px 32px', borderRadius: '12px',
            fontSize: '1rem', fontWeight: 600,
            textDecoration: 'none', display: 'flex',
            alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(193,98,47,0.25)',
            transition: 'all .2s', whiteSpace: 'nowrap'
          }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#1E1208'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = '#C1622F'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            📊 Mulai Prediksi Gratis →
          </Link>
          <div style={{ fontSize: '0.78rem', color: '#A0876A', marginTop: '8px' }}>
            Tidak ada kartu kredit · Gratis untuk dicoba
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#1E1208',
        padding: '48px 64px 28px',
        display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '40px'
      }}>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem', fontWeight: 900,
            color: 'white', marginBottom: '2px'
          }}>
            Di<span style={{ color: '#C1622F' }}>cto</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#5A3E30', marginBottom: '12px', letterSpacing: '0.04em' }}>
            AI Revenue Prediction
          </div>
          <p style={{ fontSize: '0.82rem', color: '#4A3028', lineHeight: 1.7 }}>
            Sistem prediksi pendapatan restoran berbasis Supervised Learning.
            Proyek PBL — PENS 2025.
          </p>
        </div>
        {[
          { title: 'Sistem', links: ['Beranda', 'Prediksi', 'Hasil', 'Tentang'] },
          { title: 'Model', links: ['Supervised Learning', 'MLflow', 'FastAPI', 'Dataset'] },
          { title: 'Tim', links: ['Laudita', 'Indy', 'Vika', 'GitHub'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 700,
              marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" style={{ color: '#4A3028', fontSize: '0.84rem', textDecoration: 'none' }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{
          gridColumn: '1/-1', marginTop: '20px', paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: '0.76rem', color: '#3A2820'
        }}>
          <span>© 2025 Dicto — Politeknik Elektronika Negeri Surabaya</span>
          <span>Supervised Learning · FastAPI · Docker · Vercel</span>
        </div>
      </footer>

    </div>
  )
}


export default HomePage

