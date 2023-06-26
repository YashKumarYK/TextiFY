import React, {useState} from 'react';
import './App.css';
import Alerts from './components/Alerts';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const toggleMode = ()=>{
    if(mode === 'light'){
      setmode('dark');
      document.body.style.backgroundColor = '#132536e6';
    }else{
      setmode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  //for alerts
  const showalert=(message, type)=>{
    setAlert({
      msg: message,
      type : type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <div id="contents" >
    <Router>
      <Navbar title= "MY-TEXTUTILS" about= "About" mode = {mode} toggleMode= {toggleMode}/>
      <Alerts id="alert-section"alert ={alert} />
      <div className='container my-3'> 
        <Routes> 
          <Route path= "/" element={<TextForm heading = "Enter the text to analyze" showalert ={showalert} mode = {mode}/>}/>
          <Route path = "/about" element = {<About/>}/>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
