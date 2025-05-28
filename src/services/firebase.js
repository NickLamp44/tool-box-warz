import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/constants.js";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Debug logs
console.log("🔥 Firebase Initialized:", app);
console.log("✅ Firestore DB:", db);

// Export both services
export { auth, db };
