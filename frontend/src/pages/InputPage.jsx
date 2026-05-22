import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function InputPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Location: '', Cuisine: '', Rating: '',
    Seating_Capacity: '', Average_Meal_Price: '',
    Marketing_Budget: '', Social_Media_Followers: '',
    Chef_Experience_Years: '', Number_of_Reviews: '',
    Avg_Review_Length: '', Ambience_Score: '',
    Service_Quality_Score: '', Weekend_Reservations: '',
    Weekday_Reservations: '', Parking_Availability: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    localStorage.setItem('predictionInput', JSON.stringify(formData))
    navigate('/prediction')
  }

  const sections = [
    {
      title: 'Informasi Umum', icon: '📍', color: '#C1622F',
      fields: [
        { name: 'Location', label: 'Lokasi Restoran', type: 'text', placeholder: 'cth. Surabaya', span: 1 },
        { name: 'Cuisine', label: 'Jenis Masakan', type: 'text', placeholder: 'cth. Indonesian', span: 1 },
        { name: 'Seating_Capacity', label: 'Kapasitas Tempat Duduk', type: 'number', placeholder: 'cth. 80', span: 1 },
        { name: 'Parking_Availability', label: 'Ketersediaan Parkir', type: 'text', placeholder: 'Yes / No', span: 1 },
      ]
    },
    {
      title: 'Kualitas & Penilaian', icon: '⭐', color: '#E4A848',
      fields: [
        { name: 'Rating', label: 'Rating Restoran (1–5)', type: 'number', placeholder: 'cth. 4.5', span: 1 },
        { name: 'Ambience_Score', label: 'Skor Ambience (1–10)', type: 'number', placeholder: 'cth. 8', span: 1 },
        { name: 'Service_Quality_Score', label: 'Skor Kualitas Pelayanan (1–10)', type: 'number', placeholder: 'cth. 9', span: 1 },
        { name: 'Chef_Experience_Years', label: 'Pengalaman Chef (tahun)', type: 'number', placeholder: 'cth. 5', span: 1 },
      ]
    },
    {
      title: 'Keuangan & Marketing', icon: '💰', color: '#C1622F',
      fields: [
        { name: 'Average_Meal_Price', label: 'Harga Rata-rata Makanan (Rp)', type: 'number', placeholder: 'cth. 75000', span: 1 },
        { name: 'Marketing_Budget', label: 'Budget Marketing (Rp)', type: 'number', placeholder: 'cth. 5000000', span: 1 },
        { name: 'Social_Media_Followers', label: 'Followers Media Sosial', type: 'number', placeholder: 'cth. 10000', span: 2 },
      ]
    },
    {
      title: 'Ulasan & Reservasi', icon: '💬', color: '#E4A848',
      fields: [
        { name: 'Number_of_Reviews', label: 'Jumlah Review', type: 'number', placeholder: 'cth. 200', span: 1 },
        { name: 'Avg_Review_Length', label: 'Rata-rata Panjang Review', type: 'number', placeholder: 'cth. 150', span: 1 },
        { name: 'Weekend_Reservations', label: 'Reservasi Weekend', type: 'number', placeholder: 'cth. 50', span: 1 },
        { name: 'Weekday_Reservations', label: 'Reservasi Weekday', type: 'number', placeholder: 'cth. 30', span: 1 },
      ]
    },
  ]

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
        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#C1622F', marginBottom: '12px'
          }}>
            Form Prediksi
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700,
            color: '#1E1208', lineHeight: 1.2, marginBottom: '12px'
          }}>
            Masukkan Data Restoran
          </h1>
          <p style={{ color: '#7A6550', fontSize: '1rem', lineHeight: 1.7 }}>
            Isi data restoran selengkap mungkin untuk mendapatkan prediksi
            pendapatan yang akurat dari model Supervised Learning.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div style={{
        background: 'white', borderBottom: '1px solid #E8DCCB',
        padding: '14px 64px',
        display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap'
      }}>
        {sections.map((s, i) => (
          <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: `${s.color}15`, border: `1.5px solid ${s.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 700, color: s.color
            }}>
              {i + 1}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#7A6550', fontWeight: 500 }}>
              {s.title}
            </span>
            {i < sections.length - 1 && (
              <div style={{ width: '20px', height: '1px', background: '#E8DCCB', margin: '0 4px' }} />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '40px 48px' }}>
        {sections.map((section) => (
          <div key={section.title} style={{
            background: 'white', borderRadius: '16px',
            padding: '32px', marginBottom: '20px',
            border: '1px solid #E8DCCB',
            boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '4px', height: '100%',
              background: section.color
            }} />
            <div style={{
              fontSize: '0.95rem', fontWeight: 700, color: '#1E1208',
              marginBottom: '24px', paddingBottom: '14px',
              borderBottom: '1px solid #E8DCCB',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <span>{section.icon}</span> {section.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              {section.fields.map((field) => (
                <div key={field.name} style={{ gridColumn: field.span === 2 ? 'span 2' : 'span 1' }}>
                  <label style={{
                    display: 'block', fontSize: '0.8rem', fontWeight: 600,
                    color: '#3A2418', marginBottom: '7px', letterSpacing: '0.02em'
                  }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={{
                      width: '100%', padding: '11px 14px',
                      borderRadius: '8px', border: '1.5px solid #E8DCCB',
                      background: '#FBF6EE', fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.9rem', color: '#1E1208',
                      outline: 'none', transition: 'border-color .2s, background .2s'
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = section.color
                      e.target.style.background = 'white'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#E8DCCB'
                      e.target.style.background = '#FBF6EE'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Submit */}
        <div style={{
          background: 'white', borderRadius: '16px',
          padding: '28px 32px', border: '1px solid #E8DCCB',
          boxShadow: '0 4px 16px rgba(30,18,8,0.04)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '20px'
        }}>
          <div>
            <div style={{ fontWeight: 700, color: '#1E1208', fontSize: '0.95rem', marginBottom: '4px' }}>
              Siap untuk diprediksi?
            </div>
            <div style={{ fontSize: '0.82rem', color: '#7A6550' }}>
              Pastikan semua data sudah terisi dengan benar
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              padding: '14px 36px', background: '#C1622F',
              color: 'white', border: 'none', borderRadius: '10px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.95rem', fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(193,98,47,0.30)',
              transition: 'all .2s'
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
            Analisis & Prediksi →
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputPage