// ----- DB connection ----- //
const { json } = require("body-parser");
const connection = require("../config/userConnection");
// ----- DB connection ----- //

// View All Users //
const viewAllUsers = async (req, res) => {
  connection.query("SELECT * FROM tbl_users", [], (err, result) => {
    return res.status(200).json(result);
  });
};
// View All Users //

// Inser User //
const insertUser = async (req, res) => {
  const { name, birth_date, gender, age, username, password, email } = req.body;
  connection.query(
    "INSERT INTO tbl_users (`name`,`birth_date`,`gender`,`age`,`username`,`password`,`email`) VALUES (?,?,?,?,?,?,?)",
    [name, birth_date, gender, age, username, password, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ meesage: err });
      } else {
        return res.status(200).json({
          message: "Data Inserted",
        });
      }
    }
  );
};
// Inser User //

// Login User //
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM tbl_users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ meesage: err });
      } else {
        return res.status(200).json({
          message: "User login successfully",
        });
      }
    }
  );
};
// Login User //

// Update //
const updateUser = async (req, res) => {
  const { name, birth_date, gender, age, username, password, email, id } =
    req.body;
  connection.query(
    "UPDATE tbl_users SET name = ?, birth_date = ?, gender = ?, age = ?, username = ?, password = ?, email = ?",
    [name, birth_date, gender, age, username, password, email, id],
    (err, result) => {
      return res.status(200).json({
        message: "User updated successfully",
      });
    }
  );
};
// Update //

// Show Single User //
const viewUser = async (req, res) => {
  const ID = req.params.id;
  connection.query(
    "SELECT * FROM tbl_users WHERE id = ?",
    [ID],
    (err, result) => {
      return res.status(200).json(result);
    }
  );
};
// Show Single User //

// Delete //
const deleteUser = async (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM tbl_users WHERE id = ?",
    [id],
    (err, result) => {
      return res.status(200).json({ message: "user deleted successfully!!" });
    }
  );
};
// Delete //

// ----- Export Controllers ----- //
module.exports = {
  insertUser,
  viewAllUsers,
  loginUser,
  viewUser,
  deleteUser,
  updateUser,
};
// ----- Export Controllers ----- //
