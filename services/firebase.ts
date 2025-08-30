// FIX: Changed import to use a namespace import as a workaround for potential module resolution issues.
import * as firebaseApp from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

// Initialize Firebase
const app = firebaseApp.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
