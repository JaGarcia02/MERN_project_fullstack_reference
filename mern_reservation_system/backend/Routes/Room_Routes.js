const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  add_room,
  get_rooms,
  remove_room,
  update_room,
  searchRoom,
} = require("../Controllers/Room");
const upload = multer({ dest: "./Room_Images" });

router.post("/add-room", add_room);
router.get("/get-rooms", get_rooms);
router.delete("/remove-room/:id", remove_room);
router.put("/update-room", update_room);
router.get("/search-room/:availability/:pax", searchRoom);

module.exports = router;
