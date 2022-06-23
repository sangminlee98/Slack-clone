import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Routes>
          <Route path='/' element={<Navigate replace to='/login'/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;