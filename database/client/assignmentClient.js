// Import custom files
const Assignment = require("../models/assignment");

class AssignmentClient {
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
  createAssignment = async (payload, username) => {
    try {
      const { name, points, num_of_attempts, deadline } = payload;
      const assignment = await Assignment.create({
        name: name,
        points: points,
        num_of_attempts: num_of_attempts,
        deadline: deadline,
        createdBy: username,
      });
      return assignment.toJSON();
    } catch (error) {
      throw error;
    }
  };

  deleteAssignment = async (id) => {
    try {
      const isDeleted = await Assignment.destroy({
        where: { id: id },
      });
      return isDeleted;
    } catch (error) {
      throw error;
    }
  };

  getAssignment = async (assignmentId) => {
    try {
      const assignment = await Assignment.findOne({
        where: { id: assignmentId },
      });
      return assignment;
    } catch (error) {
      throw error;
    }
  };

  getAllAssignment = async () => {
    try {
      const assignments = await Assignment.findAll();
      assignments.forEach((assignment) => {
        return assignment.toJSON();
      });
      return assignments;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AssignmentClient;
