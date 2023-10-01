// Import custom files
const User = require("../models/user");

class UserClient {
  constructor() {
    this.filename = "assignmentClient.js";
  }
  /**
   * Create Assignment
   *
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {Object} Assignment Object
   */
  createUserBulk = async (users) => {
    try {
      const assignment = await User.bulkCreate(users);
      return assignment.toJSON();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserClient;
