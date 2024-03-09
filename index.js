const express = require("express");
const cors = require("cors");
const app = express();

const SportsUserRouter = require("./routers/User.router");
const ProfileRouter = require("./routers/Profile.router");
const dataBase = require("./db");

dataBase();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Sport Finder Backend");
});

app.use("/users", SportsUserRouter);
app.use("/profile", ProfileRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went terribly wrong" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Sport finder backend started");
});
