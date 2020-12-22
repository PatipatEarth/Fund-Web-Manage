import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlThZLr3z7shEDcU8E50AJkflpB7QUJgI",
  authDomain: "fun-d-d3f33.firebaseapp.com",
  databaseURL: "https://fun-d-d3f33.firebaseio.com",
  projectId: "fun-d-d3f33",
  storageBucket: "fun-d-d3f33.appspot.com",
  messagingSenderId: "465859122110",
  appId: "1:465859122110:web:01db8b7d5167a45cb85fef",
  measurementId: "G-5F5HQQSQ5S",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
