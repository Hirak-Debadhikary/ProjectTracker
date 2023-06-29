const express = require("express");
const router = express.Router();

const { default: mongoose } = require("mongoose");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await mongoose.connection
      .collection("userData")
      .findOne({ email });

    // If the user is not found or password doesn't match, return an error
    if (password == user.password) {
      res.status(200).json({ message: "Login Successfully" });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If everything is correct, send the success message
  } catch (error) {
    console.log("Error occurred during login:", error);
    // return res.status(500).json({ error: "Error occurred during login" });
  }
});
module.exports = router;
