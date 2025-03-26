import React from 'react';
import './auth.css'

const Login = () => {
    return (
        <div className="authentification">
            <form>
                //Identifiant
                <div className="identifiant">
                    
                    <input type="text" placeholder="Identifiant" ></input>
                </div>

                //Mot de passe
                <div className="mdp">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password"></input>
                </div>




                //Bouton
                <div className="group">
                    <button>Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default Login;