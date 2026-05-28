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
      setResult({
        predicted_revenue: 638945.52,
        predicted_revenue_usd: 638945.52,
        predicted_revenue_idr: 10223128320,
        currency: 'USD',
        converted_currency: 'IDR',
        usd_to_idr_rate: 16000,
        model_status: 'loaded',
        model_name: 'restaurant_gb_revenue1',
        model_version: '1',
        model_alias: 'champion',
        input_status: 'valid',
        prediction_reliability: 'normal',
        prediction_note: 'Input berada dalam kategori dan rentang data training yang diketahui. Hasil prediksi dapat digunakan sebagai estimasi awal.',
        supporting_factors: ['Rating restoran relatif tinggi.', 'Jumlah pengikut media sosial relatif besar.'],
        recommendation: 'Hasil prediksi dapat digunakan sebagai estimasi awal Revenue restoran berdasarkan fitur operasional.',
        validation_warnings: [],
        out_of_range_features: [],
        unknown_categories: [],
        is_prediction_adjusted: false,
        currency_note: 'Prediksi Revenue utama ditampilkan dalam USD sesuai satuan target pada dataset training.',
        exchange_rate_note: 'Konversi IDR menggunakan rate konfigurasi sistem, bukan kurs real-time.',
      })
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
    { subject: 'Ambience', value: parseFloat(inputData.Ambience_Score) || 0, fullMark: 5 },
    { subject: 'Pelayanan', value: parseFloat(inputData.Service_Quality_Score) || 0, fullMark: 5 },
    { subject: 'Chef', value: Math.min(parseFloat(inputData.Chef_Experience_Years) || 0, 5), fullMark: 5 },
    { subject: 'Review', value: Math.min(parseFloat(inputData.Number_of_Reviews) / 100 || 0, 5), fullMark: 5 },
  ] : []

  const getReliabilityColor = (reliability) => {
    if (reliability === 'normal') return '#8BAF8A'
    if (reliability === 'low') return '#E4A848'
    return '#C1622F'
  }

  const getReliabilityLabel = (reliability) => {
    if (reliability === 'normal') return '✅ Normal'
    if (reliability === 'low') return '⚠️ Perlu Perhatian'
    return '❌ Rendah'
  }

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
          Model Gradient Boosting sedang menganalisis data restoran Anda
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
            Hasil prediksi pendapatan tahunan restoran menggunakan Gradient Boosting Regressor.
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

        {/* Revenue Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '16px', marginBottom: '24px'
        }}>
          {/* USD Card */}
          <div style={{
            background: '#1E1208', borderRadius: '20px',
            padding: '32px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(30,18,8,0.20)'
          }}>
            <div style={{
              position: 'absolute', right: '-40px', top: '-40px',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(193,98,47,0.20) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#7A6050',
              marginBottom: '10px', position: 'relative', zIndex: 1
            }}>
              Pendapatan Tahunan (USD)
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 900, color: '#E4A848',
              marginBottom: '8px', letterSpacing: '-1px',
              position: 'relative', zIndex: 1
            }}>
              $ {result?.predicted_revenue_usd?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0'}
            </div>
            <div style={{
              color: '#5A3E30', fontSize: '0.78rem',
              position: 'relative', zIndex: 1
            }}>
              {result?.currency || 'USD'} · per tahun
            </div>
          </div>

          {/* IDR Card */}
          <div style={{
            background: '#C1622F', borderRadius: '20px',
            padding: '32px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(193,98,47,0.20)'
          }}>
            <div style={{
              position: 'absolute', right: '-40px', top: '-40px',
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              pointerEvents: 'none'
            }} />
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
              marginBottom: '10px', position: 'relative', zIndex: 1
            }}>
              Pendapatan Tahunan (IDR)
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 900, color: 'white',
              marginBottom: '8px', letterSpacing: '-0.5px',
              position: 'relative', zIndex: 1
            }}>
              Rp {result?.predicted_revenue_idr?.toLocaleString('id-ID') || '0'}
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem',
              position: 'relative', zIndex: 1
            }}>
              Kurs 1 USD = Rp {result?.usd_to_idr_rate?.toLocaleString('id-ID') || '16.000'}
            </div>
          </div>
        </div>

        {/* Model Info */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '24px',
          border: '1px solid #E8DCCB',
          boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
          marginBottom: '20px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'
        }}>
          {[
            { label: 'Model', val: result?.model_name || '-' },
            { label: 'Versi', val: `v${result?.model_version || '1'}` },
            { label: 'Alias', val: `@${result?.model_alias || 'champion'}` },
            { label: 'Reliabilitas', val: getReliabilityLabel(result?.prediction_reliability), color: getReliabilityColor(result?.prediction_reliability) },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#7A6550', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
              <div style={{
                fontWeight: 700, color: s.color || '#1E1208',
                fontSize: '0.82rem', fontFamily: 'DM Mono, monospace'
              }}>
                {s.val}
              </div>
            </div>
          ))}
        </div>

        {/* Currency Note */}
        <div style={{
          background: 'rgba(228,168,72,0.08)',
          border: '1px solid rgba(228,168,72,0.25)',
          borderRadius: '10px', padding: '12px 16px',
          marginBottom: '20px', fontSize: '0.82rem', color: '#7A5808',
          display: 'flex', alignItems: 'flex-start', gap: '8px'
        }}>
          <span>💱</span>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '2px' }}>{result?.currency_note}</div>
            <div style={{ color: '#A0876A', fontSize: '0.78rem' }}>{result?.exchange_rate_note}</div>
          </div>
        </div>

        {/* Validation Warnings */}
        {result?.validation_warnings?.length > 0 && (
          <div style={{
            background: 'rgba(193,98,47,0.08)',
            border: '1px solid rgba(193,98,47,0.25)',
            borderRadius: '10px', padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ fontWeight: 700, color: '#C1622F', marginBottom: '8px', fontSize: '0.88rem' }}>
              ⚠️Peringatan Validasi
            </div>
            {result.validation_warnings.map((w, i) => (
              <div key={i} style={{ fontSize: '0.82rem', color: '#7A6550', marginBottom: '4px' }}>
                • {w}
              </div>
            ))}
          </div>
        )}

        {/* Charts */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '20px', marginBottom: '20px'
        }}>
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

        {/* Supporting Factors */}
        {result?.supporting_factors?.length > 0 && (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB',
            boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
              Faktor Pendukung
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '20px' }}>
              Mengapa Pendapatan Ini?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.supporting_factors.map((factor, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                  padding: '12px 16px', borderRadius: '10px',
                  background: '#FBF6EE', border: '1px solid #E8DCCB'
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: 'rgba(193,98,47,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '0.72rem', fontWeight: 700, color: '#C1622F'
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#1E1208', lineHeight: 1.6 }}>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        {result?.recommendation && (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB',
            boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C1622F', marginBottom: '4px' }}>
              Rekomendasi
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#1E1208', marginBottom: '14px' }}>
              Catatan dari Model
            </div>
            <div style={{
              padding: '16px', borderRadius: '10px',
              background: '#FBF6EE', border: '1px solid #E8DCCB',
              fontSize: '0.88rem', color: '#7A6550', lineHeight: 1.7
            }}>
              💡 {result.recommendation}
            </div>
            <div style={{
              marginTop: '12px', padding: '12px 16px',
              borderRadius: '10px', background: 'rgba(139,175,138,0.10)',
              border: '1px solid rgba(139,175,138,0.25)',
              fontSize: '0.82rem', color: '#3A6A38', lineHeight: 1.6
            }}>
              📋 {result.prediction_note}
            </div>
          </div>
        )}

        {/* Out of Range Warning */}
        {result?.out_of_range_features?.length > 0 && (
          <div style={{
            background: 'rgba(228,168,72,0.08)',
            border: '1px solid rgba(228,168,72,0.25)',
            borderRadius: '10px', padding: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ fontWeight: 700, color: '#B8900A', marginBottom: '10px', fontSize: '0.88rem' }}>
              📊 Nilai Di Luar Rentang Training
            </div>
            {result.out_of_range_features.map((item, i) => (
              <div key={i} style={{
                fontSize: '0.82rem', color: '#7A6550',
                marginBottom: '6px', padding: '8px 12px',
                background: 'white', borderRadius: '8px'
              }}>
                <strong style={{ color: '#1E1208' }}>{item.feature}</strong>: {item.input_value} (rentang training: {item.training_min} – {item.training_max})
              </div>
            ))}
          </div>
        )}

        {/* Input Summary */}
        {inputData && (
          <div style={{
            background: 'white', borderRadius: '16px', padding: '28px',
            border: '1px solid #E8DCCB',
            boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
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
          <Link to="/insight" style={{
            flex: 1, padding: '14px', borderRadius: '10px',
            border: 'none', background: '#E4A848', color: 'white',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
            cursor: 'pointer', textDecoration: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'background .2s'
          }}
            onMouseOver={e => e.currentTarget.style.background = '#B8900A'}
            onMouseOut={e => e.currentTarget.style.background = '#E4A848'}
          >
            💡 Lihat Insight
          </Link>
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
            ℹ️ Tentang
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PredictionPage