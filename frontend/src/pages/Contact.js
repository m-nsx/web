import { useState } from "react";
import "./Contact.css"; // Import external CSS file

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
      <div></div>
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
    </div>
  );
}

export default Contact;