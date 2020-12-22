import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase.auth()