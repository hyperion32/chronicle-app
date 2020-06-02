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
        this.setState({ sortPageCount: e.target.value })
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
                book.volumeInfo['imageLinks'] = { thumbnail: 'https://bitsofco.de/content/images/2018/12/broken-1.png' };
            }

            return book;
        })

        return cleanedData;
    }

    render() {
        const sorted = this.state.items.sort((a, b) => {
            if (this.state.sortPageCount === "newest") {
                console.log("newest");
                // console.log(a.volumeInfo.pageCount);
                // return parseInt(b.volumeInfo.pageCount - a.volumeInfo.pageCount);
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
            } else if (this.state.sortPageCount === "oldest") {
                console.log("oldest");
                // console.log(b.volumeInfo.pageCount)
                // return parseInt(a.volumeInfo.pageCount - b.volumeInfo.pageCount);
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
            }

        })

        console.log(sorted)

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center">Loading...</div>;
        } else {
            return (
                <div>
                    <SearchResults data={this.data} updateResults={this.updateResults} handleSort={this.handleSort} />
                    <BookSearchResults items={sorted} />
                </div>
            );
        }
    }
}

export default BookCard;