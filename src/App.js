import React, { Component } from 'react';
import BookList from './BookList';
import LogContainer from './ReadingLog';
import ListsContainer from './ReadingList';
import BookDetails from './BookDetails';
import Account from './Account.js';
import './style.css';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import firebase from 'firebase/app';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showSignForm: true,
            userRef: undefined
        }
    }


    updateUserRef = (firebaseUser) => {
        this.setState({ userRef: firebase.database().ref("users/" + firebaseUser.uid) });
    }

    render() {
        let renderLogContainer = (props) => <LogContainer {...props} sessions={this.props.sessions} lists={this.props.lists} userRef={this.state.userRef} />
        let renderListsContainer = (props) => <ListsContainer {...props} lists={this.props.lists} userRef={this.state.userRef} />
        let renderAccount = (props) => <Account {...props} updateUserRef={this.updateUserRef} />

        let content = null;
        if (this.state.showSignForm) {
            content = <Account />
        } else {
            //...
        }

        return (
            <>
                <NavigationBar />
                <Switch>
                    <Route exact path="/" component={Loading, BookList} />
                    <Route path="/log" render={Loading, renderLogContainer} />
                    <Route path="/lists" render={Loading, renderListsContainer} />
                    <Route path="/account" render={renderAccount} />
                    <Route path="/book-details/:bookId" component={BookDetails} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
            </>
        );
    }
}

class NavigationBar extends Component {
    render() {
        return (
            <header>
                <div className="header-div">
                    <Navbar expand="lg">
                        <img className="logo mr-4" src="img/book.png" alt="book logo" />
                        <Navbar.Brand><NavLink exact to='/' className="navLink">Chronicle</NavLink></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link><NavLink exact to='/' className="navLink" >Explore</NavLink></Nav.Link>
                                <Nav.Link><NavLink exact to='/log' className="navLink" >Log</NavLink></Nav.Link>
                                <Nav.Link><NavLink exact to='/lists' className="navLink">Lists</NavLink></Nav.Link>
                                <Nav.Link><NavLink exact to='/account' className="navLink">Account</NavLink></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </header>
        )
    }
}

class Loading extends Component {
    render() {
        return (
            <div className="loading-icon">
                <i className="d-none fa fa-spinner fa-spin fa-lg" aria-hidden="true"></i>
            </div>
        )
    };
}

class Footer extends Component {
    render() {
        return (
            <>
                <footer>
                    <p>Copyright&copy; 2020 | Lisi Case and Greyson Fields</p>
                    <p>Contact: Lisi Case <a href="mailto:casee@uw.edu">casee@uw.edu</a> | Greyson Fields <a
                        href="mailto:gfields5@uw.edu">gfields5@uw.edu</a></p>
                    <p>Data from <a href="https://developers.google.com/books/docs/overview">Google Books API</a></p>
                </footer>
            </>
        );
    }
}

export default App;