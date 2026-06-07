import { Link } from 'react-router-dom'

function InsightPage() {
  const factors = [
    {
      rank: '01',
      name: 'Marketing Budget',
      impact: 32,
      color: '#C1622F',
      icon: '📣',
      desc: 'Budget marketing adalah faktor paling berpengaruh terhadap pendapatan restoran. Semakin besar investasi marketing, semakin luas jangkauan pelanggan dan semakin tinggi potensi pendapatan.',
      tip: 'Alokasikan minimal 10-15% dari target pendapatan untuk budget marketing.'
    },
    {
      rank: '02',
      name: 'Rating Restoran',
      impact: 24,
      color: '#E4A848',
      icon: '⭐',
      desc: 'Rating mencerminkan kepuasan pelanggan secara keseluruhan. Restoran dengan rating tinggi cenderung mendapat lebih banyak kunjungan dan reservasi dari pelanggan baru.',
      tip: 'Pertahankan rating di atas 4.0 dengan konsisten menjaga kualitas makanan dan pelayanan.'
    },
    {
      rank: '03',
      name: 'Social Media Followers',
      impact: 19,
      color: '#D4886A',
      icon: '📱',
      desc: 'Kehadiran di media sosial berdampak signifikan pada visibilitas restoran. Followers yang banyak berarti jangkauan promosi yang lebih luas tanpa biaya tambahan.',
      tip: 'Posting konten menarik secara konsisten minimal 3-4 kali per minggu.'
    },
    {
      rank: '04',
      name: 'Pengalaman Chef',
      impact: 13,
      color: '#A0876A',
      icon: '👨‍🍳',
      desc: 'Pengalaman chef berkorelasi dengan kualitas masakan yang konsisten. Chef berpengalaman mampu menciptakan menu yang lebih menarik dan mempertahankan standar kualitas.',
      tip: 'Investasikan pada pelatihan dan pengembangan chef secara berkala.'
    },
  ]

  const metrics = [
    {
      icon: '🎯',
      title: 'R² = 0.9996',
      subtitle: 'Koefisien Determinasi',
      desc: 'Model mampu menjelaskan 99.96% variasi pendapatan restoran. Artinya prediksi model sangat akurat dan dapat diandalkan untuk estimasi pendapatan.',
      color: '#C1622F'
    },
    {
      icon: '📏',
      title: 'MAE = Rp 3.810',
      subtitle: 'Mean Absolute Error',
      desc: 'Rata-rata kesalahan prediksi hanya Rp 3.810 per prediksi. Nilai ini sangat kecil dibanding skala pendapatan restoran yang mencapai ratusan juta rupiah.',
      color: '#E4A848'
    },
    {
      icon: '⚡',
      title: 'Gradient Boosting',
      subtitle: 'Algoritma Terpilih',
      desc: 'Dari 3 algoritma yang diuji, Gradient Boosting Regressor terpilih sebagai champion model karena memiliki akurasi tertinggi dan error terendah.',
      color: '#D4886A'
    },
  ]

  const recommendations = [
    {
      icon: '📣',
      title: 'Optimalkan Marketing Budget',
      priority: 'Prioritas Tinggi',
      priorityColor: '#C1622F',
      points: [
        'Alokasikan 10-15% dari target pendapatan untuk marketing',
        'Fokus pada digital marketing untuk jangkauan lebih luas',
        'Gunakan data analytics untuk targeting yang tepat',
        'Evaluasi ROI marketing setiap bulan'
      ]
    },
    {
      icon: '⭐',
      title: 'Tingkatkan Rating & Ulasan',
      priority: 'Prioritas Tinggi',
      priorityColor: '#C1622F',
      points: [
        'Minta pelanggan puas untuk memberikan ulasan positif',
        'Respons semua ulasan negatif dengan profesional',
        'Lakukan survei kepuasan pelanggan secara berkala',
        'Targetkan rating minimal 4.2 dari 5.0'
      ]
    },
    {
      icon: '📱',
      title: 'Perkuat Kehadiran Digital',
      priority: 'Prioritas Sedang',
      priorityColor: '#E4A848',
      points: [
        'Konsisten posting konten di Instagram dan TikTok',
        'Kolaborasi dengan food blogger dan influencer lokal',
        'Aktifkan fitur pemesanan online di Google Maps',
        'Buat konten behind-the-scenes yang menarik'
      ]
    },
    {
      icon: '👨‍🍳',
      title: 'Investasi pada SDM',
      priority: 'Prioritas Sedang',
      priorityColor: '#E4A848',
      points: [
        'Rekrut chef berpengalaman minimal 5 tahun',
        'Adakan pelatihan rutin untuk seluruh staff',
        'Berikan insentif untuk mempertahankan chef terbaik',
        'Kembangkan menu signature yang unik'
      ]
    },
    {
      icon: '💺',
      title: 'Optimalkan Kapasitas',
      priority: 'Prioritas Normal',
      priorityColor: '#A0876A',
      points: [
        'Analisis pola reservasi weekend vs weekday',
        'Buat promo khusus weekday untuk meningkatkan occupancy',
        'Optimalkan layout tempat duduk untuk kenyamanan',
        'Pertimbangkan sistem reservasi online'
      ]
    },
    {
      icon: '🅿️',
      title: 'Fasilitas Pendukung',
      priority: 'Prioritas Normal',
      priorityColor: '#A0876A',
      points: [
        'Sediakan parkir yang memadai untuk pelanggan',
        'Perhatikan ambience dan dekorasi restoran',
        'Pastikan kebersihan dan kenyamanan konsisten',
        'Pertimbangkan area outdoor untuk kapasitas tambahan'
      ]
    },
  ]

  const limitations = [
    { icon: '📊', title: 'Keterbatasan Dataset', desc: 'Model dilatih pada dataset yang mungkin tidak merepresentasikan semua jenis restoran, hanya diwilayah tertentu saja.' },
    { icon: '🌍', title: 'Faktor Eksternal', desc: 'Model tidak mempertimbangkan faktor eksternal seperti kondisi ekonomi, musim, tren kuliner, dan kompetitor.' },
    { icon: '⏰', title: 'Perubahan Waktu', desc: 'Perilaku konsumen berubah seiring waktu. Model perlu dilatih ulang secara berkala dengan data terbaru.' },
    { icon: '📍', title: 'Spesifisitas Lokasi', desc: 'Prediksi mungkin kurang akurat untuk lokasi dengan karakteristik pasar yang sangat berbeda dari data training.' },
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
          background: 'radial-gradient(circle, rgba(228,168,72,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: '#E4A848',
          marginBottom: '16px', position: 'relative', zIndex: 1
        }}>
          Analisis Mendalam
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900,
          color: 'white', lineHeight: 1.2, marginBottom: '16px',
          position: 'relative', zIndex: 1,
          maxWidth: '700px', margin: '0 auto 16px'
        }}>
          Insight &{' '}
          <span style={{ color: '#D4886A' }}>Rekomendasi</span>
        </h1>
        <p style={{
          color: '#ada49f', fontSize: '0.95rem', lineHeight: 1.7,
          maxWidth: '560px', margin: '0 auto 28px',
          position: 'relative', zIndex: 1
        }}>
          Interpretasi hasil model Gradient Boosting Regressor dan rekomendasi
          strategis untuk meningkatkan pendapatan restoran.
        </p>
        <Link to="/input" style={{
          background: '#C1622F', color: 'white',
          padding: '12px 28px', borderRadius: '10px',
          fontSize: '0.9rem', fontWeight: 600,
          textDecoration: 'none', display: 'inline-block',
          boxShadow: '0 4px 14px rgba(193,98,47,0.35)',
          position: 'relative', zIndex: 1
        }}>
          Coba Prediksi →
        </Link>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 48px' }}>

        {/* Performa Model */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px'
          }}>
            Performa Model
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem', fontWeight: 700,
            color: '#1E1208', marginBottom: '24px'
          }}>
            Apa Artinya Angka-angka Ini?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {metrics.map((metric) => (
              <div key={metric.title} style={{
                background: 'white', borderRadius: '16px', padding: '28px 24px',
                border: '1px solid #E8DCCB',
                boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                  background: `linear-gradient(90deg, ${metric.color}, ${metric.color}60)`
                }} />
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{metric.icon}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem', fontWeight: 700,
                  color: metric.color, marginBottom: '4px'
                }}>
                  {metric.title}
                </div>
                <div style={{
                  fontSize: '0.72rem', fontWeight: 700, color: '#A0876A',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  marginBottom: '10px'
                }}>
                  {metric.subtitle}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6 }}>
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Faktor Berpengaruh */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '32px',
          border: '1px solid #E8DCCB',
          boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
          marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px'
          }}>
            Feature Importance
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.6rem', fontWeight: 700,
            color: '#1E1208', marginBottom: '8px'
          }}>
            Faktor Paling Berpengaruh
          </h2>
          <p style={{ color: '#7A6550', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px' }}>
            Berdasarkan analisis model Gradient Boosting, berikut faktor-faktor yang paling mempengaruhi pendapatan restoran:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {factors.map((factor) => (
              <div key={factor.name} style={{
                background: '#FBF6EE', borderRadius: '14px',
                padding: '20px 24px', border: '1px solid #E8DCCB'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem', fontWeight: 700,
                    color: factor.color, minWidth: '40px'
                  }}>
                    {factor.rank}
                  </div>
                  <div style={{ fontSize: '1.5rem' }}>{factor.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#1E1208', fontSize: '0.95rem' }}>
                      {factor.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#7A6550', marginTop: '2px' }}>
                      Feature importance: {factor.impact}%
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.4rem', fontWeight: 700, color: factor.color
                  }}>
                    {factor.impact}%
                  </div>
                </div>
                <div style={{ height: '6px', background: '#E8DCCB', borderRadius: '3px', marginBottom: '12px' }}>
                  <div style={{
                    height: '6px', width: `${factor.impact * 3}%`,
                    background: factor.color, borderRadius: '3px',
                    transition: 'width 1s ease'
                  }} />
                </div>
                <p style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.6, marginBottom: '8px' }}>
                  {factor.desc}
                </p>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: '8px',
                  background: `${factor.color}10`,
                  border: `1px solid ${factor.color}25`,
                  borderRadius: '8px', padding: '10px 14px'
                }}>
                  <span style={{ color: factor.color, fontWeight: 700, fontSize: '0.82rem' }}>💡 Tips:</span>
                  <span style={{ fontSize: '0.82rem', color: '#3A2418', lineHeight: 1.5 }}>{factor.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rekomendasi */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '8px'
          }}>
            Rekomendasi Strategis
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem', fontWeight: 700,
            color: '#1E1208', marginBottom: '8px'
          }}>
            Saran dari Kami
          </h2>
          <p style={{ color: '#7A6550', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px' }}>
            Berdasarkan hasil analisis model, berikut rekomendasi strategis untuk meningkatkan pendapatan restoran:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {recommendations.map((rec) => (
              <div key={rec.title} style={{
                background: 'white', borderRadius: '16px', padding: '24px',
                border: '1px solid #E8DCCB',
                boxShadow: '0 4px 16px rgba(30,18,8,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ fontSize: '1.5rem' }}>{rec.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#1E1208', fontSize: '0.92rem' }}>
                      {rec.title}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      background: `${rec.priorityColor}12`,
                      color: rec.priorityColor,
                      border: `1px solid ${rec.priorityColor}25`,
                      fontSize: '0.68rem', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '20px', marginTop: '3px'
                    }}>
                      {rec.priority}
                    </div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rec.points.map((point, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: 'rgba(193,98,47,0.10)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '1px'
                      }}>
                        <span style={{ color: '#C1622F', fontSize: '9px', fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.82rem', color: '#7A6550', lineHeight: 1.5 }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Keterbatasan */}
        <div style={{
          background: '#1E1208', borderRadius: '16px',
          padding: '32px', marginBottom: '24px'
        }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#E4A848', marginBottom: '8px'
          }}>
            Keterbatasan
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem', fontWeight: 700,
            color: 'white', marginBottom: '24px'
          }}>
            Yang Perlu Diperhatikan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {limitations.map((item) => (
              <div key={item.title} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px 20px',
                display: 'flex', gap: '14px', alignItems: 'flex-start'
              }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '0.88rem', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cecece', lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: '#FEF8EE', borderRadius: '16px',
          padding: '48px', textAlign: 'center',
          border: '1px solid #E8DCCB'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🚀</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.6rem', fontWeight: 700,
            color: '#1E1208', marginBottom: '12px'
          }}>
            Siap Mengoptimalkan Revenue Restoran?
          </h2>
          <p style={{
            color: '#7A6550', marginBottom: '28px',
            fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 28px'
          }}>
            Gunakan model Gradient Boosting kami untuk memprediksi dan meningkatkan pendapatan restoran Anda.
          </p>
          <Link to="/input" style={{
            background: '#C1622F', color: 'white',
            padding: '14px 36px', borderRadius: '10px',
            fontSize: '0.95rem', fontWeight: 600,
            textDecoration: 'none', display: 'inline-block',
            boxShadow: '0 4px 14px rgba(193,98,47,0.30)'
          }}>
            Mulai Prediksi Sekarang →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default InsightPage