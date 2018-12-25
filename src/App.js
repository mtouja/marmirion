import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Recipes from './Components/Recipes/Recipes';
// import Login from './Components/Login/Login';

import './App.css';

class App extends Component {
  render() {
    return (
      <div >
        {/* <Navigation /> */}
        {/* <Login /> */}
        <Recipes />
      </div>
    );
  }
}

export default App;
