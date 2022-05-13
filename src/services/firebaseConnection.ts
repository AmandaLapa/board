import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
	apiKey: "AIzaSyDKK2a45u6_jxi8P4AlwOMNqXsWsvmXvnA",
	authDomain: "boardapp-17b4a.firebaseapp.com",
	projectId: "boardapp-17b4a",
	storageBucket: "boardapp-17b4a.appspot.com",
	messagingSenderId: "163839701409",
	appId: "1:163839701409:web:7e4dbf2d6b3ae481845be0",
	measurementId: "G-FW0BVEQ22V",
};
// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
