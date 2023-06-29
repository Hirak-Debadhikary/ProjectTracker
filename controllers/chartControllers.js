const express = require("express");
const router = express.Router();
const FormData = require("../models/FormData");

router.get("/status/chart", async (req, res) => {
  try {
    // Count documents for department "Stores"
    const strTotal = await FormData.countDocuments({ department: "Stores" });
    const strClosed = await FormData.countDocuments({
      department: "Stores",
      status: "Closed",
    });
    const str = { total: strTotal, closed: strClosed };

    // Count documents for department "Finance"
    const finTotal = await FormData.countDocuments({ department: "Finance" });
    const finClosed = await FormData.countDocuments({
      department: "Finance",
      status: "Closed",
    });
    const fin = { total: finTotal, closed: finClosed };

    // Count documents for department "Quality"
    const qltTotal = await FormData.countDocuments({ department: "Quality" });
    const qltClosed = await FormData.countDocuments({
      department: "Quality",
      status: "Closed",
    });
    const qlt = { total: qltTotal, closed: qltClosed };

    // Count documents for department "Maintenance"
    const manTotal = await FormData.countDocuments({
      department: "Maintenance",
    });
    const manClosed = await FormData.countDocuments({
      department: "Maintenance",
      status: "Closed",
    });
    const man = { total: manTotal, closed: manClosed };

    // Count documents for department "Senior Technical Officer"
    const stoTotal = await FormData.countDocuments({
      department: "Senior Technical Officer",
    });
    const stoClosed = await FormData.countDocuments({
      department: "Senior Technical Officer",
      status: "Closed",
    });
    const sto = { total: stoTotal, closed: stoClosed };

    // Count documents for department "Human Resources"
    const hrTotal = await FormData.countDocuments({
      department: "Human Resources",
    });
    const hrClosed = await FormData.countDocuments({
      department: "Human Resources",
      status: "Closed",
    });
    const hr = { total: hrTotal, closed: hrClosed };

    // Return the counts for each department as JSON response
    res.json({ str, fin, qlt, man, sto, hr });
  } catch (error) {
    // Log the error message if there's an error
    console.error("Failed to retrieve project count", error);
    // Return a 500 error if there's a failure in retrieving the project count
    res.status(500).json({ error: "Failed to retrieve project count" });
  }
});

module.exports = router;
