// Import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Import custom files
const route = require("./route/route");
const assignmentRoute = require("./route/assignmentRoute");
const handleUnsupportedMethods = require("./middleware/unsupportedRoute");

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

const UserClient = require("database").UserClient;
const userClient = new UserClient();

const fs = require("fs");
const csv = require("csv-parser");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running successfully on PORT ${PORT}`);
  const users = [];

  // fs.createReadStream('../deployment/users.csv')
  //   .pipe(csv())
  //   .on('data', (data) => {
  //     const jsonItem = {
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       email: data.email,
  //       password: data.password
  //     };
  //     users.push(jsonItem);
  //   })
  //   .on('end', async () => {
  //     console.log('users array created', users)
  //     await userClient.createUserBulk(users);
  //   })
});

module.exports = app;
