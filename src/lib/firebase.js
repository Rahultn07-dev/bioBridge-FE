import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Firebase project config — set these in your .env as VITE_FIREBASE_*
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
};

// Only initialize when at least apiKey is present (avoids error in local mock mode)
let app;
let auth;
try {
  app  = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (err) {
  console.warn('[BioBridge] Firebase not configured — running in mock mode.');
  auth = null;
}

export { auth };
export { signInWithEmailAndPassword, createUserWithEmailAndPassword, firebaseSignOut, onAuthStateChanged };
