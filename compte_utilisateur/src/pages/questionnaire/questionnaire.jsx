import React from 'react';
import { useState } from "react";

function Questionnaire()  {

    const [score, setScore] = useState(0);
    const [resultat, setResultat] = useState("")

    const AjouterScore = (valeur) => {
        setScore(prevScore => prevScore + valeur);
    }

    const AfficherResultat = () => {
        if (score >= 10) {
            setResultat("Tu es un  Gilet Jaune ! Sors de ce pays !!!");
        } 
        else {
            setResultat("tout va bien, tu peux venir dans notre pays, tu es le bienvenu");
        }

    }


    return (
        <div className="questionnaire">
            <form>

                {/* Question 1 */}
                <p>Question 1</p>
                <label>
                    Option 1
                    <input type="radio" name="q1" onChange={() => AjouterScore(1)} required />
                </label>
                
                <label>
                    Option 2
                    <input type="radio" name="q1" onChange={() => AjouterScore(1)} required />
                </label>


                {/* Question 2 */}
                <p>Question 2</p>
                <label>
                    Option 1
                    <input type="radio" name="q2" onChange={() => AjouterScore(1)} required />
                </label>
                
                <label>
                    Option 2
                    <input type="radio" name="q2" onChange={() => AjouterScore(1)} required />
                </label>


                {/* Question 3 */}
                <p>Question 3</p>
                <label>
                    Option 1
                    <input type="radio" name="q3" onChange={() => AjouterScore(1)} required />
                </label>
                
                <label>
                    Option 2
                    <input type="radio" name="q3" onChange={() => AjouterScore(1)} required />
                </label>


                {/* Question 4 */}
                <p>Question 4</p>
                <label>
                    Option 1
                    <input type="radio" name="q4" onChange={() => AjouterScore(1)} required />
                </label>
                
                <label>
                    Option 2
                    <input type="radio" name="q4" onChange={() => AjouterScore(1)} required />
                </label>


                {/* Question 5 */}
                <p>Question 5</p>
                <label>
                    Option 1
                    <input type="radio" name="q5" onChange={() => AjouterScore(1)} required />
                </label>
                
                <label>
                    Option 2
                    <input type="radio" name="q5" onChange={() => AjouterScore(1)} required />
                </label>

            </form>

            <button onClick={AfficherResultat}>Voir mon résultat</button>   

            {/* Affichage du resultat */}
            {resultat && <p><strong>{resultat}</strong></p>}         
        </div>
    )
}


export default  Questionnaire;