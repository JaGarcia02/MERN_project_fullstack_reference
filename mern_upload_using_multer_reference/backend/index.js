const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const PORT = 4999;
const uniqid = require("uniqid");
const UploadRouter = require("./routes/upload_routes");
const db = require("./models");

// for file upload
app.use("/files", express.static("./images"));

app.use(express.json());
app.use("/api/upload", UploadRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
