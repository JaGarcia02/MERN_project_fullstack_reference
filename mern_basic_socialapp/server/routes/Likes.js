// --- Express --- //
const express = require("express");
// --- Express --- //

// --- Router --- //
const router = express.Router();
// --- Router --- //

// --- Routes Requirements in Models folder --- //
const { Likes } = require("../models");
// --- Routes Requirements Models folder --- //

// --- Middleware --- //
const { validateToken } = require("../middleware/authMiddleware");
// --- Middleware --- //

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body; // <--- grabbing the PostId in the body of the page
  const UserId = req.user.id; // <--- grabbing the user id from the middleware

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false });
  }
  //   res.json("Success");
});

module.exports = router;
