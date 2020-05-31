import React from 'react';

const CardResults = (props) => {
    return (
        <div className="card-container">
            <img src={props.image} alt="" />
            <div className="card-body">
                <h2>Title: {props.title}</h2>
                <h3>Author: {props.author}</h3>
                <p>Pages: {props.pages}</p>
                <p>Rating: {props.rating}</p>
                <button onClick={props.bookInfo} className="button">More Info</button>
                <p>ISBN10: {props.isbn10}</p>
                <p>ISBN13: {props.isbn13}</p>
            </div>
        </div>
    );
}

export default CardResults;