import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCijt_pc_RNpMm_uH5IeDlCHRsVaRUPhek",
  authDomain: "auth-phonnumber.firebaseapp.com",
  projectId: "auth-phonnumber",
  storageBucket: "auth-phonnumber.firebasestorage.app",
  messagingSenderId: "109077738045",
  appId: "1:109077738045:web:9b01b37e4718e6ee687054",
  measurementId: "G-8RJTREQBYT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };