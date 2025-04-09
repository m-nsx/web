import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api';

function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(document.cookie.includes('giletJaune=true'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      setMessage('Vous êtes bloqué en raison de votre certification Gilet Jaune.');
      return;
    }
    proceedWithLogin();
  };

  const proceedWithLogin = async () => {
    try {
      const data = isRegistering
        ? await registerUser({ username, password })
        : await loginUser({ username, password });

      console.log('Backend response:', data); // Log backend response

      if (data.error) {
        console.error('Error from backend:', data.error); // Log backend error
        setMessage("DATA ERROR: " + data.error);
      } else {
        setMessage("DATA MESSAGE: " + data.message);
        if (!isRegistering) {
          localStorage.setItem('token', data.token);
          onLogin(data.token);
          navigate('/'); // Redirect directly to home
        }
      }
    } catch (error) {
      console.error('Error during authentication:', error.message); // Log error
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="page" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {isBlocked ? (
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Accès refusé 🚫</h1>
          <p style={{ fontFamily: 'Poppins, sans-serif' }}>
            Vous êtes certifié Gilet Jaune. Veuillez effacer vos cookies pour réessayer.
          </p>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>
          <h1>{isRegistering ? 'Inscription' : 'Connexion'}</h1>
          <form onSubmit={handleSubmit} style={{ fontFamily: 'Poppins, sans-serif' }}>
            <label>
              Nom d'utilisateur:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Mot de passe:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit">{isRegistering ? "S'inscrire" : 'Se connecter'}</button>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              background: 'none',
              color: '#007bff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {isRegistering ? 'Déjà inscrit ? Connectez-vous' : "Pas de compte ? Inscrivez-vous"}
          </button>
          {message && <p style={{ color: 'red', fontFamily: 'Poppins, sans-serif' }}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Auth;
