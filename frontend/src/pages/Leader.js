import React from 'react';
import './Leader.css';

function Leader() {
  return (
    <div className="page leader-page">
      <div className="header-banner">
        <div className="stars-left">★★★</div>
        <h1>Notre Grand Leader</h1>
        <div className="stars-right">★★★</div>
      </div>
      
      <div className="leader-portrait-container">
        <div className="portrait-frame">
          <img 
            src="/champs_elysees.jpg"  
            alt="Place de l'Étoile - Rond-point des Champs-Élysées" 
            className="leader-portrait"
          />
          <p className="image-caption">Le Glorieux Rond-Point des Champs-Élysées - L'essence même de notre Leader</p>
        </div>
        <div className="medal-decoration left"></div>
        <div className="medal-decoration right"></div>
      </div>
      
      <div className="quote-container">
        <blockquote>
          "La circulation des idées doit être aussi fluide que le trafic sur un rond-point bien conçu."
          <cite>- Notre Grand Leader Rond-Point</cite>
        </blockquote>
      </div>
      
      <div className="leader-description">
        <p className="main-text">
          Le Grand Rond-Point est la structure qui guide notre République Imaginaire. 
          Sous sa direction circulaire, nous tournons sans cesse vers des sommets inégalés de prospérité et d'unité.
          Sa forme parfaitement concentrique et sa vision à 360° ont transformé notre humble nation en une utopie où les véhicules et les idées convergent harmonieusement.
        </p>
        
        <div className="facts-section">
          <h2>Faits glorieux sur notre Leader Rond-Point</h2>
          <ul className="achievements-list">
            <li>Peut accueillir jusqu'à 12 avenues et boulevards à la fois</li>
            <li>A survécu à des millions de touristes désorientés sans perdre sa circularité</li>
            <li>Inspire quotidiennement des milliers de coups de klaxon en son honneur</li>
            <li>Reste imperturbable face aux embouteillages les plus chaotiques</li>
            <li>A vu plus d'accidents évités que n'importe quel feu tricolore</li>
          </ul>
        </div>
        
        <div className="recommendation">
          <p>
            Nous vous conseillons grandement de positioner dans votre salon, ainsi que dans toutes les pièces de votre logement, 
            des maquettes de notre grand Leader Rond-Point, pour pouvoir l'honorer dans tous les instants du quotidien !
          </p>
          <p className="bonus-text">
            Pour votre confort, notre ministère de la Circulation vous propose désormais des mini rond-points
            pour vos tables à manger, des rond-points lumineux pour vos entrées, et des rond-points miniatures
            pour décorer vos étagères !
          </p>
        </div>
      </div>
      
      <div className="testimonials">
        <h2>Témoignages de conducteurs reconnaissants</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            "Depuis que j'ai installé une maquette du Rond-Point dans ma voiture, je ne fais plus jamais d'erreur de priorité !" <br />
            <span className="citizen-name">- Conducteur #45982</span>
          </div>
          <div className="testimonial">
            "Mon GPS a dit 'Gloire au Rond-Point' au lieu de 'Tournez à droite'. J'ai pleuré d'émotion !" <br />
            <span className="citizen-name">- Conducteur #12304</span>
          </div>
          <div className="testimonial">
            "J'ai fait 17 tours complets du Rond-Point un samedi matin. Une expérience spirituelle inoubliable !" <br />
            <span className="citizen-name">- Conducteur #78651</span>
          </div>
        </div>
      </div>
      
      <div className="daily-ritual">
        <h2>Rituel quotidien de circulation</h2>
        <ol>
          <li>Réveil en tournant trois fois sur soi-même (5:30 précises)</li>
          <li>Petit-déjeuner servi en forme circulaire</li>
          <li>Contemplation de votre maquette du Rond-Point (15 minutes minimum)</li>
          <li>Exercice quotidien : faire le tour de votre table basse 12 fois</li>
          <li>Avant de dormir, murmurer "Priorité à droite" trois fois face à l'image du Rond-Point</li>
        </ol>
      </div>

      <div className="footer-banner">
        <p>République Imaginaire - En perpétuelle circulation depuis l'Année Glorieuse 42</p>
      </div>
    </div>
  );
}

export default Leader;
