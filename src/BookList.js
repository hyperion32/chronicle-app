import React, { Component } from 'react';
import SearchResults from './SearchResults';
import request from 'superagent';
import BookSearchResults from './BookSearchResults';

class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchInput: ""
        }
    }

    data = (e) => {
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: this.state.searchInput })
            .then((data) => {
                console.log(data);
                this.setState({ books: [...data.body.items] })
            })
    }

    handleSubmit = (e) => {
        this.setState({ searchInput: e.target.value })
    }

    render() {
        return (
            <div>
                <SearchResults data={this.data} handleSubmit={this.handleSubmit}  />
                <BookSearchResults books={this.state.books} />
            </div>
        );
    }
}

export default BookCard;