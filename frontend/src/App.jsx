import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {UrlShortener} from './components/UrlShortener.jsx'
import StatsPage from './components/StatsPage.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <Routes>
          <Route path="/" element={<UrlShortener />} />
          <Route path="/stats/:code" element={<StatsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App