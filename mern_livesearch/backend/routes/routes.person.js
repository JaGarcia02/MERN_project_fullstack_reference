const express = require("express");
const router = express.Router();
const {
  createPeople,
  viewAllData,
} = require("../controllers/controllers.person");

router.post("/create-person", createPeople);
router.get("/view-all-person", viewAllData);

module.exports = router;
