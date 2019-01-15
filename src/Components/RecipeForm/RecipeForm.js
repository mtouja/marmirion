import React, { Component } from 'react';
import { Form, Label, Input,
         Modal, ModalBody, 
         Card, CardBody, 
         FormGroup, Button,
         Row, Col 
       } from 'reactstrap';

import './RecipeForm.css';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      steps: [{ name: ""}],
      ingredients: [{ name: ""}]
    }
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

  render() {
    return (
    <div>
      <Modal isOpen={this.props.recipeForm} toggle={this.props.handleChangeRecipeForm} className="modal-add-recipe">
        <ModalBody className="modal-form" toggle={this.props.handleChangeRecipeForm}>
          <Card>
            <CardBody >
              <Form className="content-form" onSubmit={this.handleSubmit} >
                <FormGroup>
                  <h6 className="recipeTitle text-uppercase text-center">titre de la recette</h6>
                  <Input type="text" name="text" id="recipeTitle" placeholder="Titre de la recette" className="field" value={this.state.value} onChange={this.handleChangeInput} />
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
                    <a className="btn">
                      <img src="https://image.flaticon.com/icons/svg/226/226972.svg" className="submitButton"/>
                    </a> 
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
