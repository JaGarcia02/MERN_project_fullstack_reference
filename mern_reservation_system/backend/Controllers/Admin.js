const { admin_data } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SendEmailForgot_admin } = require("../Nodemailer/handlebars");
const { Op } = require("sequelize");

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

const change_email_admin = async (req, res) => {
  const { email, password, newEmail } = req.body;
  try {
    const findUserEmail = await admin_data.findOne({
      where: { admin_email: email },
    });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      findUserEmail.admin_password
    );

    if (!isPasswordCorrect) {
      return res.status(409).json({ message: "Wrong Password" });
    }

    const checkEmail = await admin_data.findOne({
      where: { admin_email: newEmail },
    });

    if (checkEmail) {
      return res.status(409).json({ message: "Email is Already used!" });
    }

    await admin_data.update(
      { admin_email: newEmail },
      { where: { ID: findUserEmail.ID } }
    );

    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const change_password_admin = async (req, res) => {
  const { ID, currentPassword, newPassword } = req.body;
  try {
    const findUserId = await admin_data.findOne({ where: { ID: ID } });

    const isPasswordCorrect = bcrypt.compareSync(
      currentPassword,
      findUserId.admin_password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Wrong Password!" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hashSync(newPassword, salt);

    await admin_data.update(
      { admin_password: hashedPw },
      { where: { ID: findUserId.ID } }
    );

    return res
      .status(200)
      .json({ message: "Password has successfully changed!" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//FORGOT ADMIN
const admin_forgot = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await admin_data.findOne({
      where: { [Op.or]: [{ admin_email: email }, { admin_username: email }] },
    });

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const token = jwt.sign(
      { id: findUser.ID, email: findUser.admin_Email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3m",
      }
    );

    SendEmailForgot_admin(token, findUser.admin_email);

    return res.status(200).json({ message: "Email has been sent" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//ADMIN CHANGE WITH FORGOT
const admin_forgotChange = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const salt = await bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hashSync(password, salt);

    await admin_data.update(
      { admin_password: hashedPw },
      { where: { ID: decoded.id } }
    );

    return res.status(200).json({ message: "Password change successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  create_admin,
  login_admin,
  logout_admin,
  change_email_admin,
  change_password_admin,
  admin_forgot,
  admin_forgotChange,
};
