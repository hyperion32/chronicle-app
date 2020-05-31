import React from 'react';
import SearchResults from './SearchResults';
import BookSearchResults from './BookSearchResults';

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
        console.log(this.state.searchInput)
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
        const { error, isLoaded } = this.state;
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