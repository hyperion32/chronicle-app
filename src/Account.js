import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Account extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            userUid: null
        }
    }

    uiConfig = {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup',
    };

    componentDidMount() {
        // sign in/out
        this.authUnSubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                console.log("Logged in as", firebaseUser.email);
                this.setState({ user: firebaseUser })
                this.props.updateUserUid(firebaseUser.uid);
            } else {
                console.log("Logged out");
                this.setState({ user: null })
            }
        })

    }

    handleSignUp = () => {
        this.setState({ errorMessage: null });

        console.log("Creating user", this.state.email);

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(user);

                let updatePromise = user.updateProfile({ displayName: this.state.username })
                return updatePromise;
            })
            .then(() => {
                this.setState((prevState) => {
                    let updatedUser = { ...prevState.user, displayName: this.state.username }
                    return { user: updatedUser }; 
                });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.message });
            })

    }

    componentWillUnmount() {
        this.authUnSubFunction();
    }

    handleSignOut = () => {
        firebase.auth().signOut()
    }

    render() {
        let content = null;
        if (!this.state.user) { 
            content = (
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
            )
        }
        else { 
            content = (
                <div>

                    <div className="alert alert-success" style={{backgroundColor: "#f2edfb", borderColor: "#f2edfb"}}>
                        <p style={{color: "black", fontSize: "20px"}}>Logged in as <strong style={{fontWeight: "900"}}>{this.state.user.displayName}</strong>
                            <button className="btn btn-warning float-right" onClick={this.handleSignOut}>
                                Sign Out
                            </button>
                        </p>
                    </div>
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <h2 className="page-title">Account</h2>
                {this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                }

                {content}

            </div>
        )
    }
}

export default Account;