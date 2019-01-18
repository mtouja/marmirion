import React, { Component } from 'react'; 
import { Card, CardImg, CardBody, CardTitle, Button, Modal, ModalBody, Col } from 'reactstrap';


import './Recette.css'

class Recette extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false 
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Col sm="4">
        <div className="container cart-deck mb-3">
          <Card body inverse style={{ background: "#1C2036" ,borderColor: '#FFF' }} className="view overlay zoom">
            <CardImg top src={this.props.picture} alt='recette picture' className="w-100 mx-auto d-block" />
              <img src={this.props.icon} className="icon mt-3"/>
            <CardBody>
            <CardTitle className="title-recette mt-3" style={{minHeight: 38 +'px'}}>{this.props.title}</CardTitle>
              <div className="d-flex justify-content-center align-items-center">
                <Button outline size="lg" className="mb-3 details" onClick={this.toggle}>{this.props.buttonLabel}Faire cette recette</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody className="description" toggle={this.toggle}>
                      <Card>
                        <CardTitle className="mt-3 etapes">ingredients</CardTitle>
                        <CardBody>
                          {this.props.ingredients.map((item, index) => {
                            return(
                              <div>
                                <p className="ml-3 mt-3 mb-3">{item.name}{':'}{' '}{item.quantité}{' '}{item.unity}</p>
                              </div>
                            )
                          })}
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody className="p-3">
                          <img src='https://image.flaticon.com/icons/svg/186/186146.svg' className="marmite"/>
                            {this.props.steps.map((details, index) => {
                              return(
                                <div>
                                  <p p className="ml-3 mt-3 mb-3"><strong>{details.name}</strong></p>
                                  <p p className="ml-3 mt-3 mb-3">{details.description}</p>
                                </div>
                              )
                          })}
                          <div>
                          {this.props.temps.map((details, index) => {
                              return(
                                <div className="text-center">
                                  {details.thermostat ? 
                                    <img src="https://image.flaticon.com/icons/svg/808/808444.svg" className="baking"/>
                                    :
                                    <img src="https://image.flaticon.com/icons/svg/264/264018.svg" className="baking"/>
                                  }                                  
                                  <p p className="ml-3 mt-3 mb-3">{details.duree}{' min'}</p>
                                  <h6 p className="ml-3 mt-3 mb-3">{details.thermostat ? details.thermostat + ' °C' : null}</h6>
                                </div>
                              )
                          })}
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <Button color="secondary" className="mt-4 mb-3 details" onClick={this.toggle}>Retour à la liste</Button>
                          </div>
                        </CardBody>
                      </Card>
                    </ModalBody>
                  </Modal>
              </div>               
            </CardBody> 
          </Card> 
        </div>
      </Col>
    )
  }
}

export default Recette;
