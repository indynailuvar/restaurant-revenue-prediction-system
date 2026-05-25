import { Link } from 'react-router-dom'

function AboutPage() {
  const team = [
    {
      name: 'Laudita', role: 'Data Modelling & MLflow', emoji: '🧠', color: '#8BAF8A',
      desc: 'Bertanggung jawab atas pemodelan Supervised Learning Berbasis Regresi, eksperimen MLflow, dan pemilihan model terbaik dari dataset Restaurant Revenue Prediction.'
    },
    {
      name: 'Indy', role: 'Backend & MLOps', emoji: '⚙️', color: '#E4A848',
      desc: 'Mengintegrasikan model ML ke FastAPI, mengelola pipeline MLOps, dan menyediakan endpoint prediksi /predict yang siap digunakan oleh frontend.'
    },
    {
      name: 'Vika', role: 'Frontend, Docker & Vercel', emoji: '🎨', color: '#C1622F',
      desc: 'Membangun antarmuka pengguna menggunakan React.js, mengintegrasikan Docker container untuk deployment konsisten, dan melakukan deployment via Vercel.'
    },
  ]

  const models = [
    { icon: '🌲', name: 'Random Forest', desc: 'Model ensemble berbasis decision tree yang robust untuk prediksi revenue restoran.' },
    { icon: '⚡', name: 'Gradient Boosting', desc: 'Model boosting sekuensial dengan performa tinggi pada dataset revenue restoran.' },
    { icon: '📈', name: 'Linear Regression', desc: 'Model baseline regresi untuk memprediksi nilai kontinu pendapatan restoran.' },
  ]

  const stack = [
    { icon: '🤖', name: 'Supervised Learning', desc: 'Model regresi dilatih dengan data historis restoran' },
    { icon: '🔬', name: 'MLflow Tracking', desc: 'Eksperimen model dilacak dan dikelola' },
    { icon: '⚡', name: 'FastAPI Backend', desc: 'API endpoint yang cepat dan efisien' },
    { icon: '⚛️', name: 'React.js Frontend', desc: 'Antarmuka interaktif berbasis komponen' },
    { icon: '🐳', name: 'Docker Container', desc: 'Aplikasi dikemas dalam container' },
    { icon: '▲', name: 'Vercel Deployment', desc: 'Frontend di-deploy ke cloud Vercel' },
  ]

  const inputs = [
    'Lokasi Restoran', 'Jenis Masakan', 'Rating',
    'Kapasitas Tempat Duduk', 'Harga Rata-rata', 'Budget Marketing',
    'Followers Media Sosial', 'Pengalaman Chef', 'Jumlah Review',
    'Panjang Review', 'Skor Ambience', 'Skor Pelayanan',
    'Reservasi Weekend', 'Reservasi Weekday', 'Ketersediaan Parkir'
  ]

  return (
    <div style={{ paddingTop: '64px', background: '#FBF6EE', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: '#1E1208', padding: '80px 64px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(193,98,47,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4A848', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          Tentang Project
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', fontWeight: 900,
          color: 'white', lineHeight: 1.2, marginBottom: '16px',
          position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto 16px'
        }}>
          Pemodelan Prediksi Pendapatan Restoran<br />
          <span style={{ color: '#D4886A' }}>Menggunakan Metode Supervised Learning Berbasis Regresi</span>
        </h1>
        <p style={{ color: '#5A3E30', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 12px', position: 'relative', zIndex: 1 }}>
          Project Based Learning — Proyek Gabungan 3 Mata Kuliah
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '28px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {['Data Mining', 'MLOps', 'Teknologi Web Service'].map(mk => (
            <span key={mk} style={{
              background: 'rgba(228,168,72,0.15)', border: '1px solid rgba(228,168,72,0.30)',
              color: '#E4A848', fontSize: '0.75rem', fontWeight: 600,
              padding: '4px 14px', borderRadius: '20px'
            }}>
              {mk}
            </span>
          ))}
        </div>
        <p style={{ color: '#3A2820', fontSize: '0.85rem', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
          Politeknik Elektronika Negeri Surabaya 2025
        </p>
        <Link to="/input" style={{
          background: '#C1622F', color: 'white',
          padding: '14px 32px', borderRadius: '10px',
          fontSize: '0.95rem', fontWeight: 600,
          textDecoration: 'none', display: 'inline-block',
          boxShadow: '0 4px 14px rgba(193,98,47,0.35)',
          position: 'relative', zIndex: 1
        }}>
          Mulai Prediksi →
        </Link>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 48px' }}>

        {/* Model ML */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px' }}>
            Model Machine Learning
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#1E1208', marginBottom: '24px' }}>
            Metode Supervised Learning
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {models.map((model) => (
              <div key={model.name} style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{model.icon}</div>
                <div style={{ fontWeight: 700, color: '#1E1208', fontSize: '0.95rem', marginBottom: '8px' }}>{model.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6 }}>{model.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '32px',
          border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px' }}>
            Tech Stack
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1E1208', marginBottom: '24px' }}>
            Teknologi yang Digunakan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {stack.map((item) => (
              <div key={item.name} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '16px', borderRadius: '12px',
                background: '#FBF6EE', border: '1px solid #E8DCCB'
              }}>
                <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1E1208', fontSize: '0.85rem', marginBottom: '3px' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A6550', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Features */}
        <div style={{
          background: '#1E1208', borderRadius: '16px', padding: '32px', marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E4A848', marginBottom: '8px' }}>
            Variabel Input
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '24px' }}>
            15 Fitur Prediksi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {inputs.map((input, i) => (
              <div key={input} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#C1622F', color: 'white',
                  fontSize: '0.62rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontFamily: 'DM Mono, monospace'
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{input}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tim */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px' }}>
            Tim Pengembang
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#1E1208', marginBottom: '8px' }}>
            Project Based Learning
          </h2>
          <p style={{ color: '#7A6550', fontSize: '0.9rem', marginBottom: '8px' }}>
            Proyek Gabungan 3 Mata Kuliah
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {['Data Mining', 'MLOps', 'Teknologi Web Service'].map(mk => (
              <span key={mk} style={{
                background: 'rgba(193,98,47,0.08)', border: '1px solid rgba(193,98,47,0.20)',
                color: '#C1622F', fontSize: '0.75rem', fontWeight: 600,
                padding: '4px 14px', borderRadius: '20px'
              }}>
                {mk}
              </span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {team.map((member) => (
              <div key={member.name} style={{
                background: 'white', borderRadius: '20px', padding: '32px 24px',
                textAlign: 'center', border: '1px solid #E8DCCB',
                boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: `linear-gradient(90deg, ${member.color}, ${member.color}60)`
                }} />
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: `${member.color}15`, border: `2px solid ${member.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', margin: '0 auto 16px'
                }}>
                  {member.emoji}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: '#1E1208', marginBottom: '6px' }}>
                  {member.name}
                </div>
                <div style={{
                  display: 'inline-block', background: `${member.color}12`,
                  color: member.color, border: `1px solid ${member.color}25`,
                  fontSize: '0.72rem', fontWeight: 700,
                  padding: '4px 12px', borderRadius: '20px', marginBottom: '14px'
                }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6 }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: '#FEF8EE', borderRadius: '16px', padding: '48px',
          textAlign: 'center', border: '1px solid #E8DCCB'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🍽️</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#1E1208', marginBottom: '12px' }}>
            Siap Memprediksi Pendapatan Restoran?
          </h2>
          <p style={{ color: '#7A6550', marginBottom: '28px', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 28px' }}>
            Masukkan data restoran dan dapatkan estimasi pendapatan menggunakan model Supervised Learning.
          </p>
          <Link to="/input" style={{
            background: '#C1622F', color: 'white',
            padding: '14px 36px', borderRadius: '10px',
            fontSize: '0.95rem', fontWeight: 600,
            textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 4px 14px rgba(193,98,47,0.30)'
          }}>
            Mulai Prediksi →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default AboutPage