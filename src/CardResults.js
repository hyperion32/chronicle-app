import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const CardResults = (props) => {
    
    const { volumeInfo } = props.info;
    const {title, authors, pages, rating, url} = props.info.volumeInfo;
    const thumbNail = volumeInfo.hasOwnProperty('imageLinks') === false ? "https://bitsofco.de/content/images/2018/12/broken-1.png" : volumeInfo.imageLinks.thumbnail;
    const date = volumeInfo.hasOwnProperty('publishedDate') === false ? volumeInfo['publishedDate'] = "0000" : volumeInfo.publishedDate;

    return (
        <div>
            <Card className='mb-8 border-lightgray mt-4'>
                <Card.Img variant="top" src={thumbNail} alt="" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{authors}</Card.Text>
                    <Card.Text>{pages} pages</Card.Text>
                    {/* // add conditional info to pages and rating */}
                    <Card.Text>{rating} out of 5 stars</Card.Text>
                    <Card.Text>Published Date: {date === '0000' ? 'date unknown' : date.substring(0, 4)}</Card.Text>
                    {/* <Card.Text>{props.isbn10}</Card.Text>
                    <Card.Text>{props.isbn13}</Card.Text> */}
                    <Button variant="primary" className="card-button" href={url}>Learn More</Button>{' '}
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardResults;