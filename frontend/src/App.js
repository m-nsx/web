import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Leader from './pages/Leader';
import Vote from './pages/Vote';
import VotesManagement from './pages/VotesManagement';
import Account from './pages/Account';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <div className="banner">
          <span>Bienvenue dans la République Imaginaire</span>
        </div>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/contact">Contact</Link> | <Link to="/leader">Notre Leader</Link> |{' '}
          {!token ? (
            <Link to="/auth">Authentification</Link>
          ) : (
            <>
              <Link to="/vote">Vote</Link> | <Link to="/votes-management">Gestion des Votes</Link> |{' '}
              <Link to="/account">Mon Compte</Link> |{' '}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
                Déconnexion
              </button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leader" element={<Leader />} />
          <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
          {token && <Route path="/vote" element={<Vote />} />}
          {token && <Route path="/votes-management" element={<VotesManagement />} />}
          {token && <Route path="/account" element={<Account />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
