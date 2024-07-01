const functions = require("firebase-functions");
const app = require("./api/index.js");

exports.api = functions.https.onRequest(app);
