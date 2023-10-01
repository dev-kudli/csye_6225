const AuthErrorHandler = require("../error/authErrorHandler");

const AssignmentClient = require('database').AssignmentClient;

const assignmentClient = new AssignmentClient();

// Middleware to check authorization
const canUserDeleteAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentClient.getAssignment(req.params.id);
    if (!assignment) throw new Error();
    if (assignment.createdBy === req.user.username) {
      next();
    } else {
      throw new AuthErrorHandler("AUTH_104");
    }
  } catch (error) {
    res.status(error.statusCode).send(error);
  }
};

module.exports = {
  canUserDeleteAssignment,
};
