const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config({
  path: ".env",
});

const mongoURI = process.env.MONGODB;

const dataBase = () => {
  if (!mongoURI) {
    console.error("Enviromente variable not defined!");
  } else {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Database connected.");
      })
      .catch((error) => {
        console.error("Error while connecting database,", error);
      });
  }
};

module.exports = dataBase;
