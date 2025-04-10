import { useState } from 'react';
import './Account.css';
import ConfirmModal from '../components/ConfirmModal';
import InfoModal from '../components/InfoModal';

function Account() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');
  const [infoModalMessage, setInfoModalMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setInfoModalTitle('Erreur');
      setInfoModalMessage('Vous devez être connecté.');
      setIsInfoModalOpen(true);
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
      if (!data.error) {
        setInfoModalTitle('Mise à jour réussie');
        setInfoModalMessage('Mot de passe mis à jour avec succès.');
      } else {
        setInfoModalTitle('Erreur');
        setInfoModalMessage('Échec de la mise à jour du mot de passe.');
      }
      setIsInfoModalOpen(true);
    } catch (error) {
      setInfoModalTitle('Erreur');
      setInfoModalMessage('Une erreur est survenue lors de la mise à jour du mot de passe.');
      setIsInfoModalOpen(true);
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
        setIsModalOpen(false);
        setIsInfoModalOpen(true);
      } else {
        setMessage('Échec de la suppression du compte.');
      }
    } catch (error) {
      setMessage('Une erreur est survenue lors de la suppression du compte.');
    }
  };

  return (
    <div className="page">
      <div className="card">
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
          onClick={() => setIsModalOpen(true)}
          className="delete-button"
        >
          Supprimer mon compte
        </button>
        {message && <p className="message">{message}</p>}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        title="Supprimer le compte"
        message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        onConfirm={() => {
          handleAccountDeletion();
          setIsModalOpen(false);
          setIsInfoModalOpen(true);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        title={infoModalTitle}
        message={infoModalMessage}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}

export default Account;
