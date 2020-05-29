import React, { Component } from 'react';
import './style.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class App extends Component {
  
    render() {
        return (
            <>
            <NavBar />
            </>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="#explore">Chronicle</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <NavLinks />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

class NavLinks extends Component {
    render() {
        return (
            <Nav className="mr-auto">
                <Nav.Link href="#explore">Explore</Nav.Link>
                <Nav.Link href="#log">Log</Nav.Link>
                <Nav.Link href="#lists">Lists</Nav.Link>
                <Nav.Link href="#objectives">Objectives</Nav.Link>
                <Nav.Link href="#account">Account</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
            </Nav>
        );
    }
}