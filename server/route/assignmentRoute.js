const express = require("express");

// Import Custom Files
const {
  createAssignment,
  deleteAssignment,
  getAllAssignment,
  getAssignment,
  updateAssignment,
} = require("../controller/assignmentController.js");

const { isUserAuthenticated } = require("../middleware/auth.js");
const {
  canUserDeleteAssignment,
} = require("../middleware/assignmentAuthorization.js");

const route = express.Router();

route.get("/", isUserAuthenticated, getAllAssignment);
route.get("/:id", isUserAuthenticated, getAssignment);

route.post("/", isUserAuthenticated, createAssignment);
route.put("/:id", isUserAuthenticated, canUserDeleteAssignment, updateAssignment)

route.delete(
  "/:id",
  isUserAuthenticated,
  canUserDeleteAssignment,
  deleteAssignment,
);

module.exports = route;
