import React from 'react';
import CardResults from "./CardResults";

const BookSearchResults = (props) => {
    return (
        <div className="card-columns">
            {
                props.items.map((book) => {
                    return <CardResults key={book.id} info={book} />
                })
            }
        </div>
    );
}

export default BookSearchResults;