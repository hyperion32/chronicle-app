import React, { Component } from 'react';
//import PageHeaderWithAdd from './ReadingLog.js';
//import ListContainer from './List.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
            index++;
            return <Session key={index} title={session.title} date={session.date} startPage={session.startPage} 
                    endPage={session.endPage} minutes={session.minutes} notes={session.notes} color="black"/>
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="d-flex w-100">
                            <h2 className="page-title">Log</h2>
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
                <p class="progress-count">{pages} pages • {minutes} minutes</p>
                <small class="notes">{notes}</small>
            </ListGroup.Item>
        )
    }
}


export default LogContainer;