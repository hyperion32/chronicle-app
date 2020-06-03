import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const CardResults = (props) => {
    return (
        <div className="container-fluid">
            <Card className='text-center'>
                <Card.Img variant="top" src="https://bitsofco.de/content/images/2018/12/broken-1.png" alt="" />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.author}</Card.Text>
                    <Card.Text>{props.pages} pages</Card.Text>
                    {/* // add conditional info to pages and rating */}
                    <Card.Text>{props.rating} out of 5 stars</Card.Text>
                    <Card.Text>Published Date: {props.date === '0000' ? 'date unknown' : props.date.substring(0, 4)}</Card.Text>
                    {/* <Card.Text>{props.isbn10}</Card.Text>
                    <Card.Text>{props.isbn13}</Card.Text> */}
                    <Button variant="primary" className="card-button" href={props.bookInfo}>Learn More</Button>{' '}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardResults;