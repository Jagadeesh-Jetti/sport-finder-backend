const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const dataBase = require("./utils/db");
const SportsUserRouter = require("./routers/User.router");
const ProfileRouter = require("./routers/Profile.router");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dataBase();

app.use(express.json());

app.use(cors());

app.use("/users", SportsUserRouter);
app.use("/profile", ProfileRouter);

app.get("/", (req, res) => {
  res.send("Sport Finder Backend");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log("Sport finder backend started");
});
