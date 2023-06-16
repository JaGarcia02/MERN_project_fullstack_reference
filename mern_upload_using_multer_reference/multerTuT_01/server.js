const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 9110;
const DatabaseConnection = require("./config/database_connection");
const upload_models = require("./models/upload_models");
const fs = require("fs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // this will save the image in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Request
app.post("/", upload.single("testImage"), (req, res) => {
  // test image is the field name of the body of the req
  const saveImage = new upload_models({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png", // will only accept images files
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved");
});

// app.get("/", (req, res) => res.send("this is working fine!")); // testing for the get req
app.get("/", async (req, res) => {
  const allData = await upload_models.find();
  return res.json(allData);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  DatabaseConnection();
});
