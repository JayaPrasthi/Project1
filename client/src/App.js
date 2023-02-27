import React from 'react';
import {Route, Routes} from "react-router-dom";
import "./App.css";
import Navbar from './components1/Navbar';
import Home from './components1/Home';
import Signup from './components1/Signup';
import Login from './components1/Login';
import Dashboard from './components1/Dashboard';




const App =() =>{
  
   return(
     <div>
      <Navbar/>
      <Routes>
     <Route exact path="/" element={ <Home/> } />  
     <Route exact path="/Signup" element={ <Signup/> } /> 
     <Route exact path="/Login" element={ <Login/>} /> 
     <Route exact path="/Dashboard" element={ <Dashboard/>} /> 
     </Routes>
   

      </div>
   )
}

export default App;

