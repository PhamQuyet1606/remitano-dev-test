const admin = require('firebase-admin');
const {firebaseCredentials} = require("./config");

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    databaseURL: 'https://remitano-dev-test.firebaseio.com',
});
const db = admin.firestore();
module.exports = {admin, db};
