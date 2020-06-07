import React, { Component } from 'react';
//import ListContainer from './List.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ListsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: this.props.lists
        }
    }

    addList = (listName, listColor) => {
        let newList = {title: listName, color: listColor, books: []};
        this.setState((prevState) => {
            let shallowCopy = Object.assign([], prevState.lists); //don't modify prevState!
            shallowCopy.push(newList); //add new entry  
            return {lists: shallowCopy}; //return updated object
        })
    }

    render() {
        let lists = this.state.lists;
        let index = -1;
        // https://www.geeksforgeeks.org/how-to-use-map-on-an-array-in-reverse-order-with-javascript/
        let listElements = lists.slice(0).reverse().map((list) => {
            index++;
            return <ListItem key={index} title={list.title} bookCount={list.books.length} color={list.color}/>
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex w-100">
                                    <h2 className="page-title">Lists</h2>
                                </div>
                                <AddNewList addListCallback={this.addList}/>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row">
                                <div id="lists" className="col">
                                    <ListGroup variant="flush">
                                        {listElements}
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buffer col"></div>
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
                    <h3 className="list-favorites mb-1" style={{borderLeft: borderStyle, paddingLeft: "7px", marginTop: "1rem", fontSize: "20px"}}>{title}</h3>
                    <p className="list-book-count" style={{marginBottom: "1.5rem", marginLeft: ".5rem"}}>{bookCount} books</p>
                </div>
                <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
            </ListGroup.Item>
        )
    }
}

class AddNewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: "",
            listColor: ""
        }
    }

    handleChange = (event) => {
        if (event.target.type === "text") {
            this.setState({listName: event.target.value});
        } else {
            this.setState({listColor: event.target.value});
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.addListCallback(this.state.listName, this.state.listColor);
    }

    render() {
        let colorPalette = ["crimson", "tomato", "lightcoral", "lightsalmon", "orange", "gold", "greenyellow", "forestgreen", "lightseagreen",
                            "lightblue", "deepskyblue", "plum", "violet", "hotpink", "pink"];
        let index = -1;
        let colorOptions = colorPalette.map((color) => {
            index++;
            return <option key={index}>{color}</option>
        });

        return (
            <Form style={{marginLeft: "1rem"}}>
                <Form.Group controlId="formListName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="e.g., My List" />
                </Form.Group>
                <Form.Group controlId="formColor">
                    <Form.Label>Color</Form.Label>
                    <Form.Control onChange={this.handleChange} as="select">
                        <option>Choose...</option>
                        {colorOptions}
                    </Form.Control>
                </Form.Group>
                <Button onClick={this.handleClick} variant="light" type="submit">Add List</Button>
            </Form>
        )
    }
}

export default ListsContainer;