import React, { Component } from 'react'; 
import { Card, CardImg, CardBody, CardTitle, Button, Modal, ModalBody } from 'reactstrap';


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
      <div >
        <Card body inverse style={{ background: "#1C2036" ,borderColor: '#FFF' }} className="view overlay zoom">
          <CardImg top src={this.props.picture} alt='recette picture' width= "500" className="img-fluid" />
            <img src={this.props.icon} className="icon mt-3"/>
          <CardBody>
          <CardTitle className="title-recette mt-3">{this.props.title}</CardTitle>
            <div className="d-flex justify-content-center align-items-center">
              <Button outline size="lg" className="mb-3 details" onClick={this.toggle}>{this.props.buttonLabel}Faire cette recette</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalBody className="description" toggle={this.toggle}>
                    <Card>
                      <CardBody>
                        {this.props.ingredients.map((item, index) => {
                          return <p className="ml-3 mt-3 mb-3">{item.name}{" "}{item.quantité}</p>
                        })}
                      </CardBody>
                    </Card>
                    <Card>
                      <CardTitle className="mt-3 etapes">étapes de préparation</CardTitle>
                      <CardBody className="p-3">
                        <img src='https://image.flaticon.com/icons/svg/186/186146.svg' className="marmite"/>
                        {this.props.instructions.map((details, index) => {
                        return <p p className="ml-3 mt-3 mb-3">{details.description}</p>
                        })}
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
    )
  }
}

export default Recette;
