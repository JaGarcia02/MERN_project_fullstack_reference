// --- Express --- //
const express = require("express");
const app = express();
app.use(express.json()); // express will abble to read json format
// --- Express --- //

// --- Cors --- //
const cors = require("cors");
app.use(cors());
// --- Cors --- //

// --- Database --- //
const db = require("./models");
db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server is running on port 3002");
  });
});
// --- Database --- //

// --- Routers --- //
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter); // <-----this will be the reference of all the routes in routes of all pages in axios when calling a function in controller folder or route folder "/posts/ '-your route name here-' "
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter); // <---- put /comments first, this is the route for all comments
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
// --- Routers --- //
