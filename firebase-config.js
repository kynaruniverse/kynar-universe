/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR DATABASE INFRASTRUCTURE (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Central gateway for Firebase Services. Initializes secure 
 * connections for Identity (Auth) and the Global Merchant Database (Firestore).
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. SECURE CONFIGURATION
// Purged typos and aligned with Kynar Official Project ID
const firebaseConfig = {
  apiKey: "AIzaSyDBCrZmrwbiAP4SFoIZrBYmJaYszdAj8pk",
  authDomain: "kynar-universe-official.firebaseapp.com",
  projectId: "kynar-universe-official",
  storageBucket: "kynar-universe-official.firebasestorage.app",
  messagingSenderId: "1089722386738",
  appId: "1:1089722386738:web:372e68ab876deb4707ef2b",
};

// 2. SYSTEM INITIALIZATION
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Set Persistence to ensure Member Sessions remain active
  setPersistence(auth, browserLocalPersistence)
    .catch((err) => console.warn("Kynar: Session Persistence limited.", err));

  console.log("Kynar Infrastructure: Online (V1.0)");
} catch (error) {
  console.error("Kynar Infrastructure: Critical Connection Error", error);
}

// 3. MULTI-LINE EXPORT BLOCK
export { 
  app, 
  auth, 
  db 
};
