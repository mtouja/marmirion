import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavbarToggler, NavLink, Nav, Collapse } from 'reactstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);


    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div >
        <Navbar color="faded fixed-top" light>
        <NavbarBrand className="title">Marmirion</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2 burger" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar color="faded">
              <NavItem> 
                <NavLink href="/par saison/" className="item">par saisons</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/par légume/" className="item">par ingredients</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/par légume/" className="item">login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/par légume/" className="item">about</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>    
      </div>
    );
  }
}

export default Navigation;
