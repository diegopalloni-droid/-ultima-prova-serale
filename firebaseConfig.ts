// ------------------- ISTRUZIONI IMPORTANTI -------------------
// PER FAR FUNZIONARE IL SALVATAGGIO SUL CLOUD, DEVI CONFIGURARE FIREBASE
// È GRATUITO E RICHIEDE 5 MINUTI.

// 1. Vai su https://firebase.google.com/ e clicca su "Inizia". Accedi con il tuo account Google.
// 2. Clicca su "Crea un progetto". Dagli un nome (es. "report-app") e segui i passaggi.
// 3. Una volta nel pannello del progetto, vai su "Firestore Database" (nel menu a sinistra).
//    - Clicca "Crea database".
//    - Scegli "Inizia in modalità produzione" e clicca "Avanti".
//    - Scegli una località per il server (es. europe-west) e clicca "Abilita".
//    - Vai alla scheda "Regole" e modifica la regola da `allow read, write: if false;` a `allow read, write: if true;`. **ATTENZIONE: questo è solo per iniziare. Per un'app reale, servono regole di sicurezza più stringenti.** Clicca "Pubblica".
// 4. Torna alla pagina principale del progetto (cliccando sull'icona della casa).
// 5. Clicca sull'icona "</>" (Web) per aggiungere un'app web al tuo progetto.
// 6. Dagli un nickname (es. "Report App Web") e clicca "Registra app".
// 7. Firebase ti mostrerà un oggetto `firebaseConfig`. COPIA TUTTO l'oggetto.
// 8. INCOLLA l'oggetto che hai copiato qui sotto, sostituendo l'oggetto `firebaseConfig` di esempio.

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
