import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./routes/user_routes.js";
import { errorHandler, notFound } from "./middleware/error_middleware.js";
import connection_to_database from "./config/database.js";
import mongoose from "mongoose";
import colors from "colors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// main API route
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

// middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  connection_to_database();
});

/* Important Notes for setting up the backend

1. install these dependencies
    "bcryptjs"
    "body-parser"
    "colors"
    "cookie-parser"
    "dotenv"
    "express"
    "express-async-handler"
    "jsonwebtoken"
    "mongoose"
    "nodemon"

2.   in package.json add the "type":"module"
2.1. set up the server.js, import all the installed dependencies
2.2. create the following folders (controllers, models, routes, config, middleware,utils)
2.3  setup .env file 
2.4  create middleware and error handling

3.   setup your database connction in your config folder
3.1  establish conncetion to database
3.2  setup your middleware
3.3  setup your modeles 
3.4  export your models

4.  set up your controller functionalities depending to the project
4.1 export your controller functions to import it to routes
4.2 export your routes to import it in to the server.js
4.3 import all functions from controllers and middleware form your routes
4.5 setup your jsonwebtoken and export it then import it to your controller.

5. All is set. You can now setup your forntend.

*/
