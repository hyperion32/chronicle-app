import React, { Component } from 'react';
//import PageHeaderWithAdd from './ReadingLog.js';
//import ListContainer from './List.js';
import firebase from 'firebase/app';
import 'firebase/database';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class LogContainer extends Component {
    constructor(props) {
        super(props);
        //console.log("DEBUG: LogContainer props.userRef=" + props.userRef)
        this.state = {
            sessions: []
        }
    }

    componentDidMount() {
        // look up database user entry for "logs"
        // logref.on; pass function()
        let logRef = firebase.database().ref("users/" + this.props.userUid).child("logs");
        logRef.on('value', (snapshot) => {
            let allLogs = snapshot.val();

            if (allLogs != undefined) {
                this.setState({sessions: []})
                let logKeys = Object.keys(allLogs);
                logKeys.map((key) => {
                    let log = allLogs[key];
                    this.addLogValue(log);
                });
            }
        });
    }

    // add new log to sessions state, kicking off re-render
    addLogValue = (logValue) => {
        this.setState((prevState) => {
            let shallowCopy = Object.assign([], prevState.sessions);
            shallowCopy.push(logValue);
            return { sessions: shallowCopy };
        })
    }

    // add new log session to database
    addNewSession = (sessionTitle, sessionStartPage, sessionEndPage, sessionMinutes, sessionNotes) => {
        let sessionDate = this.getFormattedDate();
        let sessionListId = this.findListId(sessionTitle);

        let newSession = {
            title: sessionTitle, date: sessionDate, startPage: sessionStartPage, endPage: sessionEndPage,
            minutes: sessionMinutes, listId: sessionListId, notes: sessionNotes
        };

        //this.addLogValue(newSession);

        let userRef = firebase.database().ref("users/" + this.props.userUid);
        userRef.child("logs").push(newSession);
    }

    findListId = (bookTitle) => {
        let lists = this.props.lists;
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].books.includes(bookTitle)) {
                return lists[i].id;
            }
        }
        return -1;
    }

    getFormattedDate = () => {
        let currDate = new Date();
        let month = currDate.getMonth() + 1;
        let date = currDate.getDate();
        let year = currDate.getFullYear() % 100;
        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        if (year < 10) {
            year = "0" + year;
        }
        let formattedDate = month + "/" + date + "/" + year;
        return formattedDate;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <TitleRow />
                        <FormRow addSessionCallback={this.addNewSession} />
                        <SessionsDataRow sessions={this.state.sessions} lists={this.props.lists} userUid={this.props.userUid} />
                    </div>
                    <div className="buffer col"></div> 
                </div>
            </div>
        );
    }
}

class TitleRow extends Component {
    render() {
        return(
            <div className="row">
                <div className="col">
                    <div className="d-flex w-100">
                        <h2 className="page-title">Log</h2>
                    </div>
                </div>
            </div>
        );
    }
}

class FormRow extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                <AddNewSession addSessionCallback={this.props.addSessionCallback} />
                </div>
            </div>
        );
    }
}

class SessionsDataRow extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let sessions = this.props.sessions;
        let index = -1;
        // https://www.geeksforgeeks.org/how-to-use-map-on-an-array-in-reverse-order-with-javascript/
        let sessionElements = sessions.slice(0).reverse().map((session) => {
            let listId = session.listId;
            let color = "black";
            if (listId !== -1) {
                color = this.props.lists[listId].color;
            }
            index++;
            let userRef = firebase.database().ref("users/" + this.props.userUid);
            let logsRef = userRef.child("logs");
            let test = logsRef.child("title");
            console.log(test);

            return <Session key={index} title={session.title} date={session.date} startPage={session.startPage}
                endPage={session.endPage} minutes={session.minutes} notes={session.notes} color={color} />
        });

        return (
            <div className="row">
                <div id="lists" className="col">
                    <ListGroup variant="flush">
                        {sessionElements}
                    </ListGroup>
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
                    <h3 className="session-list mb-1" style={{ borderLeft: borderStyle, paddingLeft: "7px", marginTop: "1rem", fontSize: "20px" }}>{title}</h3>
                    <p className="date" style={{ marginBottom: "1.5rem", marginLeft: ".5rem" }}>{date}</p>
                </div>
                <i className="open-details fa fa-chevron-right" aria-hidden="true"></i>
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
        let form = event.target.id;
        if (form === "formTitle") {
            this.setState({ title: event.target.value });
        } else if (form === "formStart") {
            this.setState({ startPage: event.target.value });
        } else if (form === "formEnd") {
            this.setState({ endPage: event.target.value });
        } else if (form === "formTime") {
            this.setState({ minutes: event.target.value });
        } else {
            this.setState({ notes: event.target.value });
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.addSessionCallback(this.state.title, this.state.startPage, this.state.endPage, this.state.minutes, this.state.notes);
    }

    render() {
        return (
            <Form style={{ marginLeft: "1rem" }}>
                <Form.Group>
                    <Form.Label>Book</Form.Label>
                    <Form.Control id="formTitle" onChange={this.handleChange} type="text" placeholder="title" />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Start</Form.Label>
                        <Form.Control id="formStart" onChange={this.handleChange} type="number" placeholder="page" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>End</Form.Label>
                        <Form.Control id="formEnd" onChange={this.handleChange} type="number" placeholder="page" />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Time</Form.Label>
                        <Form.Control id="formTime" onChange={this.handleChange} type="number" placeholder="minutes" />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control id="formNotes" onChange={this.handleChange} type="text" />
                </Form.Group>

                <Button onClick={this.handleClick} variant="light" type="submit">Add Session</Button>
            </Form>
        )
    }
}

export default LogContainer;