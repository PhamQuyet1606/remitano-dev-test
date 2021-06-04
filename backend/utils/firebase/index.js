const admin = require('firebase-admin');
const credentials = require("./credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: 'https://remitano-dev-test.firebaseio.com',
});
const db = admin.firestore();
module.exports = {admin, db};
