import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const CardResults = (props) => {
    return (
        <div className="container-fluid">
            <Card className='text-center'>
                <Card.Img variant="top" src={props.image} alt="" />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>{props.author}</Card.Text>
                    <Card.Text>{props.pages} pages</Card.Text>
                    <Card.Text>{props.rating} out of 5 stars</Card.Text>
                    {/* <Card.Text>{props.author}</Card.Text> */}
                    <Button variant="primary" className="card-button" href={props.bookInfo}>Learn More</Button>{' '}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardResults;