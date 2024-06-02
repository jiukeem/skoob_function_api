const { admin } = require("../common/config");

class FirebaseDbModel {
  static async createDocument(documentPath, data = {}) {
    const documentRef = this.getReference(documentPath);
    await documentRef.set(data);
  }

  static async getDocumentData(documentPath) {
    const documentRef = this.getReference(documentPath);
    const snapshot = await documentRef.get();

    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw new Error("Document is not existing");
    }
  }

  static async updateDocumentData(documentPath, data, merge = true) {
    admin.firestore().doc(documentPath).set(data, { merge });
  }

  static async getDocumentList(collectionPath) {
    const collection = this.getReference(collectionPath);
    const snapshot = await collection.get();
    const docList = [];

    snapshot.forEach((doc) => {
      docList.push(doc.id);
    });

    return docList;
  }

  static getReference(path) {
    let reference = admin.firestore();
    const tokens = path.split("/");

    for (const token of tokens) {
      if (tokens.indexOf(token) % 2 === 1) {
        reference = this.getDocumentRef(reference, token);
      } else {
        reference = this.getCollectionRef(reference, token);
      }
    }

    return reference;
  }

  static getCollectionRef(documentRef, id) {
    return documentRef.collection(id);
  }

  static getDocumentRef(collectionRef, id) {
    return collectionRef.doc(id);
  }
}

module.exports = FirebaseDbModel;
