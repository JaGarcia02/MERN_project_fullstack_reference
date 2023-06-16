const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal_models");
const User = require("../models/user_models");

// --- sending balnk data request --- //
// res.status(200).json({ message: "Create goals!" });

// ***************** with try catch ***************** //
// --- view all data --- //
const get_goals = asyncHandler(async (req, res) => {
  try {
    const view = await Goal.find({ user: req.user.id });
    return res.status(200).json(view);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// --- create data --- //
const create_goals = asyncHandler(async (req, res) => {
  try {
    // *if input field is empty* //
    if (!req.body.text) {
      return res.status(400).json({ message: "Please add a text field" });
      // throw new Error("Please add a text field");
    }

    const create = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });

    res.status(200).json(create);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// --- update data --- //
const update_goals = asyncHandler(async (req, res) => {
  const data = await Goal.findById(req.params.id);

  try {
    if (!data) {
      return res.status(400).json({ message: "Undefined ID" });
    }
    // * check for user* //
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "Undefined user" });
    }

    // Making sure the logged in user matches the goal user //
    if (data.user.toString() !== user.id) {
      return res.status(401).json({ message: "User not authorized!" });
    }
    const update = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// --- delete data --- //
const delete_goals = asyncHandler(async (req, res) => {
  const data = await Goal.findById(req.params.id);
  try {
    if (!data) {
      return res.status(400).json({ message: "Undefined ID" });
    }
    // * check for user* //
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "Undefined user" });
    }

    // Making sure the logged in user matches the goal user //
    if (data.user.toString() !== user.id) {
      return res.status(401).json({ message: "User not authorized!" });
    }

    const remove = await Goal.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Goal successfully removed", data: remove });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  get_goals,
  create_goals,
  update_goals,
  delete_goals,
};

// *** use this to test each controller *** //
// --- sending balnk data request --- //
// res.status(200).json({ message: "Create goals!" });

// ***************** with try catch ***************** //
// // --- view all data --- //
// const get_goals = asyncHandler(async (req, res) => {
//   try {
//     const view = await Goal.find({ user: req.user.id });
//     return res.status(200).json(view);
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// });

// // --- create data --- //
// const create_goals = asyncHandler(async (req, res) => {
//   try {
//     // *if input field is empty* //
//     if (!req.body.text) {
//       res.status(400);
//       throw new Error("Please add a text field");
//     }

//     const create = await Goal.create({
//       text: req.body.text,
//       user: req.user.id,
//     });
//     res.status(200).json(create);
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// });

// // --- update data --- //
// const update_goals = asyncHandler(async (req, res) => {
//   const data = await Goal.findById(req.params.id);

//   try {
//     if (!data) {
//       return res.status(400).json({ message: "Undefined ID" });
//     }
//     // * check for user* //
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(400).json({ message: "Undefined user" });
//     }

//     // Making sure the logged in user matches the goal user //
//     if (data.user.toString() !== user.id) {
//       return res.status(401).json({ message: "User not authorized!" });
//     }
//     const update = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     return res.status(200).json(update);
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// });

// // --- delete data --- //
// const delete_goals = asyncHandler(async (req, res) => {
//   const data = await Goal.findById(req.params.id);
//   try {
//     if (!data) {
//       return res.status(400).json({ message: "Undefined ID" });
//     }
//     // * check for user* //
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(400).json({ message: "Undefined user" });
//     }

//     // Making sure the logged in user matches the goal user //
//     if (data.user.toString() !== user.id) {
//       return res.status(401).json({ message: "User not authorized!" });
//     }

//     const remove = await Goal.findByIdAndDelete(req.params.id);
//     return res
//       .status(200)
//       .json({ message: "Goal successfully removed", data: remove });
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// });
