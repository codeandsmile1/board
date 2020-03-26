import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAOgFtu_VxARuWzUzVqRJJb1tlb1h0jCZM",
    authDomain: "react-trello-523bc.firebaseapp.com",
    databaseURL: "https://react-trello-523bc.firebaseio.com",
    projectId: "react-trello-523bc",
    storageBucket: "react-trello-523bc.appspot.com",
    messagingSenderId: "183477128481",
    appId: "1:183477128481:web:1e56a767a7a14ae3b78260",
    measurementId: "G-BMPS9S9BHY"
}

firebase.initializeApp(config);

const db = firebase.firestore();

const boardsRef  = db.collection('boards');
const listsRef  = db.collection('lists');
const cardsRef  = db.collection('cards');


export {boardsRef, listsRef, cardsRef}