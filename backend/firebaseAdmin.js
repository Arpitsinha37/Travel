const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Ideally, use a service account key file. For now, we assume standard environment configuration
// or that the environment has GOOGLE_APPLICATION_CREDENTIALS set.
// If running locally without credentials, this might fail unless authenticated via gcloud cli.

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.warn("Firebase Admin Init Failed (Expected if no credentials):", error.message);
    }
}

module.exports = admin;
