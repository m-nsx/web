import './App.css';
import { Routes, Route, Link } from 'react-router-dom'; // Removed useNavigate as unused
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

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isBlocked] = useState(document.cookie.includes('giletJaune=true')); // Removed setIsBlocked

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
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
            <span>Bienvenue au le Royaume Giratoire de France</span>
          </div>
          <nav>
            <Link to="/">Accueil</Link> | <Link to="/contact">Contact</Link> | <Link to="/leader">Notre Leader</Link>
            {!token && <> | <Link to="/questionnaire">Authentification</Link></>}
            {token && <>
              | <Link to="/vote">Vote</Link> | <Link to="/votes-management">Gestion des Votes</Link> | <Link to="/account">Mon Compte</Link>
              <button onClick={handleLogout}>Déconnexion</button>
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
