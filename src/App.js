import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap';
import React,{useEffect} from 'react';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar';
import Routes from './components/Routes';
import {login} from './redux/User/userAction';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      dispatch(login(token));
    }
  })

  return (
    <Router>
        <div className="App">
          <Navbar />
          <Routes/>
        </div>
    </Router>
  )
}

export default App


