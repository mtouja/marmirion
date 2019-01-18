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
      ingredients: [{ name: ""}, { quantité: 0 }],
      steps: [{ name: ""}, { description: ""}],
      temps: [{ name: ""}, { duree: 0 }, { thermostat: 0 }]
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

  handlequantityChange = (idx) => (event) => {
    const newQuantity = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      return { ...ingredient, quantité: event.target.value };
    });
    this.setState({ ingredients: newQuantity });
  }

  handleChangeTemps = (idx) => (event) => {
    const newTemps = this.state.temps.map((temp, sidx) => {
      if (idx !== sidx) return temp;
      return { ...temp, duree: event.target.value };
    });
    this.setState({ temps: newTemps });
  }

  handleAddIngredient = () => {
    this.setState({ ingredients: this.state.ingredients.concat([{ name: '' }]) });
  }
  
  handleRemoveIngredient = (idx) => () => {
    this.setState({ ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx) });
  }

  // QUANTITY
  // ------------
  handleQuantityChange = (idx) => (event) => {
    const newQuantity = this.state.ingredients.map((test, sidx) => {
      if (idx !== sidx) return test;
      return { ...test, quantité: event.target.value };
    });
    this.setState({ ingredients: newQuantity });
  }

  handleAddQuantity = (event) => {
    this.setState({ quantité: this.state.ingredients.quantité })
  }

  // UNITY
  // ------------
  handleUnityChange = (idx) => (event) => {
    const newUnity = this.state.ingredients.map((test, sidx) => {
      if (idx !== sidx) return test;
      return { ...test, unity: event.target.value };
    });
    this.setState({ ingredients: newUnity });
  }

  handleAddUnity = (event) => {
    this.setState({ unity: this.state.ingredients.unity })
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

  handleAddField = () => {
    this.handleAddIngredient();
    this.handleAddQuantity();
    this.handleAddUnity();
  }

  // BAKING
  // ------------
  // handleBakingChange = (event) => {
  //   this.setState({ duree: this.state.temps.duree })  
  // }

  // SUBMIT FORM TO API
  // ------------
  handleSubmit = () => {
    console.log(this.state.title,this.state.picture,this.state.ingredients,this.state.steps,this.state.temps)
    axios.post("http://localhost:8000/recettes/new",{
      title: this.state.title,
      picture: this.state.picture,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      temps: this.state.temps
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
                  <Input type="url" 
                         title="picture" 
                         placeholder="Url de la photo" 
                         className="field" 
                         value={this.state.picture} 
                         onChange={this.handleChangePicture}
                  />
                </FormGroup>
                <h6 className="labelTitle text-uppercase text-center">ingredients</h6>
                <div className="text-center"> 
                  <Button outline color="primary" onClick={this.handleAddField} className="small addRecipeButton"></Button>
                </div>
              <Row>
                <Col md={4}>
                {this.state.ingredients.map((ingredient, idx) => (
                  <div className="step">
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder={`Ingredient ${idx + 1}`}
                        value={ingredient.name}
                        onChange={this.handleIngredientNameChange(idx)}
                        className="InputAddRecipe"
                        name="ingredients"
                      />
                    </FormGroup>
                    <a className="btn" onClick={this.handleRemoveIngredient(idx)} className="small float-right removeStepButton">
                      <img src="https://image.flaticon.com/icons/svg/1168/1168643.svg" className="removeStepButton"/>
                    </a>
                  </div>
                  ))}
                  </Col>
                  <Col md={4}>
                  {this.state.ingredients.map((ingredient, idx) => (
                    <div className="step">
                      <FormGroup>
                        <Input
                          type="number"
                          placeholder="quantité"
                          value={ingredient.quantité}
                          onChange={this.handleQuantityChange(idx)}
                          className="InputAddRecipe"
                          name="quantity"
                        />
                      </FormGroup>
                    </div>
                  ))}
                  </Col>
                  <Col md={4}>
                  {this.state.ingredients.map((ingredient, idx) => (
                    <div className="step">
                      <FormGroup>
                        <Input
                          type="text"
                          placeholder="unité de mesure"
                          value={ingredient.unity}
                          onChange={this.handleUnityChange(idx)}
                          className="InputAddRecipe"
                          name="unity"
                        />
                      </FormGroup>
                    </div>
                  ))}
                  </Col>
                </Row>
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
                      value={step.description}
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
                    {this.state.temps.map((temp, idx) => (
                      <div className="step">
                        {/* <FormGroup> */}
                          <Input 
                            key={idx}
                            type="number" 
                            name="temps" 
                            id="recipeTitle" 
                            placeholder="temps de cuisson"
                            value={temp.duree} 
                            onChange={this.handleChangeTemps(idx)}
                            className="field" />
                        {/* </FormGroup> */}
                      </div>
                    ))}
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Input 
                          type="text" 
                          name="thermostat" 
                          id="recipeTitle" 
                          placeholder="thermostat" 
                          className="field" />
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
