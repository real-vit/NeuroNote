import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hub from './components/ui/Hub.jsx';
import Login from './components/ui/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
