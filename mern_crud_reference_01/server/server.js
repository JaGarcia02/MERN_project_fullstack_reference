// ----- Express ----- //
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ----- Express ----- //

// ----- .env ----- //
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
// ----- .env ----- //

// ----- Middelware ----- //
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);
// ----- Middelware ----- //

// ----- Cors ----- //
const cors = require("cors");
app.use(cors());
// ----- Cors ----- //

// ----- Routes ----- //
const UserRoutes = require("./routes/UserRoutes");
app.use("/api/user", UserRoutes);
// ----- Routes ----- //

// ----- Moment ----- //
const moment = require("moment");
// var dataDate;
// dataDate = moment().format("M d YYYY");
// ----- Moment ----- //

// console.log(dataDate);
