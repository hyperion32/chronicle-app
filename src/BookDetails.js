import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            book: undefined
        };
    }

    componentDidMount() {
        let bookId = this.props.match.params.bookId;

        this.getBookFromId(bookId);
    }

    getBookFromId = (id) => {
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + id)

            .then(res => res.json())
            .then(
                (result) => {
                    ;
                    this.setState({
                        isLoaded: true,
                        book: result.items[0]
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            // information sources
            let bookInfo = this.state.book;
            let volumeInfo = bookInfo.volumeInfo;

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <Heading title={volumeInfo.title} authors={volumeInfo.authors} rating={volumeInfo.averageRating}
                                imgLink={volumeInfo.imageLinks.thumbnail} />
                        </div>
                        <div className="buffer col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Description description={volumeInfo.description} link={volumeInfo.infoLink}/>
                        </div>
                        <div className="buffer col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <QuickInfo info={this.state.book} />
                        </div>
                        <div className="buffer col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ActionButtons />
                        </div>
                        <div className="buffer col"></div>
                    </div>
                </div>
            );
        }
    }
}

class Heading extends Component {
    render() {
        return (
            <header>
                <img src={this.props.imgLink} className="details book-cover" alt="Book cover" />
                <h2 className="title" >{this.props.title}</h2>
                <h3 className="author">{this.props.authors}</h3>
                <p>{this.props.rating} out of 5 stars</p>
                {/* <div className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                </div> */}
            </header>
        );
    }
}

class Description extends Component {
    
    render() {
        return (
            <>
                <h3>Description</h3>
                <p>{this.props.description}</p>
                <Button variant="light" className="float-left mb-3" type="reset">See more from {this.props.authors}</Button>{' '}
            </>
        );
    }
}

class QuickInfo extends Component {
    render() {
        let volumeInfo = this.props.info.volumeInfo;
        let saleInfo = this.props.info.saleInfo;
        let lang = volumeInfo.language.toUpperCase();

        let identifiers = volumeInfo.industryIdentifiers.map((identifier) => {
            return <li key={identifier.type}>{identifier.type}: {identifier.identifier}</li>
        });

        let retailDetails;
        if (saleInfo.saleability === "FOR_SALE") {
            retailDetails = <li>Retail Price: {saleInfo.retailPrice.amounte} {saleInfo.retailPrice.currencyCode}</li>
        } else {
            retailDetails = <li>Retail Price: Not for sale</li>
        }

        return (
            <>
                <h3>Quick Info</h3>
                <ul>
                    <li>Rating: {volumeInfo.averageRating}/5</li>
                    <li>Length: {volumeInfo.pageCount} pages</li>
                    <li>Language: {lang}</li>
                    <li>Published: {volumeInfo.publishedDate}</li>
                    {retailDetails}
                    <li>Genre: {volumeInfo.categories}</li>
                    <li>Identifiers:</li>
                    <ul>
                        {identifiers}
                    </ul>
                </ul>
            </>
        );
    }
}

class ActionButtons extends Component {

    render() {
        return (
            <Form className="mb-3">
                <p></p>
                <Link to="/"><Button variant="light" className="float-left mt-4" type="reset">Close</Button>{' '}</Link>
                <DropdownButton variant="info" className="float-right" type="submit" title="Add to List">
                    <Dropdown.Item>Favorites</Dropdown.Item>
                    <Dropdown.Item>Fun</Dropdown.Item>
                    <Dropdown.Item>Honors 230...</Dropdown.Item>
                    <Dropdown.Item>Professional...</Dropdown.Item>
                    <Dropdown.Item>Recommended</Dropdown.Item>
                    <Dropdown.Item>Work</Dropdown.Item>
                </DropdownButton>
            </Form>
        );
    }
}

export default BookDetails;