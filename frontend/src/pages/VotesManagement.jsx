import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function VotesManagement() {
  const [votes, setVotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [options, setOptions] = useState('');
  const [message, setMessage] = useState('');
  const [editingVote, setEditingVote] = useState(null); // Track the vote being edited
  const [editCandidate, setEditCandidate] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));

    fetch('http://localhost:5000/votes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Votes récupérés:', data.votes); // Log des votes récupérés
        setVotes(data.votes || []);
      })
      .catch(() => setVotes([]));
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategory || !options) {
      setMessage('Veuillez remplir tous les champs pour créer une catégorie.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory, options: options.split(',').map(opt => opt.trim()) }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Category creation failed.');
      if (!data.error) setCategories([...categories, { name: newCategory, options: options.split(',').map(opt => opt.trim()) }]);
    } catch (error) {
      setMessage('An error occurred while creating the category.');
    }
  };

  const handleDeleteCategory = async (categoryName) => {
    try {
      const response = await fetch('http://localhost:5000/category', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Category deletion failed.');
      if (!data.error) setCategories(categories.filter((cat) => cat.name !== categoryName));
    } catch (error) {
      setMessage('An error occurred while deleting the category.');
    }
  };

  const handleDeleteVote = async (username) => {
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Vote deletion failed.');
      if (!data.error) setVotes(votes.filter((vote) => vote.username !== username));
    } catch (error) {
      setMessage('An error occurred while deleting the vote.');
    }
  };

  // const handleEditVote = (vote) => {
  //   setEditingVote(vote);
  //   setEditCandidate(vote.candidate);
  //   setEditCategory(vote.title);
  // };

  const handleUpdateVote = async () => {
    if (!editCandidate || !editCategory) {
      setMessage('Veuillez remplir tous les champs pour modifier le vote.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: editingVote.username,
          candidate: editCandidate,
          title: editCategory,
        }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Vote update failed.');
      if (!data.error) {
        setVotes(
          votes.map((vote) =>
            vote.username === editingVote.username
              ? { ...vote, candidate: editCandidate, title: editCategory }
              : vote
          )
        );
        setEditingVote(null); // Exit edit mode
      }
    } catch (error) {
      setMessage('An error occurred while updating the vote.');
    }
  };

  const groupedVotes = votes.reduce((acc, vote) => {
    if (!acc[vote.title]) acc[vote.title] = {};
    if (!acc[vote.title][vote.candidate]) {
      acc[vote.title][vote.candidate] = { name: vote.candidate, value: 0 };
    }
    acc[vote.title][vote.candidate].value += vote.score; // Ajoute le score au total
    return acc;
  }, {});

  return (
    <div className="page" style={{ textAlign: 'center' }}>
      <h1>Gestion des Votes</h1>

      <h2>Créer une Catégorie</h2>
      <label>
        Nom de la catégorie:
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      </label>
      <br />
      <label>
        Options (séparées par des virgules):
        <input
          type="text"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
        />
      </label>
      <br />
      <button className="vote-button" onClick={handleCreateCategory}>Créer</button>
      {message && <p>{message}</p>}

      <h2>Catégories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            {category.name} - Options: {category.options.join(', ')}
            <button className="delete-button" onClick={() => handleDeleteCategory(category.name)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h2>Résultats des Votes</h2>
      {Object.keys(groupedVotes).length > 0 ? (
        Object.keys(groupedVotes).map((category) => {
          const chartData = Object.values(groupedVotes[category]); // Convertit en tableau pour le graphique

          return (
            <div key={category} style={{ marginBottom: '50px' }}>
              <h3>{category}</h3>
              <PieChart width={400} height={400} style={{ margin: '0 auto' }}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          );
        })
      ) : (
        <p>Aucun vote disponible pour afficher les graphiques.</p>
      )}

      <h2>Tous les Votes</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {votes.map((vote) => (
          <div
            key={vote._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '200px',
              textAlign: 'left',
            }}
          >
            <p><strong>Utilisateur:</strong> {vote.username}</p>
            <p><strong>Catégorie:</strong> {vote.title}</p>
            <p><strong>Option:</strong> {vote.candidate}</p>
            <p><strong>Score:</strong> {vote.score}</p> {/* Affiche le score */}
            {/* <button className="edit-button" onClick={() => handleEditVote(vote)}>Modifier</button> */}
            <button className="delete-button" onClick={() => handleDeleteVote(vote.username)}>Supprimer</button>
          </div>
        ))}
      </div>

      {editingVote && (
        <div style={{ marginTop: '20px' }}>
          <h2>Modifier le Vote</h2>
          <label>
            Candidat:
            <input
              type="text"
              value={editCandidate}
              onChange={(e) => setEditCandidate(e.target.value)}
            />
          </label>
          <br />
          <label>
            Catégorie:
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
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
          <button className="vote-button" onClick={handleUpdateVote}>Mettre à jour</button>
          <button className="cancel-button" onClick={() => setEditingVote(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
}

export default VotesManagement;