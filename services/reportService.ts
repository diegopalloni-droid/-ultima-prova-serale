import { SavedReport, User } from '../types';
import { db } from './firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';

const reportsCollection = collection(db, 'reports');

// Helper to compare dates while ignoring time and timezone.
const areDatesEqual = (date1: string, date2: string): boolean => {
    return date1.split('T')[0] === date2.split('T')[0];
};

export const reportService = {
  async getReports(user: User, isMasterUser: boolean): Promise<SavedReport[]> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    let q;
    if (isMasterUser) {
        q = query(reportsCollection, where('date', '>=', oneMonthAgo.toISOString()), orderBy('date', 'desc'));
    } else {
        q = query(reportsCollection, where('userId', '==', user.id), where('date', '>=', oneMonthAgo.toISOString()), orderBy('date', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        key: doc.id,
        ...(doc.data() as { date: string, text: string, userId: string }),
    } as SavedReport));
  },

  async saveReport(userId: string, report: { date: string, text: string }): Promise<SavedReport> {
    const dataToSave = {
      ...report,
      userId,
    };
    const docRef = await addDoc(reportsCollection, dataToSave);
    return { key: docRef.id, ...dataToSave };
  },
  
  async updateReport(reportKey: string, report: { date: string, text: string, userId: string }): Promise<SavedReport> {
    const reportDocRef = doc(db, 'reports', reportKey);
    await updateDoc(reportDocRef, report);
    return { key: reportKey, ...report };
  },

  async deleteReport(reportKey: string): Promise<void> {
    const reportDocRef = doc(db, 'reports', reportKey);
    await deleteDoc(reportDocRef);
  },
  
  async checkDateConflict(userId: string, dateToCheck: string, currentReportKey: string | null): Promise<SavedReport | null> {
    const q = query(reportsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    for (const doc of querySnapshot.docs) {
        // Ensure we are not checking the report against itself
        if (doc.id !== currentReportKey) {
            const reportData = doc.data() as { date: string, text: string, userId: string };
            if (areDatesEqual(reportData.date, dateToCheck)) {
                return { key: doc.id, ...reportData }; // Conflict found
            }
        }
    }
    
    return null; // No conflict
  },
};