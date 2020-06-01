import React, { Component } from 'react';
//import PageHeaderWithAdd from './ReadingLog.js';
//import ListContainer from './List.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class LogContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: this.props.sessions
        }
    }

    render() {
        let sessions = this.state.sessions;
        let index = -1;
        let sessionElements = sessions.map((session) => {
            let listId = session.listId;
            let color = "black";
            if (listId !== undefined) {
                color = this.props.lists[listId].color;
            }
            index++;
            return <Session key={index} title={session.title} date={session.date} startPage={session.startPage} 
                    endPage={session.endPage} minutes={session.minutes} notes={session.notes} color={color} />
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="d-flex w-100">
                            <h2 className="page-title">Log</h2>
                        </div>
                        <AddNewSession />
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div id="lists" className="col">
                            <ListGroup variant="flush">
                                {sessionElements}
                            </ListGroup>
                        </div>
                        <div className="buffer col"></div>
                    </div>
                </div>
            </div>
        );
    }
}

class Session extends Component {
    render() {
        let title = this.props.title;
        let date = this.props.date;
        let color = this.props.color;
        let borderStyle = "5px solid " + color;
        let pages = this.props.endPage - this.props.startPage;
        let minutes = this.props.minutes;
        let notes = this.props.notes;

        return (
            <ListGroup.Item className="session">
                <div className="d-flex w-100 justify-content-between">
                    <h3 className="session-list mb-1" style={{borderLeft: borderStyle, paddingLeft: "7px", marginTop: "1rem"}}>{title}</h3>
                    <p className="date" style={{marginBottom: "1.5rem", marginLeft: ".5rem"}}>{date}</p>
                </div>
                <a href="">
                    <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
                </a>
                <p className="progress-count">{pages} pages • {minutes} minutes</p>
                <small className="notes">{notes}</small>
            </ListGroup.Item>
        )
    }
}

class AddNewSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            startPage: "",
            endPage: "",
            minutes: "",
            notes: ""
        }
    }

    handleChange = (event) => {
        // if (event.target.type === "text") {
        //     this.setState({listName: event.target.value});
        // } else {
        //     this.setState({listColor: event.target.value});
        // }
    }

    handleClick = (event) => {
        // event.preventDefault();
        // this.props.addListCallback(this.state.listName, this.state.listColor);
        // //let newList = <ListItem title={this.state.listName} bookCount="0" color={this.state.listColor} />;
        // //console.log(newList);
    }

    render() {
        return (
            <Form style={{marginLeft: "1rem"}}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Book</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" placeholder="title" />
                </Form.Group>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Start</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="page" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>End</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="page" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Time</Form.Label>
                        <Form.Control onChange={this.handleChange} type="number" placeholder="minutes" />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control onChange={this.handleChange} type="text" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    
                </Form.Group>
                <Button onClick={this.handleClick} variant="light" type="submit">Add Session</Button>
            </Form>
        )
    }
}

export default LogContainer;