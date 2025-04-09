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
                            <div className="text-box">
                                <ul>
                                    <p>Le drapeau officiel du Royaume Giratoire de France est une représentation forte et symbolique de l'identité nationale, de la souveraineté territoriale et des valeurs fondatrices de l'État.</p>
                                    <br/>
                                    <li><p><b>Le symbole central : le rond-point</b></p></li>
                                    <p>Au centre du drapeau se trouve un rond-point parfaitement circulaire, bordé de routes à quatre branches. Ce motif incarne la structure fondamentale du territoire national, chaque giratoire étant une parcelle sacrée du royaume.
                                    Le rond-point représente la stabilité dans le mouvement, le pouvoir centralisé et la circulation harmonieuse des idées, des citoyens et des véhicules sous l'autorité du Prince.</p>
                                    <br/>
                                    <li><p><b>Le cercle vert : le cœur fertile de la nation</b></p></li>
                                    <p>Le centre vert symbolise la vie, la prospérité et la paix civile. Il rappelle les nombreux ronds-points fleuris, entretenus avec soin par les services royaux. C'est également une référence écologique : le giratoire, par sa nature, réduit les accidents et fluidifie la circulation, respectant ainsi l'ordre naturel du trafic.</p>
                                    <br/>
                                    <li><p><b>Les zones bleues : la souveraineté</b></p></li>
                                    <p>Les quatre coins bleus représentent les quatre points cardinaux du Royaume Giratoire, chacun régi par un Préfet du Rond Central. Le bleu est la couleur de la majesté, de l'unité et de la surveillance permanente. Il évoque aussi la route elle-même, cadrée, encadrée et protégée.</p>
                                    <br/>
                                    <li><p><b>Les zones blanches : la paix et la conformité</b></p></li>
                                    <p>Les champs blancs entre les zones bleues incarnent la neutralité de l'ordre établi, la conformité à la rotation, et la paix imposée par le régime circulaire.
                                    Elles sont les zones tampons où toute perturbation — notamment jaune — est strictement interdite.</p>
                                    <br/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="image-item">
                    <h3 className="image-title">Notre Devise : Circuation . Rotation . Union</h3>
                    <div className="image-content">
                    
                        <div className="image-text">
                            <div className="text-box">
                                <ul>
                                    <li><p><b>Circulation</b></p></li>
                                    <p>La circulation représente le mouvement perpétuel de la société. Elle est à la fois physique avec la circulation des véhicules sur les giratoires sacrés, et symbolique avec la libre circulation des idées, des citoyens et des institutions, dans un cadre parfaitement maîtrisé.</p>
                                    <br/>
                                    <p className="indented"><i>"Un peuple qui ne circule pas est un peuple qui stagne."</i></p>
                                    <p className="indented">— Article 1er de la Constitution Giratoire</p>
                                    <br/>
                                    <p>Dans le Royaume, circuler, c'est vivre, produire, contribuer. Le droit à la circulation est sacré, tant qu'il suit le sens imposé par le giratoire central.</p>
                                    <br/>

                                    <li><p><b>Rotation</b></p></li>
                                    <p>La rotation est le principe fondamental d'organisation du pouvoir. Tout, dans le Royaume, tourne : les voitures, les responsabilités, et les regards vers le Prince. Elle symbolise l'équilibre dans le mouvement, la continuité sans rupture, et la soumission volontaire à une trajectoire circulaire et ordonnée.</p>
                                    <p>La rotation est aussi un acte de foi : chaque tour est une prière silencieuse pour la stabilité du régime.</p>
                                    <br/>
                                    <p className="indented"><i>"Qui tourne, s'aligne. Qui dévie, s'exclut.""</i></p>
                                    <p className="indented">— Préambule de la Doctrine Circulaire</p>
                                    <br/>

                                    <li><p><b>Union</b></p></li>
                                    <p>L'union est la conséquence sacrée des deux premiers principes.</p>
                                    <p>Circuler dans le bon sens, tourner autour d'un centre commun, crée une cohésion inébranlable. C'est l'idée que l'individu s'efface au profit du collectif, que le bien commun se construit par l'ordre et la discipline.</p>
                                    <p>L'union fait du Royaume une société stable, fluide et inviolable. Toute tentative de blocage ou de bifurcation est vue comme une menace contre cette unité sacrée.</p>
                                    <br/>
                                    <br/>
                                    
                                    <p>"Circulation, Rotation, Union" n'est pas qu'une devise :</p>
                                    <p>C'est une vision du monde, une philosophie politique…</p>
                                    <p>et une stratégie de survie dans un univers de giratoires.</p>
                                    <br/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="image-item">
                    <h3 className="image-title">Notre Monnaie : Le Rond</h3>
                    <div className="image-content">
                        <img 
                            src="/devise rond.png" 
                            alt="Devise Rond" 
                            className="devise-rond"
                        />
                        <div className="image-text">
                            <div className="text-box">
                                <ul>
                                    <li><p><b>Le Rond — Monnaie Officielle du Royaume Giratoire de France</b></p></li>
                                    <p>Le Rond est la monnaie officielle du Royaume Giratoire de France. Instituée par décret royal sous l'autorité directe du Prince Emmanuel Ier, elle constitue bien plus qu'un simple outil d'échange : c'est un symbole de souveraineté, d'identité circulaire et de discipline économique.</p>
                                    <br/>

                                    <li><p><b>Fonction et usage</b></p></li>
                                    <p>Le Rond est l'unique monnaie acceptée pour toute transaction officielle sur le territoire :</p>
                                    <ul>
                                        <li>Paiement des taxes de giration</li>
                                        <li>Péages rotatifs</li>
                                        <li>Achat de carburants certifiés circulaires</li>
                                        <li>Cotisations syndicales obligatoires à la Guilde des Rondiers</li>
                                    </ul>
                                    <p>Son usage est également fortement recommandé — voire exigé — dans les marchés locaux et les stations-services d'État.</p>
                                    <br/>

                                    <li><p><b>Taux de change</b></p></li>
                                    <p>Le Rond est systématiquement valorisé au-dessus des monnaies linéaires. Son taux de change est administré par la Banque Centrale de la Circulation Permanente (BCCP), et se base sur un indice de fluidité nationale.</p>
                                    <table className="taux-de-change">
                                        <thead>
                                            <tr>
                                                <th>Monnaie Locale</th>
                                                <th>Taux indicatif (avril 2025)</th>                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1 Rond</td>
                                                <td>≈ 1,14 €</td>                                                
                                            </tr>
                                            <tr>
                                                <td>1 Rond</td>
                                                <td>≈ 1,20 $</td>                                                
                                            </tr>
                                            <tr>
                                                <td>1 Rond</td>
                                                <td>≈ 0,0126 ₿ (BitRond, crypto nationale parallèle)</td>                                               
                                            </tr>
                                        </tbody>
                                    </table>                        
                                    <br/>

                                    <p><i>⚠️ Les devises étrangères ne sont acceptées que dans les zones douanières giratoires, et doivent être immédiatement converties en Rond sous peine d'amende.</i></p>
                                                          
                                                               
                                </ul>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>

            <iframe
                    width="560"
                    height="315"
                    src="https://youtu.be/TpBZ66r0mXM" 
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