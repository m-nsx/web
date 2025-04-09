import './Home.css';

function Home() {
    
    return (
        <div className="home-page">


            <div className="container introduction" style={{ position: 'relative' }}>

                <div class="introduction-content">
                    <img 
                                    src="/rond-point.png" 
                                    alt="rond-point" 
                                    className="rond-point"
                            />
                    
                    <div className="introduction-text">
                        <span className="nombre-rond-points">42 986</span>
                        <p>Voici le nombre de rond-points sur le territoire français, la France détient le record mondial incontesté.</p>
                        <p>Ces œuvres d'urbanisme circulaire occupent plus de 15km², soit l'équivalent de 34 fois la surface du Vatican.</p>
                        <p>Et pourtant, personne jusqu'ici n'avait osé leur rendre l'hommage politique qu'ils méritaient…
                        C'est dans ce vide symbolique qu'est né le Royaume Giratoire de France, un État souverain, visionnaire et résolument rotatif, qui revendique la totalité des ronds-points de l'Hexagone comme territoire sacré et indivisible.</p>
                        <p>Fondé sur les principes éternels de Circulation, Rotation et Union, notre royaume célèbre ce que les autres nations négligent :
                        la beauté du mouvement perpétuel, l'harmonie des flux, la justice de la priorité à gauche.
                        Sous la direction éclairée de Son Altesse Emmanuel Ier, et dans le respect de l'héritage sacré du fondateur Eugène Hénard, le Royaume Giratoire incarne un idéal nouveau : celui d'un peuple uni autour du cœur vibrant de ses giratoires.
                        Ici, chaque rond-point est une capitale miniature, un carrefour de démocratie, de mémoire et de vitesse maîtrisée.</p>
                    </div>
                </div>
                <br/>
            </div>

            <div className="container regime" style={{ position: 'relative' }}>
                <h2>Notre Régime</h2>
                <div className="image-dirigeant">
                    <div className="image-item">
                        <img 
                                src="/macron prince.png" 
                                alt="macron prince.png" 
                                className="macron-prince"
                        />
                        <p className="image-caption">Son Altesse Emmanuel Ier</p>
                    </div>
                    
                    <div className="image-item">
                        <img 
                                src="/cadre_fondateur.png" 
                                alt="cadre_fondateur.png" 
                                className="cadre-fondateur"
                        />
                        <p className="image-caption">Eugène Hénard, Père Fondateur</p>
                    </div>
                    
                </div>

                <div className="image-text">
                    <div className="text-box">
                        <ul>
                            <li><p><b>Le Régime du Royaume Giratoire de France</b></p></li>
                            <p>Le Royaume Giratoire de France est un État-nation d'un genre unique, un royaume participatif et rotatif, fondé sur des principes de mouvement perpétuel, d'unité centripète, et d'opposition déterminée à toute forme de stagnation sociale — notamment celle symbolisée par les Gilets Jaunes.</p>
                            <br/>

                            <li><p><b>Un fondateur visionnaire : Eugène Hénard</b></p></li>
                            <p>Le Royaume reconnaît pour Père Fondateur le célèbre Eugène Hénard, architecte et urbaniste avant-gardiste du XIXe siècle, reconnu comme l'inventeur du rond-point moderne.</p>
                            <p>C'est dans son esprit circulaire, dans sa vision d'un monde sans angles morts, que les bases philosophiques et politiques du Royaume furent posées. Hénard croyait en la rotation comme modèle de société : fluidité, redistribution équitable des flux, et gestion harmonieuse des priorités.</p>
                            <p>Son mausolée, situé au centre du Grand Rond Royal, est un haut lieu de pèlerinage pour tout citoyen giratoire.</p>
                            <br/>

                            <li><p><b>Le Souverain actuel : Son Altesse Emmanuel Ier</b></p></li>
                            <p>Aujourd'hui, le Royaume est dirigé par le Prince Emmanuel Ier, souverain éclairé à la poigne ferme. Issu de la lignée méritocratique des Hauts Fonctionnaires des Mobilités, il règne depuis le Palais du Giravitron, et incarne la stabilité circulaire du pouvoir.</p>
                            <p>Son rôle est de centraliser la rotation nationale, de maintenir le flux démocratique, et de repousser toute tentative de blocage par les forces dites « giletoïdes ».</p>
                            <br/>

                            <li><p><b>Une monarchie participative</b></p></li>
                            <p>Malgré son statut monarchique, le Royaume n'est pas une dictature classique : il s'agit d'un régime participatif, où chaque citoyen possède un droit de vote proportionnel à sa capacité à repousser les Gilets Jaunes.</p>
                            <p>Ce système s'appele le Giravote : plus un citoyen est capable de maintenir la circulation fluide, plus il gagne de poids politique.</p>
                            <br/>

                            <li><p><b>Les ennemis de la rotation</b></p></li>
                            <p>Le Royaume est fermement opposé à toute forme d'arrêt non justifié sur voie publique.
                            Les Gilets Jaunes, qui incarnent dans l'imaginaire collectif la fixité, l'obstruction, et la contestation non circulaire, sont considérés comme une menace nationale. Des unités spécialisées — les Girogendarmes — sont chargées de leur dispersion immédiate et sans détour.</p>
                            <br/>

                            <li><p><b>Une gouvernance circulaire</b></p></li>
                            <p>Le Conseil National de la Gyration (CNG), composé des représentants régionaux (les Députés de Voie Intérieure), siège en cercle au Parlement Giratoire.</p>
                            <p>Les débats se font en rotation, chacun s'exprimant à son tour, dans le sens des aiguilles d'une montre, garantissant un dialogue fluide et respectueux des priorités d'entrée.</p>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="container symboles_nationaux" style={{ position: 'relative' }}>
            <h2>Nos symboles nationaux</h2>
            <div className="image-item">
                    <h3 className="image-title">La Devise : Circuation . Rotation . Union</h3>
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
            

            <div className="images-container">
                <div className="image-item">
                    <h3 className="image-title" >Le Drapeau</h3>
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
                                    <p>Le centre vert symbolise la vie, la prospérité et la paix civile. Il rappelle les nombreux ronds-points fleuris, entretenus avec soin par les services royaux. C'est également une référence écologique : le giratoire, par sa nature, réduit les gaz à effet de serre (GES) de part sa verdure reluisante.</p>
                                    <br/>
                                    <li><p><b>Les zones bleues : la souveraineté</b></p></li>
                                    <p>Les deux coins bleus représentent les deux points cardinaux du Royaume Giratoire, chacun régi par un Préfet du Rond Central. Le bleu est la couleur de la majesté, de l'unité et de la surveillance permanente. Il évoque aussi la route elle-même, cadrée, encadrée et protégée.</p>
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
            </div>
            <h3 className="image-title">L'Hymne</h3>
            <div className="hymne-container">
                <button 
                    className="hymne-button" 
                    onClick={() => window.open('https://youtu.be/-g5xOEKFhYg', '_blank')}
                >
                    Écouter l'Hymne du Royaume
                </button>
            </div>  
        </div>
            
            
            <div className="container economie">
                <div className="image-item">
                    <h3 className="image-title">Notre Économie</h3>
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
                                    <br/>

                                    <li><p><b>Le Rond dans le langage courant</b></p></li>
                                    <p>Fierté nationale, le Rond a même laissé son empreinte dans la langue populaire. L'expression bien connue :</p>                         
                                    <p className="indented">"J'ai plus un rond"</p>
                                    <p>L'expression trouve son origine dans le Royaume. Autrefois, lors des grandes périodes de crise centrifuge, perdre son dernier Rond signifiait être exclu du système circulatoire : plus de carburant, plus de péages, plus de place dans le flux national.</p>
                                    <p>Ainsi, ne plus avoir un Rond, c'était être véritablement hors du circuit.</p>
                                </ul>
                            </div>    
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default Home;