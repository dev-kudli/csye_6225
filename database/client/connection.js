// initialize sequelize obect
const { Sequelize } = require("sequelize");

// Load env variables
const db = process.env.POSTGRES_DB;
const user = process.env.POSTGRES_USER;
const pwd = process.env.POSTGRES_PASSWORD;
const uri = process.env.POSTGRES_URI;

const init = () => {
  try {
    return new Sequelize(db, user, pwd, {
      host: uri,
      dialect: "postgres",
      define: {
        timestamps: true, // Adds 'createdAt' and 'updatedAt' fields to models
        paranoid: true, // Adds 'deletedAt' field to models
        underscored: true, // Uses snake_case for table and column names
      },
    });
  } catch (error) {
    console.log("Error Connecting to Postgres");
    return {};
  }
};

var sequelize;

/**
 * Get DB Connection Object
 *
 * @returns {boolean} Connection Object
 */
const getDb = () => {
  try {
    if (!sequelize) {
      console.log("Connecting to DB again");
      return sequelize=init();
    } else return sequelize;
  } catch (error) {
    console.log('DB authntication error');
    return {}
  }

};

module.exports = getDb;
