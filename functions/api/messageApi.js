const MessageService = require("../service/messageService");

class MessageApi {
  static async sendStatusUpdatePushMessage(request, response) {
    const { userName, bookTitle, status } = request.body;

    await MessageService.sendStatusUpdatePushMessage(
      userName,
      bookTitle,
      status
    );

    return response.status(201).json({});
  }
}

module.exports = MessageApi;
