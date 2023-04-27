import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Home from './components/Home';

function App() {
  return (<Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  </Router >);
}




export default App;
