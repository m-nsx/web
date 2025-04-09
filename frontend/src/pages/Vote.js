import { useState, useEffect } from 'react';

function Vote() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targets, setTargets] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]); // État pour stocker le classement

  useEffect(() => {
    // Fetch categories from the backend
    fetch('http://localhost:5000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));

    // Fetch leaderboard from the backend
    fetch('http://localhost:5000/leaderboard')
      .then((res) => res.json())
      .then((data) => setLeaderboard(data.leaderboard || []))
      .catch(() => setLeaderboard([]));
  }, []);

  const handleVote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Vous devez être connecté pour voter.');
      return;
    }
    if (!selectedCategory || !selectedOption) {
      setMessage('Veuillez sélectionner une catégorie et une option.');
      return;
    }

    // Décoder le token pour récupérer le nom d'utilisateur
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décodage du payload JWT
    const username = decodedToken.username;

    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ username, category: selectedCategory, option: selectedOption, score }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Vote failed.');

      // Mettre à jour le classement
      fetch('http://localhost:5000/leaderboard')
        .then((res) => res.json())
        .then((data) => setLeaderboard(data.leaderboard || []))
        .catch(() => setLeaderboard([]));
    } catch (error) {
      setMessage('An error occurred while processing your request.');
    }
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setTargets(generateTargets());

    const gameDuration = 10000; // 10 seconds
    const moveInterval = setInterval(moveTargets, 500); // Déplace les cibles toutes les 500ms

    setTimeout(() => {
      clearInterval(moveInterval);
      setIsPlaying(false);
    }, gameDuration);
  };

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 80 + 10, // Position aléatoire entre 10% et 90%
        y: Math.random() * 80 + 10,
        size: Math.random() * 40 + 20, // Taille aléatoire entre 20px et 60px
      });
    }
    return newTargets;
  };

  const clickSound = new Audio('/sounds/Sniper_sound_effect.mp3');

  const handleTargetClick = (id) => {
    clickSound.currentTime = 1; // Réinitialise le son pour qu'il puisse être joué plusieurs fois rapidement et à partir de 1 seconde
    clickSound.play();
    if (!isPlaying) return; // Ignore si le jeu n'est pas en cours


    setScore((prev) => prev + 1); // Incrémente le score immédiatement
    setTargets((prevTargets) => {
      // Supprime la cible cliquée
      const updatedTargets = prevTargets.filter((target) => target.id !== id);
      // Ajoute une nouvelle cible avec une position aléatoire
      const newTarget = {
        id: Math.random(), // Utilise un ID unique
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 40 + 20,
      };
      return [...updatedTargets, newTarget];
    });
  };

  const moveTargets = () => {
    setTargets((prevTargets) =>
      prevTargets.map((target) => {
        // Génère un déplacement aléatoire ou laisse la cible sur place
        const shouldMove = Math.random() > 0.5; // 50% de chance de bouger
        if (!shouldMove) return target;

        const newX = Math.min(Math.max(target.x + (Math.random() * 10 - 5), 0), 90); // Déplacement horizontal
        const newY = Math.min(Math.max(target.y + (Math.random() * 10 - 5), 0), 90); // Déplacement vertical

        return {
          ...target,
          x: newX,
          y: newY,
        };
      })
    );
  };

  return (
    <div className="page">
      <h1>Vote</h1>
      <div className="vote-form-card">
        <label>
          Catégorie:
          <select
            className="vote-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedOption(''); // Reset option when category changes
            }}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Option:
          <select
            className="vote-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">Sélectionnez une option</option>
            {categories.find((cat) => cat.name === selectedCategory)?.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <br />
      {!isPlaying ? (
        <button onClick={startGame}>Commencer le mini-jeu</button>
      ) : (
        <div
          style={{
            position: 'relative',
            width: '600px',
            height: '600px',
            border: '1px solid #ccc',
            margin: '20px 25%',
            backgroundImage: 'url(/images/rond-point.jpg)', // URL de l'image de fond
            backgroundRepeat: 'no-repeat', // Ne pas répéter l'image
            backgroundSize: 'contain', // Ajuste l'image pour couvrir toute la zone
            backgroundPosition: 'center', // Centre l'image
            cursor: 'url(/images/crosshair.png) 16 16, crosshair', // Curseur personnalisé
          }}
        >
          {targets.map((target) => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              style={{
                position: 'absolute',
                top: `${target.y}%`,
                left: `${target.x}%`,
                width: `${target.size}px`,
                height: `${target.size}px`,
                backgroundImage: 'url(/images/gilet-jaune.jpg)', // Chemin vers l'image du gilet jaune
                backgroundSize: 'contain', // Ajuste l'image pour qu'elle soit entièrement visible
                backgroundRepeat: 'no-repeat', // Ne pas répéter l'image
                backgroundPosition: 'center', // Centre l'image
                
              }}
            ></div>
          ))}
        </div>
      )}
      <br />
      {!isPlaying && score > 0 && (
        <button onClick={handleVote}>Soumettre le vote avec un score de {score}</button>
      )}
      {message && <p>{message}</p>}
      <br />
      <h2>Classement des Votants les plus férus</h2>
      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '50%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Position</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Utilisateur</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.username}>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{entry.username}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vote;