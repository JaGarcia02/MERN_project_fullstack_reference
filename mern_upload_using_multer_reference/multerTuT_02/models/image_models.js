const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    img_path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ImagePaths = mongoose.model("ImagePath", imageSchema);
