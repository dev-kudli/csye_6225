const assignmentError = {
  ASSGN_101: {
    statusCode: 404,
    code: "ASSGN_101",
    msg: "Assignment not found",
    description:
      "Expected value is a base64 encoded token in format username:password",
    timestamp: new Date().toISOString(),
  },
};

class AssignmentErrorHandler extends Error {
  constructor(errorCode) {
    const { statusCode, msg, description } = assignmentError[errorCode];
    super(msg);
    this.statusCode = statusCode;
    this.msg = msg;
    this.description = description;
  }
}

module.exports = AssignmentErrorHandler;
