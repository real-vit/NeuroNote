import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hub from './components/ui/Hub.jsx';
import Login from './components/ui/Login.jsx';
import Canvas from './components/ui/Canvas.jsx';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/login" element={<Login />} />
         <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}

export default App;
