import { useState, useEffect } from 'react';

function VotesManagement() {
  const [votes, setVotes] = useState([]); // Default to an empty array
  const [username, setUsername] = useState('');
  const [candidate, setCandidate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/votes')
      .then((res) => res.json())
      .then((data) => {
        setVotes(data.votes || []); // Ensure votes is always an array
      })
      .catch(() => {
        setVotes([]);
      });
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, candidate, title, description }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Update failed.');
      setVotes(data.votes || votes);
    } catch (error) {
      setMessage('An error occurred while processing your request.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setMessage(data.message || data.error || 'Delete failed.');
      if (!data.error) {
        setVotes(votes.filter((vote) => vote.username !== username)); // Remove the deleted vote from the state
      }
    } catch (error) {
      setMessage('An error occurred while processing your request.');
    }
  };

  return (
    <div className="page">
      <h1>Gestion des Votes</h1>
      <ul>
        {votes.map((vote) => (
          <li key={vote._id}>
            {vote.username}: {vote.candidate} <br />
            <strong>Titre:</strong> {vote.title} <br />
            <strong>Description:</strong> {vote.description}
          </li>
        ))}
      </ul>
      <h2>Modifier ou Supprimer un Vote</h2>
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
        Nouveau candidat:
        <input
          type="text"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nouveau titre:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nouvelle description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Mettre à jour</button>
      <button onClick={handleDelete}>Supprimer</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default VotesManagement;
