import React from 'react';
import './InfoModal.css';

function InfoModal({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal">
        <h2 className="info-modal-title">{title}</h2>
        <div></div>
        <p className="info-modal-message">{message}</p>
        <button className="info-modal-close" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
