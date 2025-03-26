import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Leader from './pages/Leader';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="banner">
          <span>Bienvenue dans la République Imaginaire</span>
        </div>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/contact">Contact</Link> | <Link to="/auth">Authentification</Link> | <Link to="/leader">Notre Leader</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/leader" element={<Leader />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
