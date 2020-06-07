import React, { Component } from "react";
// import { Button, FormGroup, FormControl } from "react-bootstrap";
import firebase from 'firebase/app';


class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: ''
        };
    }

    render() {

        return (
            <div className="row">

            </div>

        );
    }

}

export default Account;