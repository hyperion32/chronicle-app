import React from 'react';
import Button from 'react-bootstrap/Button';

const CardResults = (props) => {
    return (
        <div className="card-container">
            <img src={props.image} alt="" />
            <div className="card-body">
                <h2 className="card-text">{props.title}</h2>
                <h3 className="card-text">{props.author}</h3>
                <p className="card-text">{props.pages} pages</p>
                <p className="card-text">{props.rating} out of 5 stars</p>
                <Button variant="primary" className="card-button" href={props.bookInfo}>Learn More</Button>{' '}
                {/*<p className="card-text">ISBN10: {props.isbn10}</p>*/}
                {/*<p className="card-text">ISBN13: {props.isbn13}</p>*/}
            </div>
        </div>
    );
}

export default CardResults;