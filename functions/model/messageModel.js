const { admin } = require("../common/config");
const { logger } = require("firebase-functions");

class MessageModel {
  static async sendSingleFirebaseMessage(title, body, token) {
    const message = this.getMessageTemplate(title, body);
    message["token"] = token;

    const result = await admin.messaging().send(message);

    logger.info(result);
  }

  static async sendMultipleFirebaseMessages(title, body, tokens) {
    const message = this.getMessageTemplate(title, body);
    message["tokens"] = tokens;

    try {
      const result = await admin.messaging().sendEachForMulticast(message);
      logger.info(`Successfully sent message: ${result}`);
      if (result.failureCount > 0) {
        const failedTokens = [];
        result.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        logger.warn(`List of tokens that caused failures: ${failedTokens.length}`);
      }
    } catch (error) {
      logger.error("Error sending multiple messages:", error);
    }
  }

  static getMessageTemplate(title, body) {
    return {
      notification: {
        title: title,
        body: body,
      },
      android: {
        priority: "high",
        notification: {
          channel_id: "skoob_sound_message_channel",
        },
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
  }
}

module.exports = MessageModel;
