const express = require("express");
const multer = require("multer");
const app = express();
const ejs = require("ejs");
const path = require("path");
const PORT = 4850;
const uniqid = require("uniqid");

//ejs
app.set("view engine", "ejs");

//public folder
app.use("/files", express.static("./public/uploads"));

// route
app.get("/", (req, res) => res.render("index"));
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("index", {
        msg: err,
      });
    } else {
      if (!req.file) {
        res.render("index", {
          msg: "Please Select a file!",
        });
      } else {
        res.render("index", {
          msg: "File Uploaded!",
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

// storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    // this will be the file name format when uploading files
    cb(null, uniqid() + path.extname(file.originalname));
  },
});

// upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// check file type
function checkFileType(file, cb) {
  // allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mine
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

// middleware

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
