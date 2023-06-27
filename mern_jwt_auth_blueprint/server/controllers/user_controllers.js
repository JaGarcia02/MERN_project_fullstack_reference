import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// @desc Auth user/ set Token
// route POST /api/users/auth
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // --- check if fields are empty --- //
  if (email == "" && password == "") {
    res.status(401);
    throw new Error("Please enter your email and password!");
  } else if (email == "") {
    res.status(401);
    throw new Error("Please enter your email!");
  } else if (password == "") {
    res.status(401);
    throw new Error("Please enter your password!");
  }

  // --- check if email is valid --- //
  if (!user) {
    res.status(401);
    throw new Error("Email not found, please try again!");
  } else {
    // --- check if password is match --- //
    if (user && (await user.matchPasswords(password))) {
      generateToken(res, user._id, user.name, user.email);
      return res.status(200).json({
        message: "User is authorized",
        status: "Logged in",
        data: {
          user_id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401);
      throw new Error("Wrong password!");
    }
  }
});

// @desc Register new user
// route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body); <- to test the request body
  const { name, email, password } = req.body;

  // check if user is already existing to the database
  const user_exist = await User.findOne({ email });

  // condition if the user is existing
  if (user_exist) {
    throw new Error("User is already existing, please try again!");
  } else {
    // if user creation is success
    const req_data = await User.create({
      name,
      email,
      password,
    });
    // this will return a success message
    if (req_data) {
      /*
      
      --> This depends on your logic if you want to set the token when the user is created.
      this is like auto login. 

      The token is important, because this will be the credentials of the user before they will be logged in,
      the system will find the token before you to login, if the system didn't find the users token it will deny the the user to be logged in.


      
        - this will generate jwttoken for securing the data/credentials of the user.
        - if you want to add more data in the token you can modify the payload of the generateToken.
       un comment this if you want to generate token when the user is created --> generateToken(res, req_data._id, req_data.name, req_data.email); <-- this will sign the data to the cookies
      */
      return res.status(201).json({
        message: "User Registered",
        status: "Success",
        data: {
          user_id: req_data.id,
          name: req_data.name,
          email: req_data.email,
          // password: req_data.password, <-- do not include the password for protection
        },
      });
    } else {
      // this will return a failed message
      res.status(404);
      throw new Error("Invalid user data!");
    }
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res
    .status(200)
    .json({ message: "User has logout.", status: "Logged out" });
});

// @desc Get user profile
// route Get /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  };
  return res
    .status(200)
    .json({ message: `Welcom ${user.name}`, status: "Logged in", data: user });
});

// @desc Update user profile
// route Put /api/users/profile/:id
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  // --- check if there is an empty fields --- //
  if (req.body.name == "" && req.body.email == "" && req.body.password == "") {
    res.status(401);
    throw new Error("Input fields are empty!");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updated_user_data = await user.save();
    res.status(200).json({
      message: "Profile updated.",
      status: "Update profile success!",
      data: {
        id: updated_user_data.id,
        name: updated_user_data.name,
        email: updated_user_data.email,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
