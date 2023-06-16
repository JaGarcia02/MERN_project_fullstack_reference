// --- Express --- //
const express = require("express");
// --- Express --- //

// --- Router --- //
const router = express.Router();
// --- Router --- //

// --- Routes Requirements in Models folder --- //
const { Users } = require("../models");
// --- Routes Requirements Models folder --- //

// --- Bcrypt --- //
const bcrypt = require("bcrypt");
// --- Bcrypt --- //

// --- JWT --- //
const { sign } = require("jsonwebtoken");
// --- JWT --- //

const { validateToken } = require("../middleware/authMiddleware");

// --- Request --- //

// === Users === //
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Create Success!");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } }); // the value of username is stored in the (const "user")
  //==========================================================================================================//
  // if (!user) res.json({ error: "User Doesn't Exist" });

  // bcrypt.compare(password, user.password).then((match) => {
  //   if (!match) res.json({ error: "Wrong Username And Password Combination" });

  //   res.json("YOU LOGGED IN!!!");
  // });
  //==========================================================================================================//
  // Validation checking if the password matches or the username matches
  if (!user) {
    return res.json({ error: "User Dosen't Exixt" });
  }
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) {
      return res.json({
        error: "Wrong username and password, Please try again",
      });
    } else {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      return res.json({ token: accessToken, username: username, id: user.id });
    }
  });

  //   // this is the part that  username and password is being authenticated
  //   bcrypt.compare(password, user.password).then((same) => {
  //     if (!same) {
  //       // if the username and password didn't match
  //       return res.json({ erorr: "Wrong username or password" });
  //     }
  //     const accessToken = sign(
  //       // sign is = (jsonwebtoken) in the required = "this will allow any data will be converted in to a token"
  //       // if the username and password is validated correctly, this will be turned in the a encrypted token
  //       { username: user.username, id: user.id },
  //       "importantsecret"
  //     );
  //     return res.json({ token: accessToken, username: username, id: user.id }); // <---- this is the final product of the username and password, and this value will be transfred in to the middleware
  //     //res.json({ token is accessToken, where the username is = to the username and id is = to the user in the database and getting only the id thats why its user.id })
  //     // for further understanding go to the middleware folder
  //   });
  // } else {
  //   return res.json({ error: "User does not exist" });
  // }
  // should always use the 'return' to avoid errors
});
// === Users === //

// Cheking the Fake Tokens //
router.get("/authCheker", validateToken, (req, res) => {
  res.json(req.user); // this will again if the token is authenticated
});
// Cheking the Fake Tokens //

// Get User by ID //
router.get("/basicInfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    // this will exclude the password in the basicInfo when the response is triggered
    // the passwod is not encrypted or not in the accessToken token
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});
// Get User by ID //

// Update Password //
router.put("/change-password", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } }); // will search if there is an existing user or destinct user from the database

  // comparing the password in bcrypt
  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Password didn't match! Please try again." });
    }
    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("Password Change Success!");
    });
  });
});
// Update Password //

// --- Request --- //

// Exports //
module.exports = router;
// Exports //

/*

Any user data will be turned in to a token:
+ this file is connected to middleware file.

 */
