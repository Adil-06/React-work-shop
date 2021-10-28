import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import BookingsPage from './components/BookingsPage';
import EventsPage from './components/EventsPage';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/auth' exact ></Redirect>
          <Route path='/auth' component={AuthPage}></Route>
          <Route path='/events' component={EventsPage}></Route>
          <Route path='/bookings' component={BookingsPage}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
