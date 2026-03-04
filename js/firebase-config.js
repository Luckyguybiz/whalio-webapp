/* Whalio - Firebase Configuration */
/* INSTRUCTIONS: Replace these values with your Firebase project config */
/* Go to https://console.firebase.google.com -> Project Settings -> Your apps -> Web app */

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";

if (!isFirebaseConfigured) {
    console.warn("Whalio: Firebase not configured yet. Running in demo mode. Set your Firebase config in js/firebase-config.js");
}
