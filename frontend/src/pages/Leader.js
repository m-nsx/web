import React from 'react';

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

      <style>
        {`
          .leader-page {
            text-align: center;
            padding: 20px;
            background-color: #f9f2e7;
            color: #333;
            font-family: 'Arial', sans-serif;
            max-width: 900px;
            margin: 0 auto;
          }
          
          .header-banner {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
          }
          
          .header-banner h1 {
            font-size: 2.5rem;
            color: #b22222;
            margin: 0 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .stars-left, .stars-right {
            font-size: 2rem;
            color: gold;
          }
          
          .leader-portrait-container {
            position: relative;
            margin: 0 auto;
            width: fit-content;
            margin-bottom: 40px;
          }
          
          .portrait-frame {
            border: 10px solid gold;
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.6);
            width: fit-content;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            background: radial-gradient(circle, #fff9e5, #ffe066);
            padding: 10px;
          }
          
          .leader-portrait {
            display: block;
            width: 100%;
            max-width: 600px;
            height: auto;
          }
          
          .image-caption {
            font-style: italic;
            font-size: 0.9rem;
            margin-top: 8px;
            margin-bottom: 0;
            color: #555;
          }
          
          .medal-decoration {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: #b22222;
            border-radius: 50%;
            border: 5px solid gold;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
          }
          
          .medal-decoration.left {
            left: -30px;
          }
          
          .medal-decoration.right {
            right: -30px;
          }
          
          .quote-container {
            margin: 30px auto;
            max-width: 700px;
          }
          
          blockquote {
            font-style: italic;
            font-size: 1.3rem;
            line-height: 1.6;
            color: #555;
            border-left: 5px solid #b22222;
            padding-left: 20px;
            margin-left: 0;
            background-color: rgba(255, 255, 255, 0.6);
            padding: 15px;
            border-radius: 5px;
          }
          
          cite {
            display: block;
            text-align: right;
            font-weight: bold;
            color: #b22222;
            margin-top: 10px;
          }
          
          .leader-description {
            margin-bottom: 30px;
          }
          
          .main-text {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          h2 {
            color: #b22222;
            border-bottom: 2px solid gold;
            display: inline-block;
            padding-bottom: 5px;
            margin-bottom: 20px;
          }
          
          .achievements-list {
            list-style-type: none;
            padding: 0;
            max-width: 600px;
            margin: 0 auto 30px;
          }
          
          .achievements-list li {
            padding: 8px 15px;
            margin-bottom: 10px;
            background-color: rgba(255, 215, 0, 0.1);
            border-left: 3px solid gold;
            text-align: left;
            border-radius: 3px;
          }
          
          .recommendation {
            background-color: rgba(178, 34, 34, 0.1);
            padding: 20px;
            border-radius: 8px;
            max-width: 700px;
            margin: 0 auto 40px;
          }
          
          .bonus-text {
            font-style: italic;
            font-size: 0.95rem;
          }
          
          .testimonials {
            margin-bottom: 40px;
          }
          
          .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }
          
          .testimonial {
            background-color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            font-style: italic;
            text-align: left;
          }
          
          .citizen-name {
            display: block;
            font-weight: bold;
            font-style: normal;
            text-align: right;
            margin-top: 10px;
            color: #b22222;
          }
          
          .daily-ritual {
            background-color: rgba(255, 215, 0, 0.1);
            padding: 20px;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto 30px;
          }
          
          .daily-ritual ol {
            text-align: left;
            padding-left: 30px;
          }
          
          .daily-ritual li {
            margin-bottom: 10px;
          }
          
          .footer-banner {
            background-color: #b22222;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 40px;
          }
        `}
      </style>
    </div>
  );
}

export default Leader;
