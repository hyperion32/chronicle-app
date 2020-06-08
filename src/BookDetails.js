import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

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
        console.log("mounted");
        let bookId = this.props.match.params.bookId;

        this.getBookFromId(bookId);
    }

    getBookFromId = (id) => {
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + id)

            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result: ");
                    console.log(result.items[0]);
                    this.setState({
                        isLoaded: true,
                        book: result.items[0]
                    });
                    // this.setState(prevState => {
                    //     let shallowCopy = Object.assign({}, prevState.book);
                    //     return result.items[0];
                    //   })
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
        console.log("rendering...");

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            // information sources
            let bookInfo = this.state.book;
            let volumeInfo = bookInfo.volumeInfo;
            let saleInfo = bookInfo.saleInfo;

            // isbn
            let isbn10;
            let isbn13;
            if (volumeInfo.industryIdentifiers[0].type === "ISBN_10") {
                isbn10 = volumeInfo.industryIdentifiers[0].identifier;
                isbn13 = volumeInfo.industryIdentifiers[1].identifier;
            } else {
                isbn10 = volumeInfo.industryIdentifiers[1].identifier;
                isbn13 = volumeInfo.industryIdentifiers[0].identifier;
            }

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
                            <Description description={volumeInfo.description} />
                        </div>
                        <div className="buffer col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <QuickInfo rating={volumeInfo.averageRating} pageCount={volumeInfo.pageCount} language={volumeInfo.language}
                            publishedDate={volumeInfo.publishedDate} price={saleInfo.retailPrice.amount} currency={saleInfo.retailPrice.currencyCode}
                            categories={volumeInfo.categories} isbn10={isbn10} isbn13={isbn13} />
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
            <p><a href="#">See more from this author.</a></p>
            </>
        );
    }
}

class QuickInfo extends Component {
    render() {
        return (
            <>
            <h3>Quick Info</h3>
            <ul>
                <li>Rating: {this.props.rating}/5</li>
                <li>Length: {this.props.pageCount} pages</li>
                <li>Language: {this.props.language}</li>
                <li>Published: {this.props.publishedDate}</li>
                <li>Retail Price: {this.props.price} {this.props.currency}</li>
                <li>Genre: {this.props.categories}</li>
                <li>ISBN: {this.props.isbn10}, ISBN13: {this.props.isbn13}</li>
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
                <Button variant="light" className="float-left" type="reset">Close</Button>{' '}
                
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