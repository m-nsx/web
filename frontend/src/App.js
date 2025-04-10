import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Vote from './pages/Vote';
import VotesManagement from './pages/VotesManagement';
import Account from './pages/Account';
import Leader from './pages/Leader';
import Questionnaire from './pages/Questionnaire';
import Gentil from './pages/Gentil';
import Mechant from './pages/Mechant';

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isBlocked] = useState(document.cookie.includes('giletJaune=true'));
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    setToken(newToken);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const handleAuthClick = () => {
    if (document.cookie.includes('alreadyAnswered=true')) {
      navigate('/auth');
    } else {
      navigate('/questionnaire');
    }
  };

  return (
    <div className="App">
      {isBlocked && (
        <div className="block-screen">
          <h1>Accès refusé 🚫</h1>
          <p>
            Vous êtes certifié Gilet Jaune. <br />
            La République Imaginaire ne peut pas tolérer cela ! 😤
          </p>
          <img src="/images/no-access.png" alt="No Access" />
        </div>
      )}
      {!isBlocked && (
        <>
          <div className="banner">
            <span>Bienvenue au Royaume Giratoire de France</span>
          </div>
          <nav>
            <button onClick={() => navigate('/')} className="nav-button">Accueil</button> | 
            <button onClick={() => navigate('/contact')} className="nav-button">Contact</button> | 
            <button onClick={() => navigate('/leader')} className="nav-button">Notre Leader</button>
            {!token && <> | <button onClick={handleAuthClick} className="nav-button">Authentification</button></>}
            {token && <>
              | <button onClick={() => navigate('/vote')} className="nav-button">Vote</button> | 
              <button onClick={() => navigate('/votes-management')} className="nav-button">Gestion des Votes</button> | 
              <button onClick={() => navigate('/account')} className="nav-button">Mon Compte</button> | 
              <button onClick={handleLogout} className="nav-button">Déconnexion</button>
            </>}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/gentil" element={<Gentil />} />
            <Route path="/mechant" element={<Mechant />} />
            {token && <Route path="/vote" element={<Vote />} />}
            {token && <Route path="/votes-management" element={<VotesManagement />} />}
            {token && <Route path="/account" element={<Account />} />}
            <Route path="/leader" element={<Leader />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;