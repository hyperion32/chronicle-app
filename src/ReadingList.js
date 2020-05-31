import React, { Component } from 'react';
//import ListContainer from './List.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

class ListsContainer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="d-flex w-100">
                            <h2 className="page-title">Lists</h2>
                        </div>
                        <div className="button-add">
                            <Button variant="light" id="add-new-list" className="add-new btn btn-light btn-lg">+</Button>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div id="lists" className="col">
                            <ListGroup variant="flush">
                                <ListItem title="Favorites" bookCount="6" color="lightblue"/>
                                <ListItem title="Fun" bookCount="3" color="lightseagreen"/>
                                <ListItem title="Honors 230 A: Leadership, Democracy, and a More
                                            Thoughtful Public" bookCount="20" color="plum"/>
                                <ListItem title="Professional Development" bookCount="11" color="gold"/>
                                <ListItem title="Recommended" bookCount="15" color="pink"/>
                                <ListItem title="Work" bookCount="2" color="palevioletred"/>
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
                    <h3 className="list-favorites mb-1" style={{borderLeft: borderStyle, paddingLeft: "7px", marginTop: "1rem",  marginBottom: "0.5rem"}}>{title}</h3>
                    <p className="list-book-count" style={{marginBottom: "1.5rem"}}>{bookCount} books</p>
                </div>
                <a href="view-lists.html">
                    <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
                </a>
            </ListGroup.Item>
        )
    }
}

export default ListsContainer;