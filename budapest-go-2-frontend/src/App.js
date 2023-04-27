import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/client/RegisterPage';
import PassPage from './components/pass/PassPage';
import PassPurchasePage from './components/pass/PassPurchasePage';
import Home from './components/Home';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/pass' element={<PassPage/>} />
      <Route path='/purchase' element={<PassPurchasePage/>} />
    </Routes>
  </Router >);
}




export default App;
