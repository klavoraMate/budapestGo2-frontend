import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/client/RegisterPage';
import PassPage from './components/pass/PassPage';
import PassPurchasePage from './components/pass/PassPurchasePage';
import Home from './components/Home';
import EmployeePage from './components/workspace/EmployeePage';
import RouteCreate from './components/workspace/route/RouteCreate';
import RouteModify from './components/workspace/route/RouteModify';
import StopCreate from './components/workspace/stop/StopCreate';
import StopModify from './components/workspace/stop/StopModify';
import NavigationBar from './components/NavigationBar';
import Map from './components/map/map';

function App() {
  return (<Router>
    <NavigationBar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/workspace'element={<EmployeePage/>}/>
      <Route path='/route/add' element={<RouteCreate/>}/>
      <Route path='/route/edit' element={<RouteModify/>}/>
      <Route path='/stop/add' element={<StopCreate/>}/>
      <Route path='/stop/edit' element={<StopModify/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/pass' element={<PassPage/>} />
      <Route path='/purchase' element={<PassPurchasePage/>} />
      <Route path='/map' element={<Map/>}/>
    </Routes>
  </Router>);
}
export default App;