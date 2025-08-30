import { User } from '../types';
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const usersCollection = collection(db, 'users');

// IMPORTANT: Seed your database manually in the Firebase Console.
// 1. Create a 'users' collection.
// 2. Add a document for the 'master' user with fields:
//    { username: 'master', name: 'Admin', isActive: true }
// 3. You can also add a demo user, e.g.,
//    { username: 'mario.rossi', name: 'Mario Rossi', isActive: true, password: 'password123' }

export const userService = {
  async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
  },

  async getUserByUsername(username: string): Promise<User | null> {
    const q = query(usersCollection, where('username', '==', username.toLowerCase()));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() } as User;
  },

  async addUser(username: string, name: string, password?: string): Promise<{ success: boolean; message?: string }> {
    const usernameLower = username.toLowerCase().trim();

    if (!usernameLower) {
        return { success: false, message: 'Il nome utente è obbligatorio.' };
    }

    const existingUser = await this.getUserByUsername(usernameLower);
    if (existingUser) {
      return { success: false, message: 'Questo nome utente esiste già.' };
    }
    
    if (!password || password.length < 6) {
        return { success: false, message: 'La password è obbligatoria e deve essere di almeno 6 caratteri.' };
    }

    const newUser = {
      username: usernameLower,
      name: name.trim() || usernameLower,
      isActive: true,
      password: password,
    };

    await addDoc(usersCollection, newUser);
    return { success: true };
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, updates);
    return null;
  },

  async deleteUser(userId: string): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    await deleteDoc(userDocRef);
  },
};