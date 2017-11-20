import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCjZdNxwx6HlHwgmH99ubtVpkAHm49J7_s",
    authDomain: "trello-firebase-4262b.firebaseapp.com",
    databaseURL: "https://trello-firebase-4262b.firebaseio.com",
    projectId: "trello-firebase-4262b",
    storageBucket: "trello-firebase-4262b.appspot.com",
    messagingSenderId: "669612548504"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
