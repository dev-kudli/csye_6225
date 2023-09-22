const { Sequelize } = require("sequelize");
const getDb = require("./connection");

class Helper {
  constructor() {
    this.filename = "helper.js";
  }

  /**
   * Test DB connection
   *
   * @returns {boolean} Status of DB
   */
  testConnection = async () => {
    try {
      const sequelize = getDb().authenticate();
      return true;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Close connection
   *
   * @returns {boolean} Status of DB
   */
  closeConnection = async () => {
    try {
      await getDb().close();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Helper;
