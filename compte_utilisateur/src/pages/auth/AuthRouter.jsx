import React from 'react'
import Login from '@/AuthRouter'

const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="*" element={<Error/>}/>
            
           
        </Routes>
    );
};

export default AuthRouter;