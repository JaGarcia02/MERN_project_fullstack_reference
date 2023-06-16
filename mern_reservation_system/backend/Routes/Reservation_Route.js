const express = require("express");
const router = express.Router();
const {
  reserve_room,
  get_reservation_key,
  update_reservation,
  get_all,
  get_reservation_user,
} = require("../Controllers/Reservation");
const { protected_user } = require("../Middleware/UserProtected");

router.post("/reserve-room", protected_user, reserve_room);
router.get("/get-key/:key", get_reservation_key);
router.put("/update-data", update_reservation);
router.get("/get-all", get_all);
router.get("/get-reservation-user/:userID", get_reservation_user);

module.exports = router;
