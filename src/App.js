import React, { Component } from 'react';
import './style.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

export default class App extends Component {

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
                            <SearchBar />
                        </div>
                        <div className="col">
                            <SortButton />
                        </div>
                    </div>
                </div>

                <Loading />
                <SearchResults />
                <Footer />
            </>
        );
    }
}

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <a href="#explore"><img className="logo" src="img/book.png" alt="book logo" /></a>
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

class PageTitle extends Component {
    render() {
        let title = this.props.title;
        return (
            <h2 className="page-title">{title}</h2>
        );
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

class BookCard extends Component {
    render() {
        let bookInfo = this.props.bookInfo;
        let pages = bookInfo.pageCount + " pages";
        let rating = bookInfo.rating + " out of 5 stars";

        return (
            <Card id="search" className="text-center mb-8 border-lightgray mt-4" style={{ height: '500', width: '300' }}>
                <Card.Body>
                    <Card.Text></Card.Text>
                    <Card.Img variant="top" src={bookInfo.imgLink} alt="Book cover" className="rounded mt-3" />
                    <div className="card-body text-dark">
                        <h4 className="card-text card-booktitle">{bookInfo.title}</h4>
                        <h5 className="card-text card-author">{bookInfo.authors}</h5>
                        <h6 className="card-text card-pages">{pages}</h6>
                        <p className="card-text card-rating">{rating}</p>
                        <p className="bottom-buffer"></p>
                        <Button href={bookInfo.url} variant="primary">Learn More</Button>{' '}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

class SearchResults extends Component {
    render() {
        let bookInfo = {
            title: "Book Title",
            authors: "Author Name(s)",
            imgLink: "https://via.placeholder.com/150",
            rating: "4.57",
            pageCount: "230",
            url: "#",
            isbn10: "isbn10",
            isbn13: "isbn13"
        }
        return (
            <div className="container-fluid">
                <div className="card-columns">
                    <div className="search-results text-center">
                        <BookCard bookInfo={bookInfo} />
                    </div>
                </div>
            </div>
        );
    }
}

class SearchBar extends Component {
    render() {
        return (
            <div className="search-box">
                {/* https://react-bootstrap.github.io/components/input-group/
                <InputGroup className="mb-3">
                    <FormControl placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <InputGroup.Append>
                        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                */}

                <div className="input-group mb-3 form-inline">
                    <input id="search-value" type="text" className="form-control"
                        placeholder="Search books" />
                    <div className="input-group-append">
                        <Button variant="primary" id="search-button" className="btn btn-secondary btn-small" type="submit">
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </Button>{' '}
                    </div>
                </div>
            </div>
        );
    }
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

class SortButton extends Component {
    render() {
        return (
            <DropdownButton id="dropdown-basic-button" size="sm" variant="secondary" title="Sort">
                <Dropdown.Item>Sort By Pages</Dropdown.Item>
                <Dropdown.Item>Sort By Rating</Dropdown.Item>
                <Dropdown.Item>Sort By Price</Dropdown.Item>
            </DropdownButton>
        );
    }
}

// class dataFetch extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             isLoaded: false,
//             items: []
//         };
//     }

//     componentDidMount() {
//         let search = document.getElementById("search-value").value;
//         fetch("https://www.googleapis.com/books/v1/volumes?q=" + search)
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     this.setState({
//                         isLoaded: true,
//                         items: result.items
//                     });
//                 },
//                 // Note: it's important to handle errors here
//                 // instead of a catch() block so that we don't swallow
//                 // exceptions from actual bugs in components.
//                 (error) => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             )
//     }

//     render() {
//         const { error, isLoaded, items } = this.state;
//         if (error) {
//             return <div>Error: {error.message}</div>;
//         } else if (!isLoaded) {
//             return <div>Loading...</div>;
//         } else {
//             return (
//                 <ul>
//                     {items.map(item => (
//                         <li key={item.name}>
//                             {item.name} {item.price}
//                         </li>
//                     ))}
//                 </ul>
//             );
//         }
//     }
// }