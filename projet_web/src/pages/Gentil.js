import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Gentil()  {

    return (
        <div className="Gilet_jeune_Verif">
            <button onClick={() => window.location.reload()} className="button-succes">
                        Continuer vers l'inscription
            </button>

        </div>

    )
}

export default  Gentil;