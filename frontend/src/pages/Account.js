import { useState } from 'react';

function Account() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/account/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Password update failed.');
    } catch (error) {
      setMessage('An error occurred while updating the password.');
    }
  };

  const handleAccountDeletion = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/account', {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      if (!data.error) {
        localStorage.removeItem('token');
        window.location.href = '/';
      } else {
        setMessage(data.error || 'Account deletion failed.');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the account.');
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h1>Mon Compte</h1>
        <form onSubmit={handlePasswordChange}>
          <label>
            Ancien mot de passe:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>
          <label>
            Nouveau mot de passe:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <button type="submit">Modifier le mot de passe</button>
        </form>
        <button
          onClick={handleAccountDeletion}
          style={{
            marginTop: '20px',
            backgroundColor: '#b22222',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '50px',
          }}
        >
          Supprimer mon compte
        </button>
        {message && <p style={{ color: 'red' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Account;
