import React, { Component } from 'react';
import './style.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class App extends Component {
  
    render() {
        return (
            <>
            <NavBar />
            <BookCard />
            </>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <a href="#home"><img className="logo" src="img/book.png" alt="book logo"/></a>
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

class BookCard extends Component {
    render() {

      return (
        <Card id="search" className="mb-8 border-lightgray mt-4" style={{ height: '500', width: '300' }}>
            <div className="text-center">
                <p>Test</p>
                <img src="img/book.png" alt="Book cover" className="rounded mt-3"/>
                <div className="card-body text-dark">
                    <h4 className="card-booktitle">Title</h4>
                    <h5 className="card-text card-author">Author Name</h5>
                    <h6 className="card-text card-pages">Page Count</h6>
                    <p>Rating</p>
                    <p></p>
                    <Button variant="primary">Learn More</Button>{' '}
                </div>
            </div>
        </Card>
      )
    }
}
