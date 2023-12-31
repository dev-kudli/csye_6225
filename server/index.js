// Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Import custom files
const route = require("./route/route");
const assignmentRoute = require("./route/assignmentRoute");
const handleUnsupportedMethods = require("./middleware/unsupportedRoute");
const helper = require('./helper/helper');

const syncModels = require("database").syncModels;

// Load environment variables
dotenv.config();

// Get environment variables
const PORT = process.env.SERVER_PORT;

// Initialize express
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // Client's domain
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true, // Enable HTTPS
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
  ], // Allowed headers
};

app.use(cors(corsOptions));

// Return 405 for unsupported methods
app.use(handleUnsupportedMethods);

// Valid routes
app.use("/", route);
app.use("/v1/assignments", assignmentRoute);

// Handle invalid routes
app.use("*", (req, res) => {
  res.status(404).send();
});

(async () => {
  try {
    await syncModels();
    const users = await helper.readUsersFromCsv();
    const addedUsers = await helper.createDefaultUsers(users);
    console.log(`Added ${addedUsers} users from .csv file`);
  } catch (error) {
    console.log(error);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
});

module.exports = app;
