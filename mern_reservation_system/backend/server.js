const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const { ErrorHandler } = require("./Middleware/ErrorHandler");
const User_Route = require("./Routes/User_Route");
const Admin_Route = require("./Routes/Admin_Route");
const Room_Route = require("./Routes/Room_Routes");
const Reservation_Route = require("./Routes/Reservation_Route");
const Report_Route = require("./Routes/ReportRoute");
const path = require("path");
const http = require("http");
const server = http.createServer(app);

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/users", User_Route);
app.use("/api/admin", Admin_Route);
app.use("/api/room", Room_Route);
app.use("/api/reservation", Reservation_Route);
app.use("/api/reports", Report_Route);

app.use("/Room_Images", express.static("Room_Images"));

app.use(ErrorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

db.sequelize.sync().then(() => {
  server.listen(3001, () => {
    console.log("server is running!");
  });
});
