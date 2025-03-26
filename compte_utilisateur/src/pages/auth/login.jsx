import React from 'react';
import './auth.css'

const Login = () => {
    return (
        <form>
            //Identifiant
            <div className="group">
                <label htmlFor="login">Identifiant</label>
                <input type="text" placeholder="login"></input>
            </div>

            //Mot de passe
            <div className="group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" placeholder="Mot de passe"></input>
            </div>

            //Bouton
            <div className="group">
                <button>Connexion</button>
            </div>
        </form>
    );
};

export default Login;