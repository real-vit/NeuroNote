import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  
import './App.css'
import Hub from './components/ui/Hub.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
      </Routes>
    </Router>
  )
}

export default App

