const express = require("express");
const {
  get_report,
  create_or_update_report,
} = require("../Controllers/Report");
const router = express.Router();

router.get("/get-report", get_report);
router.put("/adding-report", create_or_update_report);

module.exports = router;
