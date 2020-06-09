import React from 'react';
import SearchResults from './SearchResults';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom';

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

        fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchVal)

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

    componentDidMount() {
        this.updateResults(this.state.searchInput);
    }

    handleSort = (e) => {
        this.setState({ sortPageCount: e.target.value })
    }

    render() {
        const sorted = this.state.items.sort((a, b) => {
            if (this.state.sortPageCount === "newest") {
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
            } else if (this.state.sortPageCount === "oldest") {
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
            }

            return undefined;
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
                    <div className="container-fluid">
                        <div className="text-center">
                            <BookSearchResults items={sorted} />
                        </div>
                    </div>
                </>
            );
        }
    }
}

class BookSearchResults extends React.Component {
    render() {
        let allCards = this.props.items.map((book) => {
            return <CardResults key={book.id} info={book} />
        })
        return (
            <div className="card-columns">
                {allCards}
            </div>
        );
    }
}

class CardResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick = () => {
        this.setState({redirectTo: this.props.info.id});
    }

    render () {
        if (this.state.redirectTo) {
            return <Redirect push to={"/book-details/" + this.state.redirectTo} />
        }

        const { volumeInfo } = this.props.info;
        const {title, authors, pageCount, averageRating} = this.props.info.volumeInfo;
        const thumbNail = volumeInfo.hasOwnProperty('imageLinks') === false ? "https://bitsofco.de/content/images/2018/12/broken-1.png" : volumeInfo.imageLinks.thumbnail;
        const date = volumeInfo.hasOwnProperty('publishedDate') === false ? volumeInfo['publishedDate'] = "0000" : volumeInfo.publishedDate;
        
        return (
            <div>
                <Card className='mb-8 border-lightgray mt-4'>
                    <Card.Img variant="top" src={thumbNail} alt="" style={{paddingTop: "2rem"}} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{authors}</Card.Text>
                        <Card.Text>{pageCount} pages</Card.Text>
                        <Card.Text>{averageRating} out of 5 stars</Card.Text>
                        <Card.Text>Published Date: {date === '0000' ? 'date unknown' : date.substring(0, 4)}</Card.Text>
                        <Button variant="primary" className="card-button" onClick={this.handleClick}>Learn More</Button>{' '}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default BookCard;