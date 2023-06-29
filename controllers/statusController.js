const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

// Update project status endpoint
router.put("/projects/:id/status", async (req, res) => {
  // Extract the project ID from the request parameters
  const { id } = req.params;
  // Extract the new status from the request body
  const { status } = req.body;

  try {
    // Find the project by its ID in the database
    const project = await FormData.findById(id);

    // If the project doesn't exist, return a 404 error
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Define an array of valid project statuses
    const validStatuses = ["Running", "Closed", "Cancelled"];

    // If the provided status is not valid, return a 400 error
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid project status" });
    }

    // If the project is already in the desired status, return a 400 error
    if (project.status === status) {
      return res.status(400).json({ error: `Project is already ${status}` });
    }
    // Update the project's status to the new value
    project.status = status;
    // Save the updated project in the database
    await project.save();
    // Return the updated status in the response
    res.json({ status: project.status });
  } catch (error) {
    // Log the error message if there's an error
    console.error("Failed to update project status", error);
    // Return a 500 error if there's a failure in updating the project status
    res.status(500).json({ error: "Failed to update project status" });
  }
});

module.exports = router;
