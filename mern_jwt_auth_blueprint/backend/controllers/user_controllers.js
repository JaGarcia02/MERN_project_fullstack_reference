// const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user_models");

const View = async (req, res) => {
  try {
    return res.json({ message: "View User" });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
};

const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // *if user is already taken* //
    const user_exists = await User.findOne({ email });
    if (user_exists) {
      return res.status(400).json({ message: "Email is already taken!" });
    }

    // *if fields are empty* //
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill up the fields below!" });
    } else {
      // *hash password* //
      const salt = await bcrypt.genSalt(10);
      const HashedPassword = await bcrypt.hash(password, salt);

      // *create user* //
      const user = await User.create({
        name: name,
        email: email,
        password: HashedPassword,
      });
      if (!user) {
        res.status(400).json({ message: "Invalid user data!" });
      } else {
        return res.status(200).json({
          message: "User created successfully!",
          user,
          token: GenerateToken(user.id, user.name, user.email),
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // *if fields are empty* //
    if (!email && !password) {
      return res
        .status(400)
        .json({ message: "Please fill up the fields below!" });
    }

    // *check email* //
    const user = await User.findOne({ email });

    // *success* //
    if (!user && (await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      return res.status(200).json({
        message: "User has login successfully!",
        user,
        token: GenerateToken(user.id, user.name, user.email),
      });
    }
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
};

const Update = async (req, res) => {
  try {
    return res.json({ message: "Update User" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const Remove = async (req, res) => {
  try {
    return res.json({ message: "Remove User" });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
};

const TestMe = async (req, res) => {
  // this will compare the req data to the token
  const { id, name, email } = await User.findById(req.user.id);
  try {
    // this is the out put of the payload of the token
    return res.json({
      id: id,
      name,
      email,
    });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    return res.status(500).json({ message: error.message });
  }
};

// this will generate token after a function or a state is fulfilled
const GenerateToken = (id, name, email) => {
  // token payload - you can put more data here
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = { Register, Login, Update, Remove, TestMe };

// ************ with try catch ************ //
// const View = async (req, res) => {
//   try {
//     return res.json({ message: "View User" });
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     res.status(500);
//     throw new Error(error);
//   }
// };

// const Register = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // *if user is already taken* //
//     const user_exists = await User.findOne({ email });
//     if (user_exists) {
//       return res.status(400).json({ message: "Email is already taken!" });
//     }

//     // *if fields are empty* //
//     if (!name || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please fill up the fields below!" });
//     } else {
//       // *hash password* //
//       const salt = await bcrypt.genSalt(10);
//       const HashedPassword = await bcrypt.hash(password, salt);

//       // *create user* //
//       const user = await User.create({
//         name: name,
//         email: email,
//         password: HashedPassword,
//       });
//       if (!user) {
//         res.status(400).json({ message: "Invalid user data!" });
//       } else {
//         return res.status(200).json({
//           message: "User created successfully!",
//           user,
//           token: GenerateToken(user.id, user.name, user.email),
//         });
//       }
//     }
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     res.status(500);
//     throw new Error(error);
//   }
// };

// const Login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // *if fields are empty* //
//     if (!email && !password) {
//       return res
//         .status(400)
//         .json({ message: "Please fill up the fields below!" });
//     }

//     // *check email* //
//     const user = await User.findOne({ email });

//     // *success* //
//     if (!user && (await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     } else {
//       //   return res.status(200).json({
//       //     id: user.id,
//       //     name: user.name,
//       //     email: user.email,
//       //     token: GenerateToken(user.id),
//       //     message: "User has login successfully!",
//       //   });
//       return res.status(200).json({
//         message: "User has login successfully!",
//         user,
//         token: GenerateToken(user.id, user.name, user.email),
//       });
//     }
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     res.status(500);
//     throw new Error(error);
//   }
// };

// const Update = async (req, res) => {
//   try {
//     return res.json({ message: "Update User" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const Remove = async (req, res) => {
//   try {
//     return res.json({ message: "Remove User" });
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     res.status(500);
//     throw new Error(error);
//   }
// };

// const TestMe = async (req, res) => {
//   // this will compare the req data to the token
//   const { id, name, email } = await User.findById(req.user.id);
//   try {
//     // this is the out put of the payload of the token
//     return res.json({
//       id: id,
//       name,
//       email,
//     });
//   } catch (error) {
//     // return res.status(500).json({ message: error.message });
//     res.status(500);
//     throw new Error(error);
//   }
// };

// const GenerateToken = (id) => {
//   // token payload - you can put more data here
//   return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "30d",
//   });
// };
