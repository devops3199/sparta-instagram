import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA_TRs0jNpOBJJm3CPEQ_f-QKYhH2Lau2g",
    authDomain: "react-advance-chanyeop.firebaseapp.com",
    projectId: "react-advance-chanyeop",
    storageBucket: "react-advance-chanyeop.appspot.com",
    messagingSenderId: "414016808999",
    appId: "1:414016808999:web:b361fe2d62ef14409e0602",
    measurementId: "G-LDX12J7139"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };