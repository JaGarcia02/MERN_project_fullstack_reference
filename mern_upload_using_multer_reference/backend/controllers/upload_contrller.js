const { upload_file } = require("../models");
const fs = require("fs");
const uploadFile = async (req, res) => {
  const { path } = req.body;

  try {
    fs.rename(
      `images/${req.files.filesHere[0].filename}`,
      `./images/${req.files.filesHere[0].filename}.png`,
      (err) => console.log(err)
    );

    const submit_data = await upload_file.create({
      filePath: `/images/${req.files.filesHere[0].filename}.png`,
    });
    return res.status(200).json(submit_data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  uploadFile,
};
