const { users_data } = require("../models");
const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const {
  SendVerification,
  SendEmailForgot,
} = require("../Nodemailer/handlebars");

//CREATE USER
const create_user = async (req, res) => {
  const {
    user_LastName,
    user_FirstName,
    user_MiddleName,
    user_Email,
    user_ContactNum,
    user_Address,
    user_username,
    user_password,
  } = req.body;

  try {
    const userExist = await users_data.findOne({
      where: { [Op.or]: [{ user_username }, { user_Email }] },
    });

    if (userExist) {
      //CHECK IF USER ALREADY EXIST
      return res.status(409).json({ message: "User already Exist" });
    } else {
      const salt = await bcryptjs.genSaltSync(10);
      const hashedPw = await bcryptjs.hashSync(user_password, salt);

      const newUser = await users_data.create({
        user_LastName,
        user_FirstName,
        user_MiddleName,
        user_Email,
        user_ContactNum,
        user_Address,
        user_username,
        user_password: hashedPw,
        user_verified: 0,
      });

      const token = generateToken(
        newUser.ID,
        newUser.user_username,
        newUser.user_Email,
        newUser.user_FirstName + " " + newUser.user_LastName
      );

      SendVerification(token, newUser.user_Email, newUser.user_FirstName);

      return res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//LOGIN USER AUTHENTICATION
const login_user = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users_data.findOne({
      where: { user_username: username },
    });

    if (!user || user.user_verified == 0) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      user.user_password
    );

    if (isPasswordCorrect) {
      const token = generateToken(
        user.ID,
        user.user_username,
        user.user_Email,
        user.user_ContactNum,
        user.user_FirstName +
          " " +
          user.user_MiddleName +
          " " +
          user.user_LastName
      );
      return res
        .status(200)
        .cookie("user_access_token", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
        })
        .json(token);
    } else {
      return res.status(403).json({ message: "Credentials are invalid!" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//VERIFY USER
const verify_user = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const update_verified = await users_data.update(
      { user_verified: 1 },
      { where: { ID: decoded.id } }
    );

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//FORGOT PASSWORD
const forgot_password_generate = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await users_data.findOne({
      where: { [Op.or]: [{ user_email: email }, { user_username: email }] },
    });

    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const token = jwt.sign(
      { id: findUser.ID, email: findUser.user_Email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3m",
      }
    );
    SendEmailForgot(token, findUser.user_Email, findUser.user_FirstName);

    return res.status(200).json({ message: "Email has been sent" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const forgot_password_change = async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPw = await bcryptjs.hashSync(password, salt);

    await users_data.update(
      { user_password: hashedPw },
      { where: { ID: decoded.id } }
    );

    return res.status(200).json({ message: "Password change successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const logout_user = async (req, res) => {
  return res
    .clearCookie("user_access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User Logged logout successfully");
};

const get_user_info = async (req, res) => {
  const { ID } = req.params;
  try {
    const user = await users_data.findOne({
      where: { ID },
      attributes: { exclude: ["user_password"] },
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//EMAIL SETTING CHANGE
const change_email = async (req, res) => {
  const { email, password, newEmail } = req.body;
  try {
    const findUserEmail = await users_data.findOne({
      where: { user_Email: email },
    });

    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      findUserEmail.user_password
    );

    if (!isPasswordCorrect) {
      return res.status(409).json({ message: "Wrong Password" });
    }

    const checkEmail = await users_data.findOne({
      where: { user_Email: newEmail },
    });

    if (checkEmail) {
      return res.status(409).json({ message: "Email is Already used!" });
    }

    await users_data.update(
      { user_Email: newEmail },
      { where: { ID: findUserEmail.ID } }
    );

    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//CHANGE PASSWORD
const change_password = async (req, res) => {
  const { ID, currentPassword, newPassword } = req.body;
  try {
    const findUserId = await users_data.findOne({ where: { ID: ID } });

    const isPasswordCorrect = bcryptjs.compareSync(
      currentPassword,
      findUserId.user_password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Wrong Password!" });
    }

    const salt = await bcryptjs.genSaltSync(10);
    const hashedPw = await bcryptjs.hashSync(newPassword, salt);

    await users_data.update(
      { user_password: hashedPw },
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

const generateToken = (id, username, email, contactNum, fullName) => {
  return jwt.sign(
    { id, username, email, contactNum, fullName },
    process.env.JWT_SECRET,
    {
      expiresIn: "8hr",
    }
  );
};

module.exports = {
  create_user,
  login_user,
  logout_user,
  get_user_info,
  verify_user,
  forgot_password_generate,
  forgot_password_change,
  change_email,
  change_password,
};
