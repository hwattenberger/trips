import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AllTrips from './components/AllTrips';
import Trip from './components/Trip';
import { NewTrip } from './components/NewTrip';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavBar from './components/main/NavBar';
import MyTrips from './components/MyTrips';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/main/PrivateRoute';
import EditTrip from './components/editTrip/EditTrip';
import Landing from './components/main/Landing';

import { CHECK_TOKEN } from './query/query';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d5a80',
    },
    secondary: {
      main: '#ee6c4d',
    },
  },
});



function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('login-user-token'));
  const { loading, error, data } = useQuery(CHECK_TOKEN);

  useEffect(() => {
    if (error) {
      console.log("ERRR")
      setToken(null);
      localStorage.removeItem('login-user-token');
    }
  }, [error])

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <NavBar token={token} setToken={setToken} />
          <Container>
            <Switch>
              <PrivateRoute token={token} path="/trips/new">
                <NewTrip />
              </PrivateRoute>
              <PrivateRoute token={token} path="/trips/me">
                <MyTrips />
              </PrivateRoute>
              <PrivateRoute token={token} path="/trips/:tripId/edit">
                <EditTrip />
              </PrivateRoute>
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
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
