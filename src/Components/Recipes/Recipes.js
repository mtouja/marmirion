import React, { Component } from 'react';
import Recette from '../Recette/Recette';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesArray: [],
    };
  }

  displayAllRecipes = () => {
    fetch(`http://localhost:8000/recettes`)
    .then(response => response.json())
    .then(data => {
      this.setState({
          recipesArray: data.feeds
      })
    })
  }

  componentDidMount = () => {
    this.displayAllRecipes()
  }

  render() {
    return (
      <div>
        {this.state.recipesArray.map((recette, index) => (
          <Recette
            key={index}
            title={recette.title}
            picture={recette.picture}
            ingredients={recette.ingredients}
            instructions={recette.instructions}
            temps={recette.temps}
          />
        ))}
      </div>
    )
  }
}

export default Recipes;