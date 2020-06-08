// React
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
// Style
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// Data
import SAMPLE_SESSIONS from './sample-data/sessions.json';
import SAMPLE_LISTS from './sample-data/lists.json';
// Components
import App from './App';

var firebaseConfig = {
  apiKey: "AIzaSyCIv5weJQV0tKIa09FJvXJV8TviDDQ8img",
  authDomain: "info340-chronicle.firebaseapp.com",
  databaseURL: "https://info340-chronicle.firebaseio.com",
  projectId: "info340-chronicle",
  storageBucket: "info340-chronicle.appspot.com",
  messagingSenderId: "481612140642",
  appId: "1:481612140642:web:9f11f3dd1e0e849033013b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter><App sessions={SAMPLE_SESSIONS} lists={SAMPLE_LISTS}/></BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();