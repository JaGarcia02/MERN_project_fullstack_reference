const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const { errorHandler } = require("./middleware/errorHandler");
const db = require("./models");
const bodyParser = require("body-parser");
const taskRoute = require("./routes/routes_task");
const userRoute = require("./routes/routes_users");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/todo", taskRoute);

app.use(errorHandler);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
