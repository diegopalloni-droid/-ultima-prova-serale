import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebaseConfig';

// FIX: Updated Firebase imports to use the v9 compatibility layer.
// This is necessary because the application uses the Firebase v8 (namespaced) syntax,
// such as `firebase.firestore()`, which is not available in the modern v9 modular API.
// This change makes the existing code compatible with the Firebase v9+ SDK.
// Also added a guard to prevent re-initializing the app on hot reloads.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
