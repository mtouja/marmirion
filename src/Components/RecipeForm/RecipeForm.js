import React, { Component } from 'react';
import { Form, Input,
         Modal, ModalBody, 
         Card, CardBody, 
         FormGroup, Button,
         Row, Col 
       } from 'reactstrap';
import axios from 'axios';

import './RecipeForm.css';

export const saison = {
  PRINTEMPS: { nom: "printemps", icone: "https://image.flaticon.com/icons/svg/186/186094.svg" },
  ETE: { nom: "ete" , icone: "https://image.flaticon.com/icons/svg/1375/1375195.svg" },
  AUTOMNE: { nom: "automne", icone: "https://image.flaticon.com/icons/svg/1147/1147560.svg" },
  HIVER: { nom: "hiver", icone: "https://image.flaticon.com/icons/svg/1337/1337709.svg" },
  AUTRE: { nom: "autre", icone: "https://image.flaticon.com/icons/svg/985/985542.svg" },
  DESSERT: { nom: "dessert", icone: "https://image.flaticon.com/icons/svg/1375/1375194.svg" },
}

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      picture: "",
      ingredients: [{ name: "",  quantité: 0 }],
      steps: [{ name: "", description: "" }],
      temps: [{ name: "", duree: 0, thermostat: 0 }],
      saison:"",
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

  // SAISON
  // ------------
  handleChangeSaison = (event) => {
    this.setState({ saison: event.target.value})
  }

  // INGREDIENTS 
  // ------------name
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

  // INGREDIENTS
  // ------------quantité
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

  // INGREDIENTS
  // ------------ unity
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

  // STEPS
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

  // TEMPS
  // ------------ duree
  handleChangeTemps = (idx) => (event) => {
    const newTemps = this.state.temps.map((temp, sidx) => {
      if (idx !== sidx) return temp;
      return { ...temp, duree: event.target.value };
    });
    this.setState({ temps: newTemps });
  }

  // ------------ thermostat
  handleChangeThermostat = (idx) => (event) => {
    const newTemps = this.state.temps.map((temp, sidx) => {
      if (idx !== sidx) return temp;
      return { ...temp, thermostat: event.target.value };
    });
    this.setState({ temps: newTemps });
  }

  handleAddField = () => {
    this.handleAddIngredient();
    this.handleAddQuantity();
    this.handleAddUnity();
  }

  // SUBMIT FORM TO API
  // ------------
  handleSubmit = () => {
    console.log(this.state.saison)
    let data_to_submit = {
      title: this.state.title,
      picture: this.state.picture,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      temps: this.state.temps,
      saison: this.state.saison
    };
    axios.post(
      "http://localhost:8000/recettes/new",
      data_to_submit,
    );
  }

  render() {
    return (
    <div>
      <Modal 
        isOpen={this.props.recipeForm} 
        toggle={this.props.handleChangeRecipeForm} 
        className="modal-add-recipe">
        <ModalBody className="modal-form" toggle={this.props.handleChangeRecipeForm}>
          <Card>
            <CardBody >
              <Form className="content-form">
                <FormGroup>
                  <h6 className="recipeTitle text-uppercase text-center">titre de la recette</h6>
                  <Input 
                    type="text" 
                    title="title" 
                    id="recipeTitle" 
                    placeholder="Titre de la recette" 
                    className="field" 
                    value={this.state.title} 
                    onChange={this.handleChangeTitle}
                  />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="url" 
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
              <Row md={12}>
                <Col >
                {this.state.ingredients.map((ingredient, idx) => (
                  <div className="step" key={idx}>
                    <FormGroup>
                      <Input
                        key={idx}
                        type="text"
                        placeholder={`Ingredient ${idx + 1}`}
                        value={ingredient.name}
                        onChange={this.handleIngredientNameChange(idx)}
                        className="InputAddRecipe"
                        name="ingredients"
                      />
                    </FormGroup>
                  </div>
                  ))}
                  </Col>
                  <Col >
                  {this.state.ingredients.map((ingredient, idx) => (
                    <div className="step" key={idx}>
                      <FormGroup>
                        <Input
                          key={idx}
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
                  <Col >
                  {this.state.ingredients.map((ingredient, idx) => (
                    <div className="step" key={idx}>
                      <FormGroup>
                        <Input
                          key={idx}
                          type="text"
                          placeholder="unité"
                          value={ingredient.unity}
                          onChange={this.handleUnityChange(idx)}
                          className="InputAddRecipe"
                          name="unity"
                        />
                      </FormGroup>
                      {/* TODO button iso a */}
                      <a className="btn" onClick={this.handleRemoveIngredient(idx)} className="small float-right removeStepButton">
                        <img src="https://image.flaticon.com/icons/svg/1168/1168643.svg" className="removeStepButton" alt="remove button"/>
                      </a>
                    </div>
                  ))}
                  </Col>
                </Row>
                <h6 className="labelTitle text-uppercase text-center">categorie</h6> 
                <FormGroup 
                  tag="fieldset"
                  onChange={this.handleChangeSaison}>
                  <Row md={12} className="d-flex justify-content-center">
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            value={saison.PRINTEMPS.nom}
                          />
                        </FormGroup>
                        <img src={saison.PRINTEMPS.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions" 
                            value={saison.ETE.nom}
                          />
                        </FormGroup>
                        <img src={saison.ETE.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions"  
                            value={saison.AUTOMNE.nom}
                          />
                        </FormGroup>
                        <img src={saison.AUTOMNE.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                  </Row>
                  <Row md={12} className="d-flex justify-content-center">
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions"  
                            value={saison.HIVER.nom}
                          />
                        </FormGroup>
                        <img src={saison.HIVER.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions"  
                            value={saison.DESSERT.nom}
                          />
                        </FormGroup>
                        <img src={saison.DESSERT.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div class="form-check form-check-inline">
                        <FormGroup check>
                          <Input 
                            class="form-check-input" 
                            type="radio" 
                            name="inlineRadioOptions"  
                            value={saison.AUTRE.nom}
                          />
                        </FormGroup>
                        <img src={saison.AUTRE.icone} className="seasonIcon" alt="season icon"/>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>          
                <h6 className="labelTitle text-uppercase text-center">etapes de préparation</h6>
                <div className="text-center">
                  <Button outline color="primary" onClick={this.handleAddStep} className="small addRecipeButton"></Button>
                </div> 
                {this.state.steps.map((step, idx) => (
                  <div className="step" key={idx}>
                    <Input
                      key={idx}
                      type="textarea"
                      placeholder={`Etape ${idx + 1}`}
                      value={step.description}
                      onChange={this.handleStepNameChange(idx)}
                      className="InputAddRecipe"
                    />
                    <a className="btn" onClick={this.handleRemoveStep(idx)} className="small float-right removeStepButton">
                      <img src="https://image.flaticon.com/icons/svg/1168/1168643.svg" className="removeStepButton" alt="remove button"/>
                    </a>
                  </div>
                  ))}  
                  <h6 className="labelTitle text-uppercase text-center">cuisson</h6>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                      {this.state.temps.map((temp, idx) => (
                        <div className="step" key={idx}>
                          <Input 
                            key={idx}
                            type="number" 
                            name="temps" 
                            placeholder="temps de cuisson"
                            value={temp.duree} 
                            onChange={this.handleChangeTemps(idx)}
                          />
                        </div>
                      ))}
                      </Col>
                      <Col md={6}>
                      {this.state.temps.map((temp, idx) => (
                          <Input 
                            key={idx}
                            type="number" 
                            name="thermostat" 
                            value={temp.thermostat}
                            placeholder="thermostat" 
                            onChange={this.handleChangeThermostat(idx)}
                          />
                      ))}
                      </Col>
                    </Row>
                  </FormGroup>
                  <div className="text-center">
                    <Button onClick={this.handleSubmit} className="btn" color="success">
                      {/* <img src="https://image.flaticon.com/icons/svg/226/226972.svg" className="submitButton"/> */}
                        <p className="text-uppercase">valider</p>
                    </Button > 
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
