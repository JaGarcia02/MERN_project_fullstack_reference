// --- Express --- //
const express = require("express");
// --- Express --- //

// --- Router --- //
const router = express.Router();
// --- Router --- //

// --- Routes Requirements in Models folder --- //
const { Posts, Likes } = require("../models");
// --- Routes Requirements Models folder --- //

// --- Request --- //

// === Get === //
const { validateToken } = require("../middleware/authMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPost = await Posts.findAll({ include: [Likes] }); // <------- Joining the Post table and Like table

  const likedPost = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPost: listOfPost, likedPost: likedPost });
});
// === Get === //

// === Post (Create Post) === //
router.post("/", validateToken, async (req, res) => {
  const post = req.body; // <- this will grab the object in the frontend, containing the postTitile and postText
  post.username = req.user.username; // <- this will add a new data called username, where the value of the username is in the value accessToken
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});
// === Post (Create Post) === //

// === Get By ID === //
router.get("/get-by-id/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});
// === Get By ID === //

// === Get Post By ID Where the user is the owner of that post === //
router.get("/get-by-user/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPost = await Posts.findAll({
    where: { UserId: id },
    include: [Likes], // this will include the Likes table, to see how many likes of this user has
  });
  res.json(listOfPost);
});
// === Get Post By ID Where the user is the owner of that post === //

// === Update === //
router.put("/update-post-title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } }); // this functtion will update the title in the database. The 1st {title: is the title column , and the 2nd title is the value of the body in the frontend}
  // the secon {} is there the function will find if what exactly we will edit, the keyword of "where" will check if the value of what you are finding will be exsisting and only spesific in the database
  res.json(newTitle);
});
router.put("/update-posts-text", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });
  res.json(newText);
});
// === Update === //

// === Delete === //
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("Post Delete Successfuly!");
});
// === Delete === //

// --- Request --- //

// Exports //
module.exports = router;
// Exports //
