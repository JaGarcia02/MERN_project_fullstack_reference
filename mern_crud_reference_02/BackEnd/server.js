const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const { errorHandler } = require("./MiddleWare/errorMiddleWare");
const cors = require("cors");

// --------goalRoute 'Route' Folder--------//
const GoalRoutes = require("./Routes/goalRoutes"); // This directs to Route folder
// --------goalRoute 'Route' Folder--------//
// ----------Routes----------//
app.use("/api/goals", GoalRoutes);
// ----------Routes----------//

app.use(cors());

// ----------Controllers----------//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// ----------Controllers----------//

// ----------MiddleWare----------//
app.use(errorHandler);
// ----------MiddleWare----------//

app.listen(port, () => console.log(`Server started on port ${port}`));
