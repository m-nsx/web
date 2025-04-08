import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Vote from './pages/Vote';
import VotesManagement from './pages/VotesManagement';
import Account from './pages/Account';
import Leader from './pages/Leader';
import Questionnaire from './pages/Questionnaire'; // Import du questionnaire
import Gentil from './pages/Gentil'; // Import de la page Gentil
import Mechant from './pages/Mechant'; // Import de la page Mechant
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Utilisez la présence du cookie pour déterminer si l'utilisateur est "méchant"
  const isBlocked = document.cookie.includes('giletJaune=true');
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Si l'utilisateur est "méchant", toujours afficher la page Mechant
  if (isBlocked) {
    return <Mechant />;
  }

  return (
    <div className="App">
      <div className="banner">
        <span>Bienvenue dans la République Imaginaire</span>
      </div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/leader">Notre Leader</Link>
        {/* Removed game link */}
        {!token && (
          <Link to="/questionnaire" style={{ color: 'blue', textDecoration: 'underline' }}>
            Authentification
          </Link>
        )}
        {token && (
          <>
            <Link to="/vote">Vote</Link>
            <Link to="/votes-management">Gestion des Votes</Link>
            <Link to="/account">Mon Compte</Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '1.2em',
                fontWeight: 'bold',
                marginLeft: '20px'
              }}
            >
              Déconnexion
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
        <Route path="/questionnaire" element={<Questionnaire />} /> {/* Route pour le questionnaire */}
        <Route path="/gentil" element={<Gentil />} /> {/* Route pour la page Gentil */}
        <Route path="/mechant" element={<Mechant />} /> {/* Route pour la page Mechant */}
        {token && <Route path="/vote" element={<Vote />} />}
        {token && <Route path="/votes-management" element={<VotesManagement />} />}
        {token && <Route path="/account" element={<Account />} />}
        <Route path="/leader" element={<Leader />} />
        {/* Removed game route */}
      </Routes>
    </div>
  );
}

export default App;
