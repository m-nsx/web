import React from 'react';
import './Mechant.css';

function Mechant()  {

    return (
        
        <div className="Gilet_jeune_Verif">
            <img 
                        src="/titre_gilet_jaune.png" 
                        alt="titre_gilet_jaune.png" 
                        className="titre_gilet_jaune"
            />
            <div className="macron-container" style={{ position: 'relative' }}>
                <img 
                    src="/macron demoniaque cadre.png" 
                    alt="Macron Demoniaque" 
                    className="macron_demoniaque"
                />
                <img 
                    src="/girophare rouge.gif" 
                    alt="Girouphare Rouge" 
                    className="girophare_rouge_1"
                />
                <img 
                    src="/girophare rouge.gif" 
                    alt="Girouphare Rouge" 
                    className="girophare_rouge_2"
                />
                <img 
                    src="/macron dark max.png" 
                    alt="Macron Dark" 
                    className="macron_dark_1"
                />
                <img 
                    src="/macron dark max.png" 
                    alt="Macron Dark" 
                    className="macron_dark_2"
                />
            </div>
            
            <button onClick={() => window.location.reload()} className="button-danger">
                On ne veut pas de vous dans notre pays !
            </button>

        </div>

    )
}

export default  Mechant;
