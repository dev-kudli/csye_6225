// initialize sequelize obect
const { Sequelize } = require("sequelize");

// Load env variables
const dotenv = require("dotenv");
dotenv.config();

class Connection {
  
  static db = process.env.POSTGRES_DB;
  static user = process.env.POSTGRES_USER;
  static pwd = process.env.POSTGRES_PASSWORD;
  static uri = process.env.POSTGRES_URI;

  static init = () => {
    try {
      return new Sequelize(Connection.db, Connection.user, Connection.pwd, {
        host: Connection.uri,
        dialect: "postgres",
        logging: false,
        define: {
          timestamps: false, // Adds 'createdAt' and 'updatedAt' fields to models
          underscored: true, // Uses snake_case names
        },
      });
    } catch (error) {
      console.log("Error Connecting to Postgres");
      return {};
    }
  };

  /**
   * Get DB Connection Object
   *
   * @returns {Object} Connection Object
   */
  static getDb = () => {
    try {
      if (!Connection.sequelize) {
        Connection.sequelize = Connection.init();
      }
      return Connection.sequelize;
    } catch (error) {
      console.log("DB authntication error");
      return {};
    }
  };

  /**
   * Test DB connection
   *
   * @returns {boolean} Status of DB
   */
  static testConnection = async () => {
    try {
      await Connection.sequelize.authenticate();
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
  static closeConnection = async () => {
    try {
      await Connection.sequelize.close();
      Connection.sequelize = {}
      return true;
    } catch (error) {
      throw error;
    }
  };

  static sequelize = Connection.getDb();
}

module.exports = Connection;