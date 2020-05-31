import React, { Component } from 'react';
import SearchResults from './SearchResults';
//import request from 'superagent';
import BookSearchResults from './BookSearchResults';

class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchInput: ""
        }
    }

    componentDidMount() {    
        fetch("https://www.googleapis.com/books/v1/volumes?q=harry%20potter") // TESTING ONLY
        //fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput)
            .then((res) => res.json())
            .then((data) => {
                let searchResults = data.items;
                this.setState({ books: searchResults })
        })
    }

    // data = (e) => {
    //     e.preventDefault();
    //     request
    //         .get("https://www.googleapis.com/books/v1/volumes")
    //         .query({ q: this.state.searchInput })
    //         .then((data) => {
    //             console.log(data);
    //             this.setState({ books: [...data.body.items] })
    //         })
    // }

    // handleSubmit = (e) => {
    //     this.setState({ searchInput: e.target.value })
    // }

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