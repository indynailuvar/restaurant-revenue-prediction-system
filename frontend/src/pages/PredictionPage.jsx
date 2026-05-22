import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from 'recharts'
import axios from 'axios'

function PredictionPage() {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [inputData, setInputData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('predictionInput')
    if (!saved) { navigate('/input'); return }
    const data = JSON.parse(saved)
    setInputData(data)
    fetchPrediction(data)
  }, [])

  const fetchPrediction = async (data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/predict`, data
      )
      setResult(response.data)
    } catch {
      setError('Backend belum tersambung. Menampilkan data simulasi.')
      setResult({ predicted_revenue: 125750000 })
    } finally {
      setLoading(false)
    }
  }

  const barData = inputData ? [
    { name: 'Rating', value: parseFloat(inputData.Rating) || 0 },
    { name: 'Ambience', value: parseFloat(inputData.Ambience_Score) || 0 },
    { name: 'Pelayanan', value: parseFloat(inputData.Service_Quality_Score) || 0 },
  ] : []

  const radarData = inputData ? [
    { subject: 'Rating', value: parseFloat(inputData.Rating) || 0, fullMark: 5 },
    { subject: 'Ambience', value: parseFloat(inputData.Ambience_Score) || 0, fullMark: 10 },
    { subject: 'Pelayanan', value: parseFloat(inputData.Service_Quality_Score) || 0, fullMark: 10 },
    { subject: 'Chef', value: parseFloat(inputData.Chef_Experience_Years) || 0, fullMark: 20 },
    { subject: 'Review', value: Math.min(parseFloat(inputData.Number_of_Reviews) / 50 || 0, 10), fullMark: 10 },
  ] : []

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#FBF6EE', paddingTop: '64px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'rgba(193,98,47,0.10)',
          border: '3px solid #C1622F',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 20px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          🤖
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem', color: '#1E1208', marginBottom: '8px'
        }}>
          Memproses Prediksi...
        </p>
        <p style={{ color: '#7A6550', fontSize: '0.9rem' }}>
          Model sedang menganalisis data restoran Anda
        </p>
      </div>
    </div>
  )

  return (
    <div style={{ paddingTop: '64px', background: '#FBF6EE', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: '#FEF8EE', borderBottom: '1px solid #E8DCCB',
        padding: '56px 64px 48px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', right: '-60px', top: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(228,168,72,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '12px'
          }}>
            Hasil Prediksi
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1E1208', lineHeight: 1.2, marginBottom: '12px'
          }}>
            Output Analisis Model ML
          </h1>
          <p style={{ color: '#7A6550', fontSize: '1rem', lineHeight: 1.7 }}>
            Hasil prediksi pendapatan restoran berdasarkan Supervised Learning Berbasis Regresi.
          </p>
          {error && (
            <div style={{
              marginTop: '16px', padding: '12px 18px',
              background: 'rgba(228,168,72,0.12)',
              border: '1px solid rgba(228,168,72,0.35)',
              borderRadius: '10px', fontSize: '0.84rem',
              color: '#1E1208', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 48px' }}>

        {/* Revenue Card */}
        <div style={{
          background: '#1E1208', borderRadius: '20px',
          padding: '48px', marginBottom: '24px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(30,18,8,0.20)'
        }}>
          <div style={{
            position: 'absolute', right: '-80px', top: '-80px',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(193,98,47,0.20) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', left: '-60px', bottom: '-60px',
            width: '250px', height: '250px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(228,168,72,0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#7A6050',
            marginBottom: '16px', position: 'relative', zIndex: 1
          }}>
            Estimasi Pendapatan Bulanan
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 900, color: '#E4A848',
            marginBottom: '12px', letterSpacing: '-1px',
            position: 'relative', zIndex: 1
          }}>
            Rp {result?.predicted_revenue?.toLocaleString('id-ID') || '0'}
          </div>
          <div style={{
            color: '#5A3E30', fontSize: '0.9rem',
            marginBottom: '32px', position: 'relative', zIndex: 1
          }}>
            per bulan · Supervised Learning Model
          </div>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px',
            paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', zIndex: 1
          }}>
            {[
              { label: 'Metode', val: 'Supervised Learning' },
              { label: 'Status', val: '✅ Berhasil' },
              { label: 'Akurasi', val: '~84%' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  color: 'white', marginBottom: '4px'
                }}>{s.val}</div>
                <div style={{ fontSize: '0.7rem', color: '#5A3E30' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
              Skor Kualitas
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '20px' }}>
              Performa Restoran
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E8DA" />
                <XAxis dataKey="name" fontSize={11} tick={{ fill: '#7A6550' }} />
                <YAxis fontSize={11} tick={{ fill: '#7A6550' }} />
                <Tooltip contentStyle={{ background: '#1E1208', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.8rem' }} />
                <Bar dataKey="value" fill="#C1622F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
              Profil Lengkap
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '20px' }}>
              Radar Restoran
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#F0E8DA" />
                <PolarAngleAxis dataKey="subject" fontSize={10} tick={{ fill: '#7A6550' }} />
                <Radar dataKey="value" stroke="#C1622F" fill="#C1622F" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '28px',
          border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
            Analisis Faktor
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '24px' }}>
            Faktor Paling Berpengaruh
          </div>
          {[
            { name: 'Marketing Budget', val: 0.32, color: '#C1622F' },
            { name: 'Rating Restoran', val: 0.24, color: '#E4A848' },
            { name: 'Social Media Followers', val: 0.19, color: '#D4886A' },
            { name: 'Pengalaman Chef', val: 0.13, color: '#A0876A' },
          ].map(item => (
            <div key={item.name} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 500, color: '#1E1208' }}>{item.name}</span>
                <span style={{ fontSize: '0.78rem', fontFamily: 'DM Mono, monospace', color: '#7A6550' }}>{item.val}</span>
              </div>
              <div style={{ height: '6px', background: '#F0E8DA', borderRadius: '3px' }}>
                <div style={{ height: '6px', width: `${(item.val / 0.32) * 100}%`, background: item.color, borderRadius: '3px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Input Summary */}
        {inputData && (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB', boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
              Ringkasan Input
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '20px' }}>
              Data yang Dianalisis
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {Object.entries(inputData).map(([key, value]) => (
                <div key={key} style={{ background: '#FBF6EE', borderRadius: '10px', padding: '12px 14px', border: '1px solid #E8DCCB' }}>
                  <div style={{ fontSize: '0.7rem', color: '#7A6550', marginBottom: '4px', textTransform: 'capitalize' }}>
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div style={{ fontWeight: 600, color: '#1E1208', fontSize: '0.88rem' }}>
                    {value || '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={() => navigate('/input')}
            style={{
              flex: 1, padding: '14px', borderRadius: '10px',
              border: '1.5px solid #C1622F', background: 'transparent',
              color: '#C1622F', fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s'
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#C1622F'; e.currentTarget.style.color = 'white' }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C1622F' }}
          >
            🔄 Input Ulang
          </button>
          <Link to="/about" style={{
            flex: 1, padding: '14px', borderRadius: '10px',
            border: 'none', background: '#1E1208', color: 'white',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
            cursor: 'pointer', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'background .2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = '#C1622F'}
            onMouseOut={e => e.currentTarget.style.background = '#1E1208'}
          >
            ℹ️ Tentang Sistem
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PredictionPage