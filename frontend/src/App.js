import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Leader from './pages/Leader';
import Vote from './pages/Vote';
import VotesManagement from './pages/VotesManagement';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="banner">
          <span>Bienvenue dans la République Imaginaire</span>
        </div>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/contact">Contact</Link> | <Link to="/auth">Authentification</Link> | <Link to="/leader">Notre Leader</Link> | <Link to="/vote">Vote</Link> | <Link to="/votes-management">Gestion des Votes</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/leader" element={<Leader />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/votes-management" element={<VotesManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
