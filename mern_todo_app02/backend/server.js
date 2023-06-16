const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");

const taskRoutes = require("./routes/task_routes");

const LocalPort = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/todo", taskRoutes);

db.sequelize.sync().then(() => {
  app.listen(LocalPort, () => {
    console.log(`Server is running on Port: ${LocalPort}`);
  });
});
