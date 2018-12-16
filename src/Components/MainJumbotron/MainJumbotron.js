import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';




class MainJumbotron extends Component {
  render() {
    return (
      <div> 
        <FormGroup>
          <Input type="search" name="search" id="exampleSearch" placeholder="search"  className="mt-3" />
        </FormGroup>
      </div>
    )
  }
}

export default MainJumbotron;
