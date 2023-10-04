// Import custom files
const AssignmentClient = require("database").AssignmentClient;
const AssignmentErrorHandler = require("../error/assignmentErrorHandler");
const GeneralErrorHandler = require("../error/generalErrorHandler");

const isValidUUID = require("../helper/helper").isValidUUID;

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
    if (!name || !points || !num_of_attempts || !deadline) throw new GeneralErrorHandler('GEN_102');
    if (points>10 || points<1) throw new AssignmentErrorHandler('ASSGN_102')
    if (deadline <= new Date().toISOString()) throw new AssignmentErrorHandler('ASSGN_102')
    const payload = {
      name: name,
      points: points,
      num_of_attempts: num_of_attempts,
      deadline: deadline,
    };
    const assignment = await assignmentClient.createAssignment(
      payload,
      req.user.id,
    );
    res.status(201).send(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send();
  }
};

const deleteAssignment = async (req, res) => {
  try {
    if (!isValidUUID(req.params.id)) throw new AssignmentErrorHandler('ASSGN_103');

    const isDeleted = await assignmentClient.deleteAssignment(req.params.id);
    if (!isDeleted) throw new AssignmentErrorHandler('ASSGN_101')
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting assignment:", error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send();
  }
};

const getAssignment = async (req, res) => {
  try {
    if (!isValidUUID(req.params.id)) throw new AssignmentErrorHandler('ASSGN_103');
    
    const assignment = await assignmentClient.getAssignment(req.params.id);
    if (!assignment) throw new AssignmentErrorHandler("ASSGN_101");

    res.status(200).send(assignment.toJSON());
  } catch (error) {
    console.error("Error getting assignment:", error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send();
  }
};

const getAllAssignment = async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) throw new GeneralErrorHandler('GEN_102');

    const assignments = await assignmentClient.getAllAssignment();
    assignments.forEach((assignment) => {
      return assignment.toJSON();
    });
    res.status(200).send(assignments);
  } catch (error) {
    console.error("Error getting assignment:", error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send();
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    if (!assignmentId) throw new AssignmentErrorHandler('ASSGN_103');

    const assignment = Object.keys(req.body).reduce((result, key) => (req.body[key] !== null ? { ...result, [key]: req.body[key] } : result), {});
    if (!assignment) throw new GeneralErrorHandler('GEN_102');

    const updatedAssignment = await assignmentClient.updateAssignment(assignment, assignmentId, req.user.id);
    res.status(200).send(updatedAssignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send();
  }
};

module.exports = {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAllAssignment,
  updateAssignment,
};
