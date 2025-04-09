import './Home.css';
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {
    
    return (
        <div className="page">

            <div className="container titre" style={{ position: 'relative' }}>
                <h1>Bienvenue au Rondistan</h1>
                <p>Le Rondistan, une nation unique où les ronds-points sont au cœur de notre identité.</p>
            </div>

            <div className="container introduction" style={{ position: 'relative' }}>
                <h2>Introduction</h2>
                <p>Découvrez notre histoire, nos valeurs et ce qui fait de notre nation un endroit si spécial.</p>
                <span className="nombre-rond-points">42 986</span>

            </div>


            <div className="container symboles_nationaux" style={{ position: 'relative' }}>
            <h2>Nos symboles nationaux</h2>
            <p>Le gilet jaune, le rond-point et la solidarité sont les piliers de notre culture.</p>
            <div className="images-container">
                <div className="image-item">
                    <h3 className="image-title">Le Drapeau</h3>
                    <div className="image-content">
                        <img 
                            src="/Drapeau.jpg" 
                            alt="Drapeau" 
                            className="drapeau"
                        />
                        <div className="image-text">
                            <p>Le drapeau représente l'identité nationale du Rondistan, symbole de fierté et d'unité.</p>
                        </div>
                    </div>
                </div>
                <div className="image-item">
                    <h3 className="image-title">La Devise Rond</h3>
                    <div className="image-content">
                        <img 
                            src="/devise rond.png" 
                            alt="Devise Rond" 
                            className="devise-rond"
                        />
                        <div className="image-text">
                            <p>La devise rond incarne la solidarité et l'esprit communautaire de notre nation.</p>
                        </div>
                    </div>
                </div>
                <div className="image-item">
                    <h3 className="image-title">La Devise</h3>
                    <div className="image-content">
                        <img 
                            src="/devise.png" 
                            alt="Devise" 
                            className="devise"
                        />
                        <div className="image-text">
                            <p>Notre devise reflète nos valeurs fondamentales et notre engagement envers le progrès.</p>
                        </div>
                    </div>
                </div>
            </div>

            <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
            ></iframe>
            
            </div>

            <div className="container regime" style={{ position: 'relative' }}>
                <h2>Régime</h2>
                <p>Notre régime est basé sur la démocratie participative, où chaque voix compte.</p>
                <img 
                        src="/macron prince.png" 
                        alt="macron prince.png" 
                        className="macron-prince"
                />
            </div>
            

            <div className="container enemies">
                <h2>Notre plus grand ennemi</h2>
                <p>Les embouteillages et les taxes excessives sont nos principaux adversaires.</p>
                <p>Les embouteillages et les taxes excessives sont nos principaux adversaires.</p>
            </div>
        </div>
    );
}

export default Home;