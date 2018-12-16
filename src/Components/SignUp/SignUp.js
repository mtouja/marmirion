import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardFooter, 
         Form, FormGroup, Label, Input, 
         Col, Row, Button } from 'reactstrap';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      password: "",
      password2: "",
      email: ""
    }

    this.disabledSubmitButton = true;
  }
  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default SignUp;