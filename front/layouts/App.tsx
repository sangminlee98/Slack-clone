import Login from '@pages/Login';
import SignUp from '@pages/SignUp';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;