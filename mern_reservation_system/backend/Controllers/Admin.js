const { admin_data } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//CREATE ADMIN
const create_admin = async (req, res) => {
  try {
    const admin = await admin_data.findOne();
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("password", salt);

    if (!admin) {
      const create_admin = await admin_data.create({
        admin_username: "admin",
        admin_password: password,
        admin_email: "admin@admin.com",
        admin_role: "0",
      });

      return res.status(200).json(create_admin);
    } else {
      res.status(409).json({ message: "Admin already exist" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//LOGIN ADMIN
const login_admin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const login_admin = await admin_data.findOne({
      where: { admin_username: username },
    });

    if (!login_admin) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      login_admin.admin_password
    );

    if (isPasswordCorrect) {
      const token = generateAdminToken(
        login_admin.ID,
        login_admin.admin_username,
        login_admin.admin_email,
        login_admin.admin_role
      );
      return res
        .status(200)
        .cookie("admin_access_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json(token);
    } else {
      res.status(403).json({ message: "Wrong Credentials" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//LOGOUT ADMIN
const logout_admin = async (req, res) => {
  res
    .clearCookie("admin_access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User Logged logout successfully");
};

const generateAdminToken = (ID, username, email, role) => {
  return jwt.sign({ ID, username, email, role }, process.env.JWT_SECRET, {
    expiresIn: "8hr",
  });
};

module.exports = {
  create_admin,
  login_admin,
  logout_admin,
};
