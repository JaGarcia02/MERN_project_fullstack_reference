const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "./images" });
const { uploadFile } = require("../controllers/upload_contrller");

router.post(
  "submit",
  upload.fields([{ name: "filesHere", maxCount: 1 }]),
  uploadFile
);

module.exports = router;
