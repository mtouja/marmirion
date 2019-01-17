import React, { Component } from 'react';
import { Form, Label, Input,
         Modal, ModalBody, 
         Card, CardBody, 
         FormGroup, Button,
         Row, Col 
       } from 'reactstrap';
import axios from 'axios';

import './RecipeForm.css';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      picture: "",
      steps: [{ name: ""}],
      ingredients: [{ name: ""}],
      cuisson:""
    }
  }

  // TITLE
  // ------------
  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  // PICTURE
  // ------------
  handleChangePicture = (event) => {
    this.setState({ picture: event.target.value })
  }

  // INGREDIENTS LIST
  // ------------
  handleIngredientNameChange = (idx) => (event) => {
    const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, name: event.target.value };
    });
    this.setState({ ingredients: newIngredient });
  }

  handleAddIngredient = () => {
    this.setState({ ingredients: this.state.ingredients.concat([{ name: '' }]) });
  }
  
  handleRemoveIngredient = (idx) => () => {
    this.setState({ ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx) });
  }

  // RECIPE STEPS
  // ------------
  handleStepNameChange = (idx) => (event) => {
    const newStep = this.state.steps.map((step, sidx) => {
      if (idx !== sidx) return step;
      return { ...step, name: event.target.value };
    });
    this.setState({ steps: newStep });
  }

  handleAddStep = () => {
    this.setState({ steps: this.state.steps.concat([{ name: '' }]) });
  }

  handleRemoveStep = (idx) => () => {
    this.setState({ steps: this.state.steps.filter((s, sidx) => idx !== sidx) });
  }

  // SUBMIT FORM TO API
  // ------------
  handleSubmit = () => {
    axios.post("http://localhost:8000/recettes/new",{
      title: this.state.title,
      picture: this.state.picture,
      steps: this.state.steps,
      ingredients: this.state.ingredients,
      cuisson: this.state.cuisson
      })
    .then((res) => {
    console.log(res)
    })
    .catch((err) => {
    console.log(err);
    });
}

  render() {
    return (
    <div>
      <Modal 
        isOpen={this.props.recipeForm} 
        toggle={this.props.handleChangeRecipeForm} 
        className="modal-add-recipe"
      >
        <ModalBody className="modal-form" toggle={this.props.handleChangeRecipeForm}>
          <Card>
            <CardBody >
              <Form className="content-form">
                <FormGroup>
                  <h6 className="recipeTitle text-uppercase text-center">titre de la recette</h6>
                  <Input type="text" 
                         title="title" 
                         id="recipeTitle" 
                         placeholder="Titre de la recette" 
                         className="field" 
                         value={this.state.title} 
                         onChange={this.handleChangeTitle}
                  />
                </FormGroup>
                <FormGroup>
                  <h6 className="recipeTitle text-uppercase text-center"></h6>
                  <Input type="text" 
                         title="picture" 
                         placeholder="Url de la photo" 
                         className="field" 
                         value={this.state.picture} 
                         onChange={this.handleChangePicture}
                  />
                </FormGroup>
                <h6 className="labelTitle text-uppercase text-center">ingredients</h6>
                <div className="text-center"> 
                  <Button outline color="primary" onClick={this.handleAddIngredient} className="small addRecipeButton"></Button>
                </div>
                {this.state.ingredients.map((ingredient, idx) => (
                  <div className="step">
                    <Row>
                      <Col md={6}>
                        <Input
                          type="text"
                          placeholder={`Ingredient ${idx + 1}`}
                          value={ingredient.name}
                          onChange={this.handleIngredientNameChange(idx)}
                          className="InputAddRecipe"
                          name="ingredients"
                        />
                        <a className="btn" onClick={this.handleRemoveIngredient(idx)} className="small float-right removeStepButton">
                          <img src="https://image.flaticon.com/icons/svg/1168/1168643.svg" className="removeStepButton"/>
                        </a>
                      </Col>
                      <Col md={6}> 
                        <Input 
                          type="text"
                          placeholder="quantité"
                        />
                      </Col> 
                    </Row>
                  </div>
                  ))} 
                  <h6 className="labelTitle text-uppercase text-center">saison</h6> 
                  <Row>
                    <Col md={3} className="text-center">
                      <img src="https://image.flaticon.com/icons/svg/186/186094.svg" className="seasonIcon"/>
                      <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                    <Col md={3} className="text-center">
                      <img src="https://image.flaticon.com/icons/svg/1375/1375195.svg" className="seasonIcon"/>
                      <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                    <Col md={3} className="text-center">
                      <img src="https://image.flaticon.com/icons/svg/1147/1147560.svg" className="seasonIcon"/>
                      <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                    <Col md={3} className="text-center">
                      <img src="https://image.flaticon.com/icons/svg/1337/1337709.svg" className="seasonIcon"/>
                      <FormGroup tag="fieldset">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" />{' '}
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>          
                  <h6 className="labelTitle text-uppercase text-center">etapes de préparation</h6>
                  <div className="text-center">
                    <Button outline color="primary" onClick={this.handleAddStep} className="small addRecipeButton"></Button>
                  </div>
                  {this.state.steps.map((step, idx) => (
                    <div className="step">
                      <Input
                        type="textarea"
                        placeholder={`Etape ${idx + 1}`}
                        value={step.name}
                        onChange={this.handleStepNameChange(idx)}
                        className="InputAddRecipe"
                      />
                      <a className="btn" onClick={this.handleRemoveStep(idx)} className="small float-right removeStepButton">
                        <img src="https://image.flaticon.com/icons/svg/1168/1168643.svg" className="removeStepButton"/>
                      </a>
                    </div>
                    ))}  
                  <h6 className="labelTitle text-uppercase text-center">cuisson</h6>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Input type="text" name="text" id="recipeTitle" placeholder="temps de cuisson" className="field" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Input type="text" name="text" id="recipeTitle" placeholder="thermostat" className="field" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <a onClick={this.handleSubmit} className="btn">
                      <img src="https://image.flaticon.com/icons/svg/226/226972.svg" className="submitButton"/>
                    </a > 
                  </div>          
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
    );
  }
}

export default RecipeForm;
