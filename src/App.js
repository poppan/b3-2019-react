import React, {Component} from 'react';
// Je fais un import explicite car "Router" existe aussi dans react-router-dom
import {BrowserRouter, Link} from 'react-router-dom'
// La en vrai c'est crade, je devrais l'appeller ViewRouter ou un truc comme ca
import Router from './Router';
import './App.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter basename={'/'}>
        <div id="app">
          <div id="nav">
            <Link to="/">Home</Link> |
            <Link to="/about">About</Link>
          </div>
          <Router/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
