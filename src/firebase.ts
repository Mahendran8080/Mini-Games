import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDTXS1YtxDRu9NNTsfzUSwrrF-8R1FkgHM",
  authDomain: "mygameapp-1dff7.firebaseapp.com",
  projectId: "mygameapp-1dff7",
  storageBucket: "mygameapp-1dff7.firebasestorage.app",
  messagingSenderId: "1077127069070",
  appId: "1:1077127069070:web:7e1765122a17a300c8f8df"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);