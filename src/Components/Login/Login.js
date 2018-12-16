import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Form, FormGroup, Label, Input, Col, Row, Button } from 'reactstrap';
import './Login.css'

class Login extends Component {
  render() {
    return (
    <Card className="card-login" className="mt-3 mb-3">
      <CardHeader tag="h3"><div className="display-4">Login</div></CardHeader>
      <Form onSubmit={this.submitLoginForm}>
        <CardBody>
          <Row form className="align-self-center">
            <Col md={12}>
              <FormGroup>
                <Label for="current-email">email</Label>
                <Input type="email" name="current-email" id="current-email" onChange={this.handleChangeEmail} />
              </FormGroup>
              <FormGroup>
                <Label for="current-password">password</Label>
                <Input type="password" name="password" id="current-password" onChange={this.handleChangePassword} />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-muted">
          <Button color="primary" type="submit">login</Button>
          <a color="link" href="/account/create" className="float-right">Create account</a>
        </CardFooter>
      </Form>
    </Card>
    )
  }
};

export default Login;
