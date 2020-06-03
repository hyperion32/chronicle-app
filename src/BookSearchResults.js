import React from 'react';
import CardResults from "./CardResults";

const BookSearchResults = (props) => {
    return (
        <div className="card-columns">
            {
                props.items.map((book, i) => {
                    return <CardResults 
                    key={i}
                    // image={book.volumeInfo.imageLinks.thumbnail} 
                    title={book.volumeInfo.title} 
                    author={book.volumeInfo.authors} 
                    pages={book.volumeInfo.pageCount} 
                    rating={book.volumeInfo.averageRating}
                    date={book.volumeInfo.publishedDate} 
                    bookInfo={book.volumeInfo.infoLink}
                    // isbn10={book.volumeInfo.industryIdentifiers[0].identifier}
                    // isbn13={book.volumeInfo.industryIdentifiers[1].identifier}
                    />
                })
            }
        </div>
    );
}

export default BookSearchResults;