import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import InputPage from './pages/InputPage'
import PredictionPage from './pages/PredictionPage'
import AboutPage from './pages/AboutPage'
import InsightPage from './pages/InsightPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insight" element={<InsightPage />} />
      </Routes>
    </>
  )
}

export default App