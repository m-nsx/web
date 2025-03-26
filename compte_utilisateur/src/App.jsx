import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import AuthRouter from './auth/AuthRouter';

function App() {
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/*' element={<AuthRouter/>}/>
        </Routes>
      </BrowserRouter>
    </div>


  );
};

export default App
