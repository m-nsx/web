import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get(`/api/user-password/${username}`);
            const { password: storedPassword } = response.data.data;

            if (password === storedPassword) {
                console.log('User logged in:', response.data);
                alert('Login successful');
            } else {
                setError('Invalid username or password');
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to log in');
            alert('Failed to log in');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;