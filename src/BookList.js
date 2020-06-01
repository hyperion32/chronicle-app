import React from 'react';
import SearchResults from './SearchResults';
import BookSearchResults from './BookSearchResults';
// import Button from 'react-bootstrap/Button';

class BookCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            searchInput: "test",
            items: []
        };
    }

    componentDidMount() {
        // console.log(this.state.searchInput)
        // let query = this.state.searchInput;
        // console.log(query);
        fetch("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchInput)

            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
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

    handleSubmit(searchVal) {
        this.setState({ searchInput: searchVal });
        console.log(this.state.searchInput)
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            return (
                <div>
                    <SearchResults data={this.data} handleSubmit={this.handleSubmit.bind(this)}  />
                    <BookSearchResults items={this.state.items} />
                </div>
            );
        }
    }
}

export default BookCard;