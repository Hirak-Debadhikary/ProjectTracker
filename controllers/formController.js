const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

// Submit the project
router.post("/submit", async (req, res) => {
  try {
    // Destructure the properties from the request body
    const {
      projectName,
      reason,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      status,
    } = req.body;
    // Create a new FormData instance with the provided data
    const formData = new FormData({
      projectName,
      reason,
      type,
      division,
      category,
      priority,
      department,
      startDate,
      endDate,
      location,
      status,
    });
    // Save the form data in the database
    await formData.save();
    // Return a success message in the response
    res.status(200).json({ message: "Form data saved successfully" });
  } catch (error) {
    // Return a 500 error if there's an error in saving the form data
    res.status(500).json({ error: "An error occurred while saving form data" });
  }
});

// Get all the project
router.get("/getAll", async (req, res) => {
  try {
    // Retrieve all users from the database
    const allProjectData = await FormData.find();
    // Send a JSON response with the retrieved users
    res.json(allProjectData);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: "Error occurred while fetching users." });
  }
});

// Find Total Number of Projects
router.get("/status/count", async (req, res) => {
  try {
    // Count the number of documents in the FormData collection
    const count = await FormData.countDocuments();
    const running = await FormData.countDocuments({ status: "Running" });
    const closed = await FormData.countDocuments({ status: "Closed" });
    const cancelled = await FormData.countDocuments({ status: "Cancelled" });
    const currentDate = new Date();
    // Count the number of documents in the FormData collection
    const closerDelay = await FormData.countDocuments({
      status: "Running",
      endDate: { $lt: currentDate },
    });
    res.json({ count, running, closed, cancelled, closerDelay });
  } catch (error) {
    // Log the error message if there's an error
    console.error("Failed to retrieve project count", error);
    // Return a 500 error if there's a failure in retrieving the project count
    res.status(500).json({ error: "Failed to retrieve project count" });
  }
});

module.exports = router;
