import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Canvas from './components/ui/Canvas.jsx';
import { Routes } from 'react-router-dom';
import Navbar from './components/ui/NavBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar/>
    <App/>
  </StrictMode>
);

