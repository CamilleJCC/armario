import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBYISQS9bHDbPSz_WzGx7sG1gI_C-GfAzM",
  authDomain: "mapfre-voltea.firebaseapp.com",
  databaseURL: "https://mapfre-voltea-default-rtdb.firebaseio.com",
  projectId: "mapfre-voltea",
  storageBucket: "mapfre-voltea.firebasestorage.app",
  messagingSenderId: "532381967364",
  appId: "1:532381967364:web:c618827b0244d8bc65c151",
  measurementId: "G-VSQSH2HGWF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
