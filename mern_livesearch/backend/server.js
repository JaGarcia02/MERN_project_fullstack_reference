const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8001;
const db = require("./models");
const bodyParser = require("body-parser");
const personRoute = require("./routes/routes.person");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/people", personRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
