const { MessageModel } = require("../model");

class MessageService {
  static async sendStatusUpdatePushMessage(userName, bookTitle, status) {
    const title = "SKOOB: 친구 소식";
    let body;

    if (status === "BookReadingStatus.reading") {
      body = `${userName}님이 ${bookTitle} 책을 읽기 시작했어요`;
    } else if (status === "BookReadingStatus.done") {
      body = `${userName}님이 ${bookTitle} 책을 완독했어요`;
    }

    // replace with real token
    const token =
      "cAAVaD6aSQq8WeLkEh4t56:APA91bGeuIVZhyeu8jA5sCsoz3z0faBQFXvmBW9SWZio9Of9SonovzUcrcNkdlIENrzRy-CW05XGn1QaZ2BHtJ-YF-_0-eqcYnQATFuzfuGLOcY4Y2HB-fbpdZUH6IwI-y17Yqw5rvkd";

    MessageModel.sendSingleFirebaseMessage(title, body, token);
  }
}

module.exports = MessageService;
