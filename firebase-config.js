/**
 * ══════════════════════════════════════════════════════════════════════════
 * MODULE: KYNAR DATABASE CONNECTION (V1.0)
 * ══════════════════════════════════════════════════════════════════════════
 * @description Initializes the Firebase SDK connection for the marketplace.
 * Exports Auth and Firestore instances for account management and orders.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyDBCrZmrwbiAP4SFoIZrBYmJaYszdAj8pk",
  authDomain: "kynar-universe-official.firebaseapp.com",
  projectId: "kynar-universe-official",
  storageBucket: "kynar-universe-official.firebasestorage.app",
  messagingSenderId: "1089722386738",
  appId: "1:1089722386738:web:372e68ab876deb4707ef2b",
};

// --- Initialization ---
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  console.log("Kynar Database: Connected (Production)");
} catch (error) {
  console.error("Kynar Database Connection Failed:", error);
}

export { app, auth, db };
