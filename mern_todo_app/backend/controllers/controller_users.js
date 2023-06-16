const db = require("../models");
const { tbl_todoUsers } = require("../models");
const bcrypt = require("bcrypt");

// User Create Update View Delete function
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user_exist = await tbl_todoUsers.findOne({
      where: { username: username },
    });

    if (user_exist) {
      return res.status(409).json({ meessage: "User already exsist!" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = await tbl_todoUsers.create({
      username,
      password: hashedPassword,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await tbl_todoUsers.destroy({ where: { id: id } });
    return res.status(200).json({ meessage: "User has been deleted." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewAllUsers = async (req, res) => {
  try {
    const users_list = await tbl_todoUsers.findAll();
    return res.status(200).json(users_list);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  try {
    const editUser = await tbl_todoUsers.update(
      {
        username: username,
        password: hashedPassword,
      },
      { where: { id: id } }
    );
    return res.status(200).json({ message: "User has been updated!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const viewUser = await tbl_todoUsers.findOne({ where: { id: id } });
    return res.status(200).json(viewUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login user
const Login_User = async (req, res) => {
  const { username, password } = req.body;
  const User = await tbl_todoUsers.findOne({
    where: { username: username },
  });
  try {
    if (!User) {
      return res.status(403).json("User account dosen't exist!");
    }
    bcrypt.compare(password, User.password).then(async (match) => {
      if (!match) {
        return res
          .status(401)
          .json({ meessage: "Wrong password, Please try again" });
      } else {
        return res.status(200).json({ meessage: "User Loggedin Successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  deleteUser,
  viewAllUsers,
  updateUser,
  viewSingleUser,
  Login_User,
};
