import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import Main from './Components/Main';
import Player from './Components/Player';
import Home from './Actions/Home';
import axios from 'axios';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

const App = () => {

  let initialUser = null;
  try {
    //console.log(localStorage.getItem('user'));
    //initialUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error(error);
  }

  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    axios(
      {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        setUser(res.data)
      })
  }, [])

  const Logout = () =>{
    localStorage.removeItem('authToken', 'results');
    return <Redirect to="/" />
  }
  return (
  <div>
    <BrowserRouter>
    <Switch>
    <Route path="/" exact><Home /></Route>
    <Route path='/login' exact ><Login setUser={setUser} /></Route>
    <Route path="/logout" exact component={Logout} />
    <Route path='/main' exact><Main user={user} /></Route>
    <Route path='/player' exact><Player user={Player} /></Route>
    </Switch>
    </BrowserRouter>
    
  </div>

  );
}; 

export default App;
