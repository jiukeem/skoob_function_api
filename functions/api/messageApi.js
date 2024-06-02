const MessageService = require("../service/messageService");

class MessageApi {
  static async sendStatusUpdatePushMessage(request, response) {
    const { userId, userName, bookTitle, status } = request.body;

    await MessageService.sendStatusUpdatePushMessage(
      userId,
      userName,
      bookTitle,
      status
    );

    return response.status(201).json({});
  }
}

module.exports = MessageApi;
