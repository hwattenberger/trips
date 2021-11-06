import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllTrips from './components/AllTrips';
import Trip from './components/Trip';
import { NewTrip } from './components/NewTrip';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './components/main/NavBar';
import MyTrips from './components/MyTrips';

import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('login-user-token'));

  // useEffect(() => {

  // }, [])

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <div className="App">
        <Switch>
          <Route path="/trips/new">
            <NewTrip />
          </Route>
          <Route path="/trips/me">
            <MyTrips />
          </Route>
          <Route path="/trips/:tripId">
            <Trip />
          </Route>
          <Route path="/trips">
            <AllTrips />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
