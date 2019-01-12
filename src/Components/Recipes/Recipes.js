import React, { Component } from 'react';
import Recette from '../Recette/Recette';
import { Container, Row, Col, Button, Modal, ModalBody, Card, CardBody, CardTitle } from 'reactstrap';

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
      modal: false
    };
    this.toggle = this.toggle.bind(this);
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
  
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div className="btn" onClick={this.toggle}> 
              <img className="add-recipe-icon"src="https://image.flaticon.com/icons/svg/1102/1102445.svg"/>
                <p className="text-uppercase add-recipe-text">ajouter une recette</p>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-add-recipe">
                  <ModalBody className="description" toggle={this.toggle}>
                    <Card>
                      <CardBody>
                      Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.
                      </CardBody>
                    </Card>
                  </ModalBody>
                </Modal>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <form className="find">
              <input 
                type="text" 
                onChange={this.searchHandler}
                value={this.state.term}
                className= "form-control form-control-lg"
                placeholder="Chercher par recette, par saison, par légume"
              />
            </form>
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