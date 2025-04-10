import { useState, useEffect } from 'react';

function Auth({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isBlocked] = useState(document.cookie.includes('giletJaune=true')); // Removed unused setIsBlocked
  const btnStyle = { display: 'block', margin: '20px auto' };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('register') === 'true') {
      setIsRegistering(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      setMessage('Vous êtes certifié Gilet Jaune. Veuillez effacer vos cookies pour réessayer.');
      return;
    }
    proceedWithLogin();
  };

  const proceedWithLogin = async () => {
    const endpoint = isRegistering ? '/register' : '/login';
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage(data.message);
        if (!isRegistering) {
          localStorage.setItem('token', data.token);
          onLogin(data.token);
        }
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="page">
      {isBlocked ? (
        <div>
          <h1>Accès refusé 🚫</h1>
          <p>Vous êtes certifié Gilet Jaune. Veuillez effacer vos cookies pour réessayer.</p>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h1>{isRegistering ? 'Inscription' : 'Connexion'}</h1>
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              style={btnStyle}
            >
              {isRegistering ? "S'inscrire" : 'Se connecter'}
            </button>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              background: 'none',
              color: '#007bff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
            }}
          >
            {isRegistering ? 'Déjà inscrit ? Connectez-vous' : "Pas de compte ? Inscrivez-vous"}
          </button>
          {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Auth;
