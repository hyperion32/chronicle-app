import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class ListContainer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div id="lists" className="col">
                        <ListGroup variant="flush"></ListGroup>
                    </div>
                    <div className="buffer col"></div>
                </div>
            </div>
        );
    }
}

export default ListContainer;