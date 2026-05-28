import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import InputPage from './pages/InputPage'
import PredictionPage from './pages/PredictionPage'
import AboutPage from './pages/AboutPage'
<<<<<<< HEAD
=======
import InsightPage from './pages/InsightPage'
>>>>>>> feat/frontend-vika

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/about" element={<AboutPage />} />
<<<<<<< HEAD
=======
        <Route path="/insight" element={<InsightPage />} />
>>>>>>> feat/frontend-vika
      </Routes>
    </>
  )
}

export default App