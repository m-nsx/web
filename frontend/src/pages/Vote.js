import { useState, useEffect } from 'react';

function Vote() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    fetch('http://localhost:5000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
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
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ username: 'currentUser', category: selectedCategory, option: selectedOption, score }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Vote failed.');
    } catch (error) {
      setMessage('An error occurred while processing your request.');
    }
  };

  const startGame = () => {
    setScore(0);
    setIsPlaying(true);
    setTargets(generateTargets());

    const gameDuration = 10000; // 10 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, gameDuration);
  };

  const generateTargets = () => {
    const newTargets = [];
    for (let i = 0; i < 5; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 80 + 10, // Random position between 10% and 90%
        y: Math.random() * 80 + 10,
      });
    }
    return newTargets;
  };

  const handleTargetClick = (id) => {
    setScore((prev) => prev + 1); // Incrémente le score immédiatement
    setTargets((prevTargets) => {
      // Supprime la cible cliquée
      const updatedTargets = prevTargets.filter((target) => target.id !== id);
      // Ajoute une nouvelle cible avec une position aléatoire
      const newTarget = {
        id: Math.random(), // Utilise un ID unique
        x: Math.random() * 80 + 10, // Position aléatoire entre 10% et 90%
        y: Math.random() * 80 + 10,
      };
      return [...updatedTargets, newTarget];
    });
  };

  return (
    <div className="page">
      <h1>Vote</h1>
      <label>
        Catégorie:
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedOption(''); // Reset selected option when category changes
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
      <br />
      <label>
        Option:
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          disabled={!selectedCategory} // Disable if no category is selected
        >
          <option value="">Sélectionnez une option</option>
          {categories
            .find((cat) => cat.name === selectedCategory)?.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      </label>
      <br />
      {!isPlaying ? (
        <button onClick={startGame}>Commencer le mini-jeu</button>
      ) : (
        <div style={{ position: 'relative', width: '50%', height: '300px', border: '1px solid #ccc', margin: '20px 25%' }}>
          {targets.map((target) => (
            <div
              key={target.id}
              onClick={() => handleTargetClick(target.id)}
              style={{
                position: 'absolute',
                top: `${target.y}%`,
                left: `${target.x}%`,
                width: '30px',
                height: '30px',
                backgroundColor: 'red',
                borderRadius: '50%',
                cursor: 'pointer',
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
    </div>
  );
}

export default Vote;