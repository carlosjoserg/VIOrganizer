// import "expo-firestore-offline-persistence";
import firebase from "firebase/app";
import "firebase/firestore";
//import "firebase/auth";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOD4G6bx0mFKSvVjMyjVgMxe_bOxXcPuw",
  authDomain: "viorganizerbackend.firebaseapp.com",
  databaseURL: "https://viorganizerbackend-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "viorganizerbackend",
  storageBucket: "viorganizerbackend.appspot.com",
  messagingSenderId: "182201908853",
  appId: "1:182201908853:web:fc8a71ed4524998757023c",
  measurementId: "G-7C60XEC1H7"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//Firebase Firestore Persistance
firebase
	.firestore()
	// .enablePersistence()
	.then(() => {
		//console.log("enablePersistence SUCCESS");
	})
	.catch(function (err) {
		if (err.code === "failed-precondition") {
			// Multiple tabs open, persistence can only be enabled
			// in one tab at a a time.
			// ...
			console.log("Multiple tabs open, persistence can only be enabled");
		} else if (err.code === "unimplemented") {
			// The current browser does not support all of the
			// features required to enable persistence
			// ...
			console.log("The current browser does not support ");
		}
	});

export default firebase;
