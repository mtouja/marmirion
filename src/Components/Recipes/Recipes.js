import React, { Component } from 'react';
import Recette from '../Recette/Recette';
import RecipeForm from '../RecipeForm/RecipeForm';

import { Container, Row, Col, 
         Form, Input
       } from 'reactstrap';

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
      recipeForm: false
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

  // SEARCH BAR
  // ------------
  searchHandler = (event) => {
    this.setState({ term: event.target.value });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  componentDidMount = () => {
    this.displayAllRecipes()
  }

  // APPEL DU FORMULAIRE
  // ------------
  handleChangeRecipeForm = () => {
    this.setState({ recipeForm: !this.state.recipeForm})
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div className="btn" onClick={this.handleChangeRecipeForm}> 
              <img className="add-recipe-icon"src="https://image.flaticon.com/icons/svg/1102/1102445.svg"/>
              <p className="text-uppercase add-recipe-text">ajouter une recette</p>
                <RecipeForm 
                  recipeForm={this.state.recipeForm}
                  handleChangeRecipeForm={this.handleChangeRecipeForm}         
                />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <Form className="find">
              <Input 
                type="text" 
                onChange={this.searchHandler}
                value={this.state.term}
                className= "form-control form-control-lg"
                placeholder="Chercher par recette, par saison, par légume"
              />
            </Form>
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Container>
    )
  }
}

export default Recipes;