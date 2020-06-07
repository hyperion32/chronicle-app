import React, { Component } from 'react';
import BookList from './BookList';
import LogContainer from './ReadingLog';
import ListsContainer from './ReadingList';
// import Account from './Account.js';
import './style.css';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';

import firebase from 'firebase/app';


// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Form from 'react-bootstrap/Form';
// import NavBar from 'react-bootstrap/Navbar';

// import SearchResults from './SearchResults';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = { showSignForm: true }
    }

    render() {
        let renderLogContainer = (props) => <LogContainer {...props} sessions={this.props.sessions} lists={this.props.lists} />
        let renderListsContainer = (props) => <ListsContainer {...props} lists={this.props.lists} />

        let content = null;
        if (this.state.showSignForm) {
            content = <Account />
        } else {
            //...
        }

        return (
            <>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={Loading, BookList} />
                    <Route path="/log" render={Loading, renderLogContainer} />
                    <Route path="/lists" render={Loading, renderListsContainer} />
                    <Route path="/account" render={Loading, Account} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
                <div>
                    <Account />
                </div>
            </>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <header>
                <div className="header-div">
                    <a href="#explore"><img className="logo" src="img/book.png" alt="book logo" /></a>
                    <h3><NavLink exact to='/' className="navLink" activeClassName='activeLink'>Chronicle</NavLink></h3>
                    <p><NavLink exact to='/' className="navLink" activeClassName='activeLink'>Explore</NavLink></p>
                    <p><NavLink exact to='/log' className="navLink" activeClassName='activeLink'>Log</NavLink></p>
                    <p><NavLink exact to='/lists' className="navLink" activeClassName='activeLink'>Lists</NavLink></p>
                    <p><NavLink exact to='/account' className="navLink" activeClassName='activeLink'>Account</NavLink></p>
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

class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            username: '',
            user: null,
        };
    }

    componentDidMount() {

        //when I signed in or signed out
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) { //if exists, then we logged in
                console.log("Logged in as", firebaseUser.email);
                this.setState({ user: firebaseUser })
            } else {
                console.log("Logged out");
                this.setState({ user: null })
            }
        })

    }

    //A callback function for registering new users
    handleSignUp = () => {
        this.setState({ errorMessage: null }); //clear old error

        console.log("Creating user", this.state.email);

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(user);

                let updatePromise = user.updateProfile({ displayName: this.state.username })
                return updatePromise;
            })
            .then(() => {
                this.setState((prevState) => {
                    let updatedUser = { ...prevState.user, displayName: this.state.username }
                    return { user: updatedUser }; //updating the state
                });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.message });
            })

    }

    //A callback function for logging in existing users
    handleSignIn = () => {
        this.setState({ errorMessage: null }); //clear old error

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((err) => {
                this.setState({ errorMessage: err.message });
            })
    }

    //A callback function for logging out the current user
    handleSignOut = () => {
        this.setState({ errorMessage: null }); //clear old error

        firebase.auth().signOut()

    }

    handleChange = (event) => {
        let field = event.target.name; //which input
        let value = event.target.value; //what value

        let changes = {}; //object to hold changes
        changes[field] = value; //change this field
        this.setState(changes); //update state
    }

    render() {
        return (
            <div className="container">
                <h2>Sign up!</h2>

                {/* Only included if first clause is true */}
                {this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                }

                {this.state.user &&
                    <div className="alert alert-success"><h3>Logged in as {this.state.user.displayName}</h3></div>
                }

                <div className="form-group">
                    <label>Email:</label>
                    <input className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Username:</label>
                    <input className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group mb-5">
                    <button className="btn btn-primary mr-2" onClick={this.handleSignUp}>
                        Sign Up
                </button>
                    <button className="btn btn-success mr-2" onClick={this.handleSignIn}>
                        Sign In
                </button>
                    <button className="btn btn-warning mr-2" onClick={this.handleSignOut}>
                        Sign Out
                </button>
                </div>
            </div>
        );
    }
}

export default App;