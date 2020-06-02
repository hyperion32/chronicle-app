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
                    console.log(result);
                    const cleanData = this.cleanData(result)
                    this.setState({
                        isLoaded: true,
                        items: cleanData
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
        this.setState({ sort: e.target.value })
    }

    cleanData = (result) => {
        const cleanedData = result.items.map((book) => {
            if (book.volumeInfo.hasOwnProperty('pageCount') === false) {
                book.volumeInfo['pageCount'] = 'null';
            }

            else if (book.volumeInfo.hasOwnProperty('averageRating') === false) {
                book.volumeInfo['averageRating'] = 'null';
            }

            else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
                book.volumeInfo['imageLinks'] = { thumbnail: 'https://bitsofco.de/content/images/2018/12/broken-1.png'};
            }

            return book;
        })

        return cleanedData;
    }

    render() {
        const sortedBooks = this.state.items.sort((a, b) => {
            if (this.state.sortPageCount === "MostPages") {
                return (a.pageCount > b.pageCount) ? 1 : ((b.pageCount > a.pageCount) ? -1 : 0);
            } else if (this.state.sort === "LeastPages") {
                return (b.pageCount > a.pageCount) ? 1 : ((a.pageCount > b.pageCount) ? -1 : 0);
            }
        })

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            return (
                <div>
                    <SearchResults data={this.data} updateResults={this.updateResults} handleSort={this.handleSort} />
                    <BookSearchResults items={sortedBooks} />
                </div>
            );
        }
    }
}

export default BookCard;