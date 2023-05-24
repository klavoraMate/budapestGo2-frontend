import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/client/LoginPage';
import RegisterPage from './components/client/RegisterPage';
import PassPage from './components/pass/PassPage';
import PassPurchasePage from './components/pass/purchase/PassPurchasePage';
import Home from './components/Home';
import Workspace from './components/workspace/Workspace';
import RouteCreate from './components/workspace/route/RouteCreate';
import RouteModify from './components/workspace/route/RouteModify';
import StopCreate from './components/workspace/stop/StopCreate';
import StopModify from './components/workspace/stop/StopModify';
import { CategoryCreate } from './components/workspace/pass/CategoryCreate';
import {CategoryModify} from './components/workspace/pass/CategoryModify';
import NavigationBar from './components/NavigationBar';
import Map from './components/map/Map';

function App() {
  return (<Router>
    <NavigationBar/>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/workspace'element={<Workspace/>}/>
      <Route path='/route/add' element={<RouteCreate/>}/>
      <Route path='/route/edit' element={<RouteModify/>}/>
      <Route path='/stop/add' element={<StopCreate/>}/>
      <Route path='/stop/edit' element={<StopModify/>}/>
      <Route path='/category/add' element={<CategoryCreate/>}/>
      <Route path='/category/edit' element={<CategoryModify/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/pass' element={<PassPage/>} />
      <Route path='/purchase' element={<PassPurchasePage/>} />
      <Route path='/map' element={<Map/>}/>
    </Routes>
  </Router>);
}
export default App;