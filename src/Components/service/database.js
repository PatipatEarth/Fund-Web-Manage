import firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../service/config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase.firestore();