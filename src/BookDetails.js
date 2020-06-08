import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class BookDetails extends Component {
    render() {
        return (
            <>
                <Heading />
                <Description />
                <QuickInfo />
                <ActionButtons />
            </>
        );
    }
}

class Heading extends Component {
    render() {
        return (
            <header>
                <img src="http://books.google.com/books/content?id=lPV1CQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" className="details book-cover" alt="Book cover" />
                <h2 className="title">Twilight (Twilight, #1)</h2>
                <h3 className="author">Stephenie Meyer</h3>
                <div className="rating">
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star"></span>
                </div>
            </header>
        );
    }
}

class Description extends Component {
    render() {
        return (
            <>
            <h3>Description</h3>
            <p>About three things I was absolutely positive.</p>
            <p>First, Edward was a vampire.</p>
            <p>Second, there was a part of him—and I didn't know how dominant
                that part might be—that thirsted for my blood.</p>
            <p>And third, I was unconditionally and irrevocably in love with him.</p>
            <p>Deeply seductive and extraordinarily suspenseful,
                Twilight is a love story with bite.</p>
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
                <li>Rating: 3.59/5</li>
                <li>Length: 501 pages</li>
                <li>Paperback price: $15.29</li>
                <li>Language: English</li>
                <li>ISBN: 0316015849 (ISBN13: 9780316015844)</li>
                <li>Genres: Young Adult, Fantasy, Romance</li>
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