const admin = require('firebase-admin');
const serviceAccount = require('../../service.json');

let adminApp:any;

function initializeAdminApp() {
    if (!admin.apps.length) {
        adminApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        }, 'admin');
    } else {
        adminApp = admin.apps[0];
    }
}

function getAdminApp() {
    if (!adminApp) {
        initializeAdminApp();
    }

    return adminApp;
}

// Export a function to get the messaging object
module.exports.getMessaging = () => getAdminApp().messaging();