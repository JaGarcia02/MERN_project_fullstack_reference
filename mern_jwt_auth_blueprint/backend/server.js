const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/user_routes");
const GoalRoutes = require("./routes/goal_routes");
const { errorHandler } = require("./middleware/ReqRes_Middleware");
const DatabaseConnection = require("./configs/database_connection");
const port = process.env.PORT || 1911;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", GoalRoutes);
app.use("/api/users", UserRoutes);

// middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`.magenta);
  DatabaseConnection();
});
