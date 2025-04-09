import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Gentil.css"

function Gentil()  {
  const navigate = useNavigate();

  return (
    <div
      className="Pas_Gilet_Jaune"
      style={{
        backgroundImage: `url('/fond_coeur.png')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >   
      <div className="titre-container" style={{ position: 'relative' }}>
        <img 
          src="/titre_bravo.png" 
          alt="titre_bravo.png" 
          className="titre_bravo"
        />
        <img 
          src="/emoji_pouce.png" 
          alt="emoji_pouce.png" 
          className="emoji_pouce"
        />
      </div>

      <div className="macron-container" style={{ position: 'relative' }}>
        <img 
          src="/macron_heureux.png" 
          alt="macron_heureux.png" 
          className="macron_heureux"
        />
        <img 
          src="/marcon popelup.png" 
          alt="macron_popelup.png" 
          className="macron_popelup"
        />
      </div> 
      <button onClick={() => navigate('/auth')} className="button-succes">
        Continuer vers l'inscription
      </button>
    </div>
  );
}

export default Gentil;