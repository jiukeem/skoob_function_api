const admin = require("firebase-admin");

admin.initializeApp();

const baseRegion = "asia-northeast2";

module.exports = { admin, baseRegion };
