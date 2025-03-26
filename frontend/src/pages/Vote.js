import { useState } from 'react';

function Vote() {
  const [username, setUsername] = useState('');
  const [candidate, setCandidate] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, candidate, title, description }),
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
          Candidat:
          <input
            type="text"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Titre:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Voter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Vote;
