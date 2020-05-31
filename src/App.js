import React, { Component } from 'react';
import BookList from './BookList';
import LogContainer from './ReadingLog';
import ListsContainer from './ReadingList';
import './style.css';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
// import InputGroup from 'react-bootstrap/InputGroup';
// import FormControl from 'react-bootstrap/FormControl';
// import Form from 'react-bootstrap/Form';

class App extends Component {

    render() {
        return (
            <>
                <NavBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <PageTitle title="Explore" />
                        </div>
                        <div className="col">
                            {/* <SearchBar /> */}
                        </div>
                        <div className="col">
                            {/* <SortButton /> */}
                        </div>
                    </div>
                </div>

                {/* <Loading /> */}
                <BookList />
                {/* <Footer /> */}
                <LogContainer />
                <ListsContainer />
            </>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <header>
                <a href="#explore"><img className="logo" src="img/book.png" alt="book logo" /></a>
                <h1>Chronicle</h1>
            </header>
        );
    }
}

// class NavLinks extends Component {
//     render() {
//         return (
//             <Nav className="mr-auto">
//                 <Nav.Link href="#explore">Explore</Nav.Link>
//                 <Nav.Link href="#log">Log</Nav.Link>
//                 <Nav.Link href="#lists">Lists</Nav.Link>
//                 <Nav.Link href="#objectives">Objectives</Nav.Link>
//                 <Nav.Link href="#account">Account</Nav.Link>
//                 <Nav.Link href="#about">About</Nav.Link>
//             </Nav>
//         );
//     }
// }

class PageTitle extends Component {
    render() {
        let title = this.props.title;
        return (
            <div className="container-fluid">
                <h2 className="page-title">{title}</h2>
            </div>
        );
    }
}

// class Loading extends Component {
//     render() {
//         return (
//             <div className="loading-icon">
//                 <i className="d-none fa fa-spinner fa-spin fa-lg" aria-hidden="true"></i>
//             </div>
//         )
//     };
// }

// class Footer extends Component {
//     render() {
//         return (
//             <>
//                 <footer>
//                     <p>Copyright&copy; 2020 | Lisi Case and Greyson Fields</p>
//                     <p>Contact: Lisi Case <a href="mailto:casee@uw.edu">casee@uw.edu</a> | Greyson Fields <a
//                         href="mailto:gfields5@uw.edu">gfields5@uw.edu</a></p>
//                     <p>Data from <a href="https://developers.google.com/books/docs/overview">Google Books API</a></p>
//                 </footer>
//             </>
//         );
//     }
// }

// class SortButton extends Component {

//     sortClick() {
//         console.log("sort is clicked");
//     }

//     render() {
//         return <button onClick={this.sortClick}>Sort</button>;
//         // <DropdownButton id="dropdown-basic-button" size="sm" variant="secondary" title="Sort" onClick={this.sortClick}>
//         //     <Dropdown.Item>Sort By Pages</Dropdown.Item>
//         //     <Dropdown.Item>Sort By Rating</Dropdown.Item>
//         //     <Dropdown.Item>Sort By Price</Dropdown.Item>
//         // </DropdownButton>

//     }
// }

export default App;