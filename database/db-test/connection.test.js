const chai = require("chai");

// Import the module you want to test
const Connection = require("../db").Connection;
const connection = new Connection();

var sequelize = {};

describe("DB Connection", () => {
  it("should connect to db", async () => {
    sequelize = await connection.getDb();
    const isDbConnected = await connection.testConnection(sequelize);
    chai.assert.isTrue(isDbConnected);
  });

  it("should close connection", async () => {
    const isDbDisconnected = await connection.closeConnection();
    chai.assert.isTrue(isDbDisconnected);
  });
});
