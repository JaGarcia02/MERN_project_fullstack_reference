const connection = require("../Config/Connection");

const getGoals = async (req, res) => {
  // res.status(200).json({message:'Get goals'});

  connection.query("SELECT * FROM tbl_employee", [], (err, result) => {
    return res.status(200).json(result);
  });
};

const viewEmpById = async (req, res) => {
  const ID = req.params.id;
  connection.query(
    "SELECT * FROM tbl_employee WHERE id = ?",
    [ID],
    (err, result) => {
      return res.status(200).json(result);
    }
  );
};

const getByAge = async (req, res) => {
  // res.status(200).json({message:'Get goals'});

  connection.query(
    "SELECT * FROM tbl_employee WHERE age = 22",
    [],
    (err, result) => {
      return res.status(200).json(result);
    }
  );
};

const setGoal = async (req, res) => {
  // console.log(req.body);
  const { name, age, date } = req.body;
  connection.query(
    "INSERT INTO tbl_employee (`full_name`,`age`,`date`) VALUES (?,?,?)",
    [name, age, date],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        return res.status(200).json({
          message: "Data Inserted",
        });
      }
    }
  );
};

const updateGoal = async (req, res) => {
  // res.status(200).json({message:`Update goal ${req.params.id}`});
  const { name, age, date, id } = req.body;
  connection.query(
    "UPDATE tbl_employee SET full_name = ?, age= ?, date = ? WHERE id = ?",
    [name, age, date, id],
    (err, result) => {
      return res.status(200).json({
        message: "Data Updated!",
      });
    }
  );
};

const deleteGoal = async (req, res) => {
  // res.status(200).json({message:`Delete goal ${req.params.id}`});
  const { id } = req.params;
  connection.query(
    "DELETE FROM tbl_employee WHERE id = ?",
    [id],
    (err, result) => {
      return res.status(200).json({
        message: "Data Deleted!",
      });
    }
  );
};

//Exports Modules

/*
----------------------------------
  This will be exported to routes
----------------------------------
*/
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  getByAge,
  viewEmpById,
};
