const express = require("express");
const router = express.Router();
//-----------------Imported From Controllers----------------//
const {
  getGoals,
  setGoal,
  updateGoal,
  viewEmpById,
  getByAge,
  deleteGoal,
} = require("../Controllers/goalController");
//------------------Imported From Controllers----------------//

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-------Routes-------//
router.get("/viewAll", getGoals);
router.post("/set", setGoal);
router.put("/update", updateGoal);
router.delete("/delete/:id", deleteGoal);
router.get("/viewByAge", getByAge);
router.get("/viewById/:id", viewEmpById);
//-------Routes-------//

module.exports = router;
