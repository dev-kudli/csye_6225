const { DataTypes } = require("sequelize");
const Connection = require("../client/connection");

const Assignment = Connection.sequelize.define(
  "Assignment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },

    num_of_attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 100,
      },
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "assignment_created",
    updatedAt: "assignment_updated",
  },
);

Assignment.sync();

module.exports = Assignment;
