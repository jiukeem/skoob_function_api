const { FirebaseDbModel } = require("../model");

class FirebaseDbService {
  static async getFriendList(userId) {
    const docPath = `user/${userId}/friend/list`;
    const data = await FirebaseDbModel.getDocumentData(docPath);

    return data;
  }

  static async getUserToken(userId) {
    const docPath = `user/${userId}/profile/info`;
    const data = await FirebaseDbModel.getDocumentData(docPath);

    return data["messageToken"];
  }

  static async updateFriendTokenList(friendList) {}
}

module.exports = FirebaseDbService;
