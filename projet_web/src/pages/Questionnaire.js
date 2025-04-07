import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Questionnaire.css';

function Questionnaire()  {

    // Variables
    const navigate = useNavigate();
    const [reponse, setReponse] = useState({"q1":null, "q2":null, "q3":null, "q4":null, "q5":null});
    const [score, setScore] = useState(null);
    const [erreur, setErreur] = useState("");

    // Fonctions
    const ChangerValeur = (question, valeur) => {
        setReponse(prevReponse => {
            const newReponse = { ...prevReponse, [question]: valeur };
            CalculerScore(newReponse);
            return newReponse;
        })
    }

    const CalculerScore = (updatedReponse) => {
        const newScore = Object.values(updatedReponse).reduce((acc, val) => acc + val, 0);
        setScore(newScore);
    }


    const AfficherResultat = () => {
        const questionsRepondues = {q1: false, q2: false, q3: false, q4: false, q5: false};
        
        // Marquer chaque question comme répondue ou non
        Object.keys(reponse).forEach(key => {
            if (reponse[key] !== null) {
                questionsRepondues[key] = true;
            }
        });
        
        // Vérifier si toutes les questions sont répondues
        const toutesQuestionsRepondues = Object.values(questionsRepondues).every(val => val === true);
    
        if (!toutesQuestionsRepondues) {
            setErreur("Veuillez répondre à toutes les questions !");
            return;
        }
    
        setErreur("");
        if (score >= 3) {
            navigate('/Mechant');  // Page pour les gilets jaunes
        } else {
            navigate('/Gentil');  // Page pour les non gilets jaunes
        }
    }


    //Affichage

    return (
         
        <div 
            className="questionnaire-container"
            style={{
            backgroundImage: `url('/point_interrogation.jpg')`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            }}>

            <div className="questionnaire">
                <form>
                    <div className="Titre">
                        <div className="titre-content">
                            <div className="titre-header">
                                <h1>Questionnaire</h1>
                                <img 
                                    src="/Logo-gilet-jaune.png" 
                                    alt="Gilet Jaune" 
                                    className="titre-image"
                                />
                            </div>
                            <p>Réponds à ces questions d'une importance capitale avant de rejoindre notre nation.</p>
                        </div>
                    </div>
                    
                    <h1>{score}</h1>

                    {/* Question 1 */}
                    <div className="question">
                    <p>Trouvez-vous qu'il y a trop de ronds points en France ?</p>
                        <label>                            
                            <input type="radio" name="q1" onClick={() => ChangerValeur("q1",2)} required />
                            Oui
                        </label>
                        
                        <label>                            
                            <input type="radio" name="q1" onClick={() => ChangerValeur("q1",-3)} required />
                            Non
                        </label>

                        <label>                            
                            <input type="radio" name="q1" onClick={() => ChangerValeur("q1",1)} required />
                            Sans avis
                        </label>
                    </div>
                    


                    {/* Question 2 */}
                    <div className="question">
                        <p>Trouvez-vous que les prix des carburants sont trop élevés et devraient être davantage régulés par l'État ?</p>
                        <label>                            
                            <input type="radio" name="q2" onClick={() => ChangerValeur("q2",2)} required />
                            Oui
                        </label>
                        
                        <label>
                            <input type="radio" name="q2" onClick={() => ChangerValeur("q2",0)} required />
                            Non
                        </label>

                        <label>
                            <input type="radio" name="q2" onClick={() => ChangerValeur("q2",1)} required />
                            Sans avis
                        </label>
                    </div>
                    

                    {/* Question 3 */}
                    <div className="question">
                        <p>Avez-vous déjà soutenu le mouvement des gilets jaunes sur les réseaux sociaux ou en signant une pétition ?</p>
                        <label>                            
                            <input type="radio" name="q3" onClick={() => ChangerValeur("q3",5)} required />
                            Oui
                        </label>
                        
                        <label>                            
                            <input type="radio" name="q3" onClick={() => ChangerValeur("q3",0)} required />
                            Non
                        </label>

                        <label>                            
                            <input type="radio" name="q3" onClick={() => ChangerValeur("q3",2)} required />
                            J'y ai pensé
                        </label>
                    </div>
                    


                    {/* Question 4 */}
                    <div className="question">
                        <p>Quand on vous dit "Macron", quel est le premier mot qui vous vient à la tête ?</p>
                        <label>
                            <input type="radio" name="q4" onClick={() => ChangerValeur("q4",0)} required />
                            Président de la Cinquième Répulique Française
                        </label>
                        
                        <label>            
                            <input type="radio" name="q4" onClick={() => ChangerValeur("q4",4)} required />
                            Explosion
                            <img 
                                    src="/explosion mini.png" 
                                    alt="Explosion.png" 
                                    className="mini-explosion-image"
                                />
                        </label>

                        <label>                            
                            <input type="radio" name="q4" onClick={() => ChangerValeur("q4",3)} required />
                            Dictateur
                        </label>

                    </div>

                    {/* Question 5 */}
                    <div className="question">
                        <p>Avez-vous déjà bloqué un rond point en tant que gilet jaune ?</p>
                        <label>
                            <input type="radio" name="q5" onClick={() => ChangerValeur("q5",10000000)} required />
                            Oui
                        </label>
                        
                        <label>                            
                            <input type="radio" name="q5" onClick={() => ChangerValeur("q5",0)} required />
                            Non
                        </label>
                    </div>

                </form>

                {erreur && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{erreur}</p>}
                <button onClick={AfficherResultat}>Voir mon résultat</button>   

            </div>

        </div>
        
    )
}


export default  Questionnaire;