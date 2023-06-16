const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 7777;
const DatabaseConnection = require("./config/database_connection");
const image_models = require("./models/image_models.js");
const multer = require("multer");
const uniqid = require("uniqid");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// multer part

// ***** saving the image to the storage ***** //
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, uniqid());
  },
});

const upload = multer({ storage: fileStorageEngine });

// multer part

// routes
app.post("/single", upload.single("image"), async (req, res) => {
  fs.rename(
    `/picture/${req.file.filename}`,
    `/picture/${req.file.filename}.png`,
    (err) => console.log(err)
  );
  //   console.log(req.file.fieldname);
  const uploaded = await image_models.create({
    img_path: `/picture/${req.file.filename}.png`,
  });
  return res.json(uploaded);
});

app.use("/picture", express.static("images"));

app.listen(port, () => {
  DatabaseConnection();
  console.log(`Server is running on port ${port}`);
});
