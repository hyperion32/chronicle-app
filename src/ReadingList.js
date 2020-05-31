import React, { Component } from 'react';
//import ListContainer from './List.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ListsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [
                { title: "Recommended", color: "pink", books: [] },
                { title: "Fun", color: "lightseagreen", books: [] },
                { title: "Favorites", color: "lightblue", books: [] },
                { title: "Work", color: "palevioletred", books: [] },
                { title: "Professional Development", color: "gold", books: [] },
                { title: "Honors 230: Leadership, Democracy, and a More Thoughtful Public", color: "plum", books: [] }
            ]
        }
    }

    render() {
        let lists = this.state.lists;
        let index = -1;
        let listElements = lists.map((list) => {
            index++;
            return <ListItem key={index} title={list.title} bookCount={list.books.length} color={list.color}/>
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="d-flex w-100">
                            <h2 className="page-title">Lists</h2>
                        </div>
                        <AddNewList/>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div id="lists" className="col">
                            <ListGroup variant="flush">
                                {listElements}
                            </ListGroup>
                        </div>
                        <div className="buffer col"></div>
                    </div>
                </div>
            </div>
        );
    }
}

class ListItem extends Component {
    render() {
        let title = this.props.title;
        let bookCount = this.props.bookCount;
        let color = this.props.color;
        let borderStyle = "5px solid " + color;

        return (
            <ListGroup.Item className="session">
                <div className="d-flex w-100 justify-content-between">
                    <h3 className="list-favorites mb-1" style={{borderLeft: borderStyle, paddingLeft: "7px", marginTop: "1rem",  marginBottom: "0.5rem", marginLeft: ".5rem"}}>{title}</h3>
                    <p className="list-book-count" style={{marginBottom: "1.5rem", marginLeft: ".5rem"}}>{bookCount} books</p>
                </div>
                <a href="view-lists.html">
                    <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
                </a>
            </ListGroup.Item>
        )
    }
}

class AddNewList extends Component {
    render() {
        let colorPalette = ["lightsalmon", "orange", "gold", "greenyellow", "forestgreen", "lightseagreen", "lightblue",
        "deepskyblue", "plum", "mediumorchard", "violet", "hotpink", "pink"];
        let index = -1;
        let colorOptions = colorPalette.map((color) => {
            index++;
            return <option key={index}>{color}</option>
        });

        return (
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label style={{marginLeft: ".5rem", marginRight: ".5rem"}}>Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g., My List" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{marginLeft: ".5rem", marginRight: ".5rem"}}>Color</Form.Label>
                    <Form.Control as="select">
                        {colorOptions}
                    </Form.Control>
                </Form.Group>
                <Button variant="light" type="submit" style={{marginLeft: ".5rem"}}>Add List</Button>
            </Form>
        )
    }
}

export default ListsContainer;