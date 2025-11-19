
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAdInl9wYr3M5ynTaHf-hJwk9Ac0lp7c8k",
  authDomain: "dxxp-tools-kit.firebaseapp.com",
  databaseURL: "https://dxxp-tools-kit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dxxp-tools-kit",
  storageBucket: "dxxp-tools-kit.firebasestorage.app",
  messagingSenderId: "313313438784",
  appId: "1:313313438784:web:f0947aa368cd23a4c843a5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
