import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  
import './App.css'
import Hub from './components/ui/Hub.jsx'
import Navbar from './components/ui/NavBar.jsx'

function App() {
  return (
    <>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

