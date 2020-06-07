import React, { Component } from 'react';
import BookList from './BookList';
import LogContainer from './ReadingLog';
import ListsContainer from './ReadingList';
import Account from './Account.js';
import './style.css';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';

// import firebase from 'firebase/app';

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
                    <Route path="/account" render={Account} />
                    <Redirect to="/" />
                </Switch>
                <Footer />
                {/* <div>
                    <Account />
                </div> */}
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

export default App;