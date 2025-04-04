import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    alert("Votre message a été envoyé !");
    setFormData({ name: "", email: "", message: "" }); // Réinitialisation du formulaire
  };

  return (
    <div className="page">
      <h1>Contact</h1>
      <p>Pour toute question, contactez-nous à contact@republiqueimaginaire.com ou via le formulaire ci-dessous :</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message :</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        {/* Conteneur du bouton avec une route circulaire */}
        <div className="button-container">
          <div className="roundabout">
            <div className="road-markings"></div>
            <button type="submit" className="round-button">Envoyer</button>
          </div>
        </div>
      </form>

      <style>
        {`
          .contact-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
          }

          .form-group {
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .form-group label {
            margin-bottom: 5px;
            font-weight: bold;
          }

          .form-group input,
          .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
          }

          .form-group textarea {
            height: 150px;
            resize: vertical;
          }

          .button-container {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 30px;
            margin-bottom: 20px;
          }

          /* Rond-point bien proportionné */
          .roundabout {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #444; /* Asphalte */
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          }

          /* Marques blanches centrées */
          .road-markings {
            position: absolute;
            width: 110px;
            height: 110px;
            border-radius: 50%;
            border: 4px dashed white; /* Lignes de route */
            box-sizing: border-box;
          }

          /* Bouton circulaire au centre */
          .round-button {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            border: none;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s, transform 0.2s;
            z-index: 10;
          }

          .round-button:hover {
            background-color: #d32f2f;
            transform: scale(1.05);
          }

          .round-button:active {
            transform: scale(0.95);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </div>
  );
}

export default Contact;