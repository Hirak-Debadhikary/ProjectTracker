const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import controllers
const formController = require("./controllers/formController");
const loginController = require("./controllers/loginController");
const statusController = require("./controllers/statusController");
const chartControllers = require("./controllers/chartControllers");

const mongoString = process.env.MONGODB_URI;
mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Use the formController for handling form submissions
app.use("/api", formController);
app.use("/api", loginController);
app.use("/api", statusController);
app.use("/api", chartControllers);

const port = process.env.PORT || 8070;
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
