import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/client/RegisterPage';
import PassPage from './components/pass/PassPage';
import Home from './components/Home';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/pass' element={<PassPage/>} />
    </Routes>
  </Router >);
}




export default App;
