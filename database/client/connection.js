// initialize sequelize obect
const { Sequelize } = require("sequelize");

// Load env variables
const dotenv = require("dotenv");
dotenv.config();

class Connection {
  constructor() {
    this.filename = "connection.js";

    // Get env variables

    this.db = process.env.POSTGRES_DB;
    this.user = process.env.POSTGRES_USER;
    this.pwd = process.env.POSTGRES_PASSWORD;
    this.uri = process.env.POSTGRES_URI;

    this.sequelize = this.getDb();

    // this.loadUsers();
  }

  init = () => {
    try {
      return new Sequelize(this.db, this.user, this.pwd, {
        host: this.uri,
        dialect: "postgres",
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
  getDb = () => {
    try {
      if (!this.sequelize) {
        this.sequelize = this.init();
      }
      return this.sequelize;
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
  testConnection = async () => {
    try {
      await this.sequelize.authenticate();
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
      await this.sequelize.close();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Connection;
