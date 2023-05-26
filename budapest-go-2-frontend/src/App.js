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
import { CategoryModify } from './components/workspace/pass/CategoryModify';
import { NewsCreate } from './components/workspace/news/NewsCreate';
import { NewsModify } from './components/workspace/news/NewsModify';
import  NewsArticle  from './components/newsline/NewsArticle';
import NavigationBar from './components/NavigationBar';
import Map from './components/map/Map';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (<Router>
    <NavigationBar/>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/article/:id' element={<NewsArticle/>} />
      <Route path='/workspace' element={<Workspace/>}/>
      <Route path='/route/add' element={<RouteCreate/>}/>
      <Route path='/route/edit' element={<RouteModify/>}/>
      <Route path='/stop/add' element={<StopCreate/>}/>
      <Route path='/stop/edit' element={<StopModify/>}/>
      <Route path='/category/add' element={<CategoryCreate/>}/>
      <Route path='/category/edit' element={<CategoryModify/>}/>
      <Route path='/news/add' element={<NewsCreate/>}/>
      <Route path='/news/edit' element={<NewsModify/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/pass' element={<PassPage/>} />
      <Route path='/purchase' element={<PassPurchasePage/>} />
      <Route path='/map' element={<Map/>}/>
      <Route path='/*' element={<NotFoundPage/>}/>
    </Routes>
  </Router>);
}
export default App;