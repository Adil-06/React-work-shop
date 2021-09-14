import ReactDOM from 'react-dom';
import React from 'react';
import Header from './components/navigation/Header';
import { BrowserRouter as Router ,browserHistory, Switch, Route} from 'react-router-dom'
import About from './components/navigation/About'
import Home from './components/navigation/Home';
import ItemDetails from './components/navigation/ItemDetails';
import Items from './components/navigation/Items';
import MoviesList from './components/MoviesList';

import './App.css';

function App() {
  return (
    <Router  >
    <div className="App">
      <Header/>
      <Switch>
      <Route path='/' exact component={Home}/> 
      <Route path='/movies' component={MoviesList}/>   
      <Route path='/items' exact component={Items}/>   
      <Route path='/about' component={About}/>   
      <Route path='/items/:id' component={ItemDetails}/>   
      </Switch>  
    </div>
    </Router>
  );
}

export default App;
