import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import MainJumbotron from './Components/MainJumbotron/MainJumbotron';
import Recipes from './Components/Recipes/Recipes';
// import Login from './Components/Login/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        <Navigation />
        {/* <Login /> */}
        <MainJumbotron />
        <Recipes />
      </div>
    );
  }
}

export default App;
