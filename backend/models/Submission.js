class Submission {
  constructor(db) {
    this.collection = db.collection('submissions');
  }

  async create(submissionData) {
    try {
      const result = await this.collection.insertOne({
        ...submissionData,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'pending',
      });
      return result;
    } catch (error) {
      throw new Error(`Error creating submission: ${error.message}`);
    }
  }

  async findAll(filter = {}) {
    try {
      return await this.collection.find(filter).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      throw new Error(`Error fetching submissions: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const { ObjectId } = require('mongodb');
      return await this.collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Error finding submission: ${error.message}`);
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
      throw new Error(`Error updating submission: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const { ObjectId } = require('mongodb');
      return await this.collection.deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Error deleting submission: ${error.message}`);
    }
  }
}

module.exports = Submission;
