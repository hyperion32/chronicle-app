import React, { Component } from 'react';
import SearchResults from './SearchResults';
//import request from 'superagent';
import BookSearchResults from './BookSearchResults';

// class BookCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             error: null,
//             books: [],
//             isLoaded: false,
//             searchInput: "harry potter" // TESTING ONLY
//         }
//     }

//     componentDidMount() {    // temporary loading point 
//         fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput)
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                 let searchResults = data.items;
//                 this.setState({ books: searchResults, isLoaded: true })
//             });
//             (error) => {
//                 this.setState({
//                   isLoaded: true,
//                   error
//                 });
//               }

//     }

//     // data = (e) => {
//     //     e.preventDefault();
//     //     request
//     //         .get("https://www.googleapis.com/books/v1/volumes")
//     //         .query({ q: this.state.searchInput })
//     //         .then((data) => {
//     //             console.log(data);
//     //             this.setState({ books: [...data.body.items] })
//     //         })
//     // }



//     render() {
//         return (
//              <div>
//                  <SearchResults data={this.data} handleSubmit={this.handleSubmit}  />
//                  <BookSearchResults books={this.state.books} />
//              </div>
//         );
//     }
// }

// export default BookCard;


class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            searchInput: "harry potter",
            items: []
        };
    }

    componentDidMount() {
        preventDefault();
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleSubmit = (e) => {
        this.setState({ searchInput: e.target.value })
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                  <SearchResults data={this.data} handleSubmit={this.handleSubmit}  />
                  <BookSearchResults items={this.state.items} />
              </div>
            );
        }
    }
}

export default BookCard;