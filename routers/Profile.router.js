const express = require("express");
const ProfileRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const SportsProfile = require("../models/Profile.model");

ProfileRouter.get("/users", async (req, res) => {
  try {
    const allProfiles = await SportsProfile.find().populate("user", "name");
    res.json(allProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ProfileRouter.post("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sportsProfile, preferredActivities, location } = req.body;

    console.log("User ID:", userId);

    let userProfile = await SportsProfile.findOneAndUpdate(
      { user: userId },
      { sportsProfile, preferredActivities, location },
      { new: true, upsert: true }
    );

    res.json(userProfile);
  } catch (error) {
    console.error("Profile creation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

ProfileRouter.delete("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await SportsProfile.findOneAndDelete({ user: userId });

    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = ProfileRouter;
