// Import custom files
const Connection = require("database").Connection;

const connection = new Connection();

/**
 * Get DB Status
 *
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @returns {boolean} Status of DB
 */
const getDBHealthStatus = async (req, res) => {
  try {
    const isDbRunning = await connection.testConnection();
    if (!isDbRunning) throw new Error("Database not found");
    console.log("Connected to the database.");
    res.status(200).send();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(503).send();
  }
};

module.exports = {
  getDBHealthStatus,
};
