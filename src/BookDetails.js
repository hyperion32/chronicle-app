import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class BookDetails extends Component {
    render() {
        let volumeInfo = this.props.info.volumeInfo;
        let saleInfo = this.props.info.saleInfo;
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
                        <Heading title={volumeInfo.title} authors={volumeInfo.authors} rating={volumeInfo.averageRating} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Description description={volumeInfo.description} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <QuickInfo rating={volumeInfo.rating} pageCount={volumeInfo.pageCount} language={volumeInfo.language}
                        publishedDate={saleInfo.publishedDate} price={saleInfo.retailPrice.amount} currency={saleInfo.retailPrice.currency}
                        categories={volumeInfo.categories} isbn10={isbn10} isbn13={isbn13} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <ActionButtons />
                    </div>
                </div>
            </div>
        );
    }
}

class Heading extends Component {
    render() {
        return (
            <header>
                <img src="http://books.google.com/books/content?id=lPV1CQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" className="details book-cover" alt="Book cover" />
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