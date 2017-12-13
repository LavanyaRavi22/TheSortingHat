import firebase from 'firebase';
require('firebase/firestore');

var config = {
    apiKey: "AIzaSyBbSJP6bLDdlE9_ahqTY0yWm0kCAg_KoA0",
    authDomain: "the-sorting-hat-a3e63.firebaseapp.com",
    databaseURL: "https://the-sorting-hat-a3e63.firebaseio.com",
    projectId: "the-sorting-hat-a3e63",
    storageBucket: "",
    messagingSenderId: "482245174112"
  };
  firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth()