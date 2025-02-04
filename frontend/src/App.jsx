import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Hub from './components/ui/Hub.jsx';
import Login from './components/ui/Login.jsx';
import Canvas from './components/ui/Canvas.jsx';
import Register from './components/ui/Register.jsx';
import CollaborationLanding from "./components/ui/collaborations-landing.jsx";
import Collabs from "./components/ui/collaborations.jsx";
import SearchPage from './components/ui/Search.jsx';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/canvas" element={<Canvas />} />
         <Route path="/collaborations" element={<CollaborationLanding />} />
         <Route path="/collab-canvas" element={<Collabs />} />
         <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
