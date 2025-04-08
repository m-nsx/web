import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AntiGiletJaune.css';

function AntiGiletJaune() {
  const navigate = useNavigate();

  const handleResponse = (response) => {
    if (response === 'yes') {
      document.cookie = 'giletJaune=true; path=/; max-age=31536000'; // Bloque l'utilisateur pendant 1 an
      alert('Vous êtes certifié Gilet Jaune. Accès refusé.');
      navigate('/'); // Redirige vers la page d'accueil
    } else {
      alert('Merci pour votre réponse. Vous pouvez maintenant vous connecter.');
      navigate('/auth'); // Redirige vers la page d'authentification
    }
  };

  return (
    <div className="anti-gilet-jaune">
      <h1>Questionnaire Anti-Gilet Jaune</h1>
      <p>Êtes-vous un gilet jaune ? 🤔</p>
      <button onClick={() => handleResponse('yes')}>Oui, je le suis !</button>
      <button onClick={() => handleResponse('no')}>Non, jamais !</button>
    </div>
  );
}

export default AntiGiletJaune;
