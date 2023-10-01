// Import custom files
// const Connection = require("database").Connection;

// const connection = new Connection();

/**
 * Get DB Status
 *
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @returns {boolean} Status of DB
 */
const getAuthToken = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) res.status(401).send();
    if (username == "csye" && password == "csye") {
      const textToEncode = `${username}:${password}`;
      const token = btoa(textToEncode);
      res.status(200).send(token);
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(503).send();
  }
};

module.exports = {
  getAuthToken,
};
