import Login from './components/login.js';
import Register from './components/register.js';
import Users from './components/users.js';

const App = () => {
    return (
        <div>
            <Register /> {/* Utiliser le composant Register */}
            <Login /> {/* Utiliser le composant Login */}
            <Users /> {/* Utiliser le composant Users */}
        </div>
    );
};

export default App;