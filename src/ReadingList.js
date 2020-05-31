import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class ListsContainer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <ReadingListHeader></ReadingListHeader>

                <div className="container-fluid">
                    <div className="row">
                        <div id="lists" className="col">
                            <ul id="lists-list" className="list-group list-group-flush">
                                <ListItem listTitle="Favorites" bookCount="6"></ListItem>
                                <ListItem listTitle="Fun" bookCount="3"></ListItem>
                                <ListItem listTitle="Honors 230 A: Leadership, Democracy, and a More
                                            Thoughtful Public" bookCount="20"></ListItem>
                                <ListItem listTitle="Professional Development" bookCount="11"></ListItem>
                                <ListItem listTitle="Recommended" bookCount="15"></ListItem>
                                <ListItem listTitle="Work" bookCount="2"></ListItem>
                            </ul>
                        </div>
                        <div className="buffer col"></div>
                    </div>
                </div>
            </div>
        );
    }
}

class ReadingListHeader extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                <div className="d-flex w-100">
                        <h2 className="page-title">Lists</h2>
                        <div className="button-add"><Button variant="light" id="add-new-list"
                                className="add-new btn btn-light btn-lg">+</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ListItem extends Component {
    render() {
        let listTitle = this.props.listTitle;
        let bookCount = this.props.bookCount;
        return (
            <li className="session list-group-item">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="list-favorites mb-1">{listTitle}</h5>
                    <p className="list-book-count">{bookCount} books</p>
                </div>
                <a href="view-lists.html">
                    <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
                </a>
            </li>
        )
    }
}

export default ListsContainer;