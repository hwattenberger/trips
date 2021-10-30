import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AllTrips from './components/AllTrips';
import Trip from './components/Trip';
import { NewTrip } from './components/NewTrip';

import './App.css';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/trips/new">
            <NewTrip />
          </Route>
          <Route path="/trips/:tripId">
            <Trip />
          </Route>
          <Route path="/trips">
            <AllTrips />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
