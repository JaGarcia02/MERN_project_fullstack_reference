import mongoose from "mongoose";
import express from "express";
const app = express();

const connection_to_database = async () => {
  try {
    const connection = await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(() => {
          console.log(`Server Port: ${process.env.PORT}`.underline.cyan);
          console.log(`Server Status: Running`.underline.yellow);
          console.log("Database Connection: Connected".underline.magenta);
        });
      })
      .catch((error) => {
        console.log(`${error}, database didn't connect properly!`);
        console.log("Database Connection: Failed".underline.red);
        console.log("Server Status: Offline".underline.red);
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default connection_to_database;
