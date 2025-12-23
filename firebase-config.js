import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    arrayRemove 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBCrZmrwbiAP4SFoIZrBYmJaYszdAj8pk",
    authDomain: "kynar-universe-official.firebaseapp.com",
    projectId: "kynar-universe-official",
    storageBucket: "kynar-universe-official.firebasestorage.app",
    messagingSenderId: "1089722386738",
    appId: "1:1089722386738:web:372e68ab876deb4707ef2b"
};

// Initialize Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Advanced Registration Flow
 * execute profile update and DB creation in parallel for performance.
 */
const registerUser = async (email, password, displayName) => {
    try {
        // 1. Create Auth User
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        const finalName = displayName || "Creator";
        const now = new Date().toISOString();

        // 2. Parallel Execution: Update Profile & Create Firestore Doc
        // This saves network round-trip time.
        await Promise.all([
            updateProfile(user, { displayName: finalName }),
            setDoc(doc(db, "users", user.uid), {
                email: email,
                displayName: finalName,
                createdAt: now,
                updatedAt: now,
                purchases: [],
                wishlist: []
            }, { merge: true })
        ]);

        return user;
    } catch (error) {
        console.error("Registration Error:", error);
        throw error; // Re-throw to be handled by the UI layer
    }
};

// Export Services & Method Wrappers
// This allows other files to import only from './firebase-config.js'
export { 
    auth, 
    db, 
    registerUser, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    // Firestore Helpers
    doc,
    getDoc,
    setDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
};
