const generalError = {
    GEN_101: {
      statusCode: 400,
      code: "GEN_101",
      msg: "Invalid input",
      description:
        "Invalid query parameters",
      timestamp: new Date().toISOString(),
    },
    GEN_102: {
        statusCode: 400,
        code: "GEN_102",
        msg: "Invalid input",
        description:
          "Invalid request body",
        timestamp: new Date().toISOString(),
      },
  };
  
  class GeneralErrorHandler extends Error {
    constructor(errorCode) {
      const { statusCode, msg, description } = generalError[errorCode];
      super(msg);
      this.statusCode = statusCode;
      this.msg = msg;
      this.description = description;
    }
  }
  
  module.exports = GeneralErrorHandler;
  