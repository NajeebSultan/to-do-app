const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Check if serviceAccountKey.json exists before initializing
// You must download this file from Firebase Console -> Project Settings -> Service Accounts
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("🔥 Firebase Admin Initialized");
} catch (error) {
    console.error("❌ Firebase Admin Initialization Failed: Missing serviceAccountKey.json or invalid credentials.");
    console.error("   Please download your service account key from Firebase Console and save it as 'server/config/serviceAccountKey.json'");
}

module.exports = admin;
