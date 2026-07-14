class Challenge {
  constructor(db) {
    this.collection = db.collection('challenges');
  }

  async create(challengeData) {
    try {
      const result = await this.collection.insertOne({
        ...challengeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return result;
    } catch (error) {
      throw new Error(`Error creating challenge: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.collection.find({}).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      throw new Error(`Error fetching challenges: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const { ObjectId } = require('mongodb');
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Error finding challenge: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const { ObjectId } = require('mongodb');
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: {
            ...updateData,
            updatedAt: new Date(),
          }
        }
      );
      return result;
    } catch (error) {
      throw new Error(`Error updating challenge: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const { ObjectId } = require('mongodb');
      return await this.collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Error deleting challenge: ${error.message}`);
    }
  }
}

module.exports = Challenge;
