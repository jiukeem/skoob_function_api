const { admin } = require("../common/config");
const { logger } = require("firebase-functions");

class MessageModel {
  static async sendSingleFirebaseMessage(title, body, token) {
    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
      android: {
        priority: "high",
      },
      apns: {
        headers: {
          "apns-priority": "10",
        },
        payload: {
          aps: {
            "mutable-content": 1,
            "content-available": 1,
          },
        },
      },
    };

    const result = await admin.messaging().send(message);

    logger.info(result);
  }
}

module.exports = MessageModel;
