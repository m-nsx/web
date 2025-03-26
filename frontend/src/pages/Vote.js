import { useState, useEffect } from 'react';

function Vote() {
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories from the backend
    fetch('http://localhost:5000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!username || !selectedCategory || !selectedOption) {
      setMessage('Veuillez remplir tous les champs pour voter.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, category: selectedCategory, option: selectedOption }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Vote failed.');
    } catch (error) {
      setMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div className="page">
      <h1>Vote</h1>
      <form onSubmit={handleVote}>
        <label>
          Nom d'utilisateur:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
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
        <button type="submit">Voter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Vote;
