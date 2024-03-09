const express = require("express");
const SportsUserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SportsUser = require("../models/SportsUser.model");

SportsUserRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const existingSportsUser = await SportsUser.findOne({ email });
    if (existingSportsUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSportsUser = new SportsUser({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newSportsUser.save();

    res.status(201).json({ message: "SportsUser created successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error while signing up the user" });
  }
});

SportsUserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const sportsUser = await SportsUser.findOne({ email });

    if (!sportsUser) {
      return res.status(401).json({ message: "User not found in database" });
    }

    const isPasswordValid = await bcrypt.compare(password, sportsUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { sportsUserId: sportsUser._id },
      process.env.JWT_SECRET || "sports",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error while logging in the user" });
  }
});

module.exports = SportsUserRouter;
