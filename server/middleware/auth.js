const AuthErrorHandler = require("../error/authErrorHandler");

// Middleware to check authorization
const isUserAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthErrorHandler("AUTH_101");
    }

    // The authorization header should be in the format "Basic base64_encoded_string"
    const encodedCredentials = authHeader.split(" ")[1];

    if (!encodedCredentials) {
      throw new AuthErrorHandler("AUTH_102");
    }

    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64",
    ).toString("utf-8");
    const [username, password] = decodedCredentials.split(":");

    if (username === "csye" && password === "csye") {
      req.user = {
        username,
        password,
      };
      next();
    } else {
      throw new AuthErrorHandler("AUTH_103");
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
};

module.exports = {
  isUserAuthenticated,
};
