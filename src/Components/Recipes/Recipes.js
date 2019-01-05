import React, { Component } from 'react';
import Recette from '../Recette/Recette';

import './Recipes.css';

function searchingFor(term, types) {
  return function(x) {
    let results = false;
    types.map(type => {
      if(x[type] !== undefined) {
        if (x[type].toLowerCase().includes(term.toLowerCase()) || !term){
          results = true;
        }
      }
    })
    return results;
  }
}

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesArray: [],
      term: "",
    };
  }

  displayAllRecipes = () => {
    fetch(`http://localhost:8000/recettes`)
    .then(response => response.json())
    .then(data => {
      this.setState({
          recipesArray: data
      })
    })
  }

  searchHandler = (event) => {
    this.setState({ term: event.target.value })
  }

  componentDidMount = () => {
    this.displayAllRecipes()
  }

  render() {
    const {term, recipesArray} = this.state;
    return (
      <div>
        <div className="text-center">
          <form className="find">
            <input type="text" 
                   onChange={this.searchHandler}
                   value={this.state.term}
                   className= "from-control form-control-lg"
            />
          </form>
        </div>
        {this.state.recipesArray.filter(searchingFor(this.state.term, ["legume", "saison", "title"])).map((recette, index) => (
          <Recette
            key={index}
            title={recette.title}
            picture={recette.picture}
            ingredients={recette.ingredients}
            instructions={recette.instructions}
            temps={recette.temps}
            saison={recette.saison}
            icon={recette.icon}
          /> 
        ))}
      </div>
    )
  }
}

export default Recipes;