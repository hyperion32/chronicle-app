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
            searchInput: "webdev",
            items: [],
            sortPageCount: ""
        };
    }

    updateResults = (searchVal) => {
        this.setState({ searchInput: searchVal });
        console.log(searchVal);

        fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchVal)

            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    // let cleanData = this.cleanData(result)
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

    componentDidMount() {
        this.updateResults(this.state.searchInput);
    }

    handleSort = (e) => {
        console.log(e.target.value)
        this.setState({ sortPageCount: e.target.value })
    }

    render() {
        const sorted = this.state.items.sort((a, b) => {
            if (this.state.sortPageCount === "newest") {
                console.log("newest");
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
            } else if (this.state.sortPageCount === "oldest") {
                console.log("oldest");
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
            }

            return;
        })

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            return (
                <>
                    <SearchResults data={this.data} updateResults={this.updateResults} handleSort={this.handleSort} />
                    <div className="container-fluid text-center">
                        <BookSearchResults items={sorted} />
                    </div>
                </>


            );
        }
    }
}

export default BookCard;