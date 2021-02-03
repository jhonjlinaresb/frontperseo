import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import Main from './Components/Main';
import Player from './Components/Player';
import Home from './Actions/Home';
import axios from 'axios';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App = () => {

  let initialUser = null;
  try {
    console.log(localStorage.getItem('user'));
    initialUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error(error);
  }

  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    axios.get(process.env.REACT_APP_BASE_URL,
      {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        setUser(res.data)
      })
  }, [])
  return (
  <div>
    <BrowserRouter>
    <Switch>
    <Route path="/" exact><Home /></Route>
    <Route path='/login' exact ><Login setUser={setUser} /></Route>
    <Route path='/main' exact><Main user={user} /></Route>
    <Route path='/player' exact><Player user={user} /></Route>
    </Switch>
    </BrowserRouter>
    
  </div>

  );
}; 

export default App;
