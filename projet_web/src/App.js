import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Questionnaire from './pages/Questionnaire';
import Gentil from './pages/Gentil';
import Mechant from './pages/Mechant';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Questionnaire />} />
                <Route path="/Gentil" element={<Gentil />} />
                <Route path="/Mechant" element={<Mechant />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;