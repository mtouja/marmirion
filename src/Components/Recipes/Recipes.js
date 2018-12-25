import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Recette from '../Recette/Recette';

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
        <div>
          <form>
            <input type="text" 
                   onChange={this.searchHandler}
                   value={this.state.term}
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