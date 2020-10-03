const ObjectID = require('mongodb').ObjectID

class Contact {
  constructor(db) {
    this.collection = db.collection('contacts');
  }
  async addEntity(contact) {
    const newContact = await this.collection.insertOne(contact);
    return newContact;
  }
  async updateEntity(id, update) {
    const objId = new ObjectID(id);
    const updatedContact = await this.collection.updateOne({_id: objId}, {$set:update});
    // const updatedContact = await this.collection.updateOne({_id: objId}, {$set:update});
    return updatedContact;
  }
  async findContact(contact) {
    const foundContact = await this.collection.findOne(contact);
    return foundContact;
  }

  async find(filter, lim, sort) {
    // const foundMessages = await this.collection.aggregate([{$match: filter}]).toArray();
    const foundContacts = await this.collection.find(filter).limit(lim).sort(sort).toArray();
    return foundContacts;

  }
  
  async findContacts(filter) {
    const foundContacts = await this.collection.find(filter).toArray();
    return foundContacts;
  }

  async deleteEntity(id) {
    const objId = new ObjectID(id)
    // const foundMessages = await this.collection.aggregate([{$match: filter}]).toArray();
    const delContact = await this.collection.deleteOne({_id: objId});
    return delContact;

  }

  async findById(id) {
    var objId = new ObjectID(id);
    const foundContact = await this.collection.findOne({_id: objId});
    return foundContact;
  }
}
module.exports = Contact;
