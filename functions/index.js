const { region } = require("firebase-functions");

const { MessageApi } = require("./api");
const { baseRegion } = require("./common/config");

exports.sendStatusUpdatePushMessage = region(baseRegion).https.onRequest(
  MessageApi.sendStatusUpdatePushMessage
);
