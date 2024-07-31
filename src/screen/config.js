import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAwYAXYe0pGLlpL9TALwj71GP8jzi69b5w",
  authDomain: "dropproject-bad0e.firebaseapp.com",
  projectId: "dropproject-bad0e",
  storageBucket: "gs://dropproject-bad0e.appspot.com",
  messagingSenderId: "865769074175",
  appId: "1:865769074175:android:c0f438c5d52d9e93740bca",
}
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}


// ios- 1066914831048-7negjuae75usogq5lc8blj7j7o55hnt3.apps.googleusercontent.com
// Android- 1066914831048-ecg7p3el1vnnosn9jjsb69n4dblciirs.apps.googleusercontent.com