// --- Express --- //
const express = require("express");
// --- Express --- //

// --- Router --- //
const router = express.Router();
// --- Router --- //

// --- Routes Requirements in Models folder --- //
const { Comments } = require("../models");
// --- Routes Requirements Models folder --- //

// --- Middleware --- //
// this validateToken is to secure the data stored in the database and also to hide it in the browser to avoid freee information of the user
const { validateToken } = require("../middleware/authMiddleware"); // <==== this is in the middleware, to encrypt the data of the user
// --- Middleware --- //

// === Get By ID === //
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(comments);
});
// === Get By ID === //

// === Create Comment === //
// validateToken is inplaced in the middle to secure the success function and also to check if the user is validated //
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username; // <--- this is the decoded username from the middleware "req-is the request in the middleware; user-is also in the middleware that is gathered in the Users routes to be encrypted; username-is the value of the user that who is logged in and what is stored in the session as accessToken; (for further understandin this go to Users routes)"
  comment.username = username; // <--- this line means in the comment table we are targeting the username column, and set the value of the req.username to the username in the databasor in the req.body
  const newComment = await Comments.create(comment); // this will get the id from the comment in the body
  res.json(newComment); // this newComment is = to comment, username and the newComment will be the id
});
// === Create Comment === //

// === Delete Comment === //
router.delete("/:commentId", validateToken, async (req, res) => {
  //params is seen in the url ex.(localhost/comment/2) 2 is the commentId
  const commentId = req.params.commentId;
  await Comments.destroy({
    where: {
      id: commentId,
    },
  });
  res.json("Deleted Successfully");
});
// === Delete Comment === //

module.exports = router;

/*
This file is connected to the middleware:
+ the req.user.username is in the middleware and in the middleware the user is in the Users route
*/
