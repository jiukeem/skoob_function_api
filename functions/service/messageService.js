const { MessageModel } = require("../model");
const FirebaseDbService = require("./firebaseDbService");

class MessageService {
  static async sendStatusUpdatePushMessage(
    userId,
    userName,
    bookTitle,
    status
  ) {
    const title = "SKOOB: 친구 소식";
    let body;

    if (status === "BookReadingStatus.reading") {
      body = `${userName}님이 ${bookTitle} 책을 읽기 시작했어요`;
    } else if (status === "BookReadingStatus.done") {
      body = `${userName}님이 ${bookTitle} 책을 완독했어요`;
    }

    const friendData = await FirebaseDbService.getFriendList(userId);
    const tokenList = this.getFriendTokenList(friendData);

    await MessageModel.sendMultipleFirebaseMessages(title, body, tokenList);

    console.log(`push message sent:${body} to ${tokenList}`);
  }

  static getFriendTokenList(friendData) {
    const tokenList = [];
    for (const key in friendData) {
      tokenList.push(friendData[key]["messageToken"]);
    }

    return tokenList;
  }

  static async sendDebugStatusUpdatePushMessage(userName, bookTitle, status) {
    const title = "SKOOB: 친구 소식";
    let body;

    if (status === "BookReadingStatus.reading") {
      body = `${userName}님이 ${bookTitle} 책을 읽기 시작했어요`;
    } else if (status === "BookReadingStatus.done") {
      body = `${userName}님이 ${bookTitle} 책을 완독했어요`;
    }

    // replace with real token

    const token =
      "eHuoj1hbQH-3Sz03th69P_:APA91bEoFQRVi2xKPj7uftIlxuBzYSG9qPcj49o-iOz1Yg6IevALJCk6TdX30ggFKSzinjsH6srrARb8X4vnH2zefSAe4llESiXY0cCGAoMvcAFe5RwxR4k2mLAqIulsfCMwZY00VX3t";

    await MessageModel.sendSingleFirebaseMessage(title, body, token);
  }
}

module.exports = MessageService;
