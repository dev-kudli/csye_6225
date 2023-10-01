// Import custom files
const AssignmentClient = require("database").AssignmentClient;
const AssignmentErrorHandler = require("../error/assignmentErrorHandler");

const assignmentClient = new AssignmentClient();

/**
 * Create Assignment
 *
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @returns {boolean} Status of DB
 */
const createAssignment = async (req, res) => {
  try {
    const { name, points, num_of_attempts, deadline } = req.body;
    const payload = {
      name: name,
      points: points,
      num_of_attempts: num_of_attempts,
      deadline: deadline,
    };
    const assignment = await assignmentClient.createAssignment(
      payload,
      req.user.username,
    );
    res.status(201).send(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    res.status(400).send();
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const isDeleted = await assignmentClient.deleteAssignment(
      req.params.id,
    );
    if (isDeleted) res.status(200).send();
    else res.status(201).send();
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(503).send();
  }
};

const getAssignment = async (req, res) => {
  try {
    const assignment = await assignmentClient.getAssignment(req.params.id);
    if (!assignment) throw new AssignmentErrorHandler("ASSGN_101");
    res.status(200).send(assignment.toJSON());
  } catch (error) {
    console.error("Error getting assignment:", error);
    res.status(404).send(error);
  }
};

const getAllAssignment = async (req, res) => {
  try {
    const assignments = await assignmentClient.getAllAssignment();
    assignments.forEach((assignment) => {
      return assignment.toJSON();
    });
    res.status(200).send(assignments);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(503).send();
  }
};

module.exports = {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAllAssignment,
};
