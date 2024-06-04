//Create Server
const express = require("express");
const app = express();
const rateLimiting = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");

const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
//DB Connection
const dbconnection = require("./database/dbconnection");
const notFound = require("./middlwares/errorHandling/notFound");
const errorHandler = require("./middlwares/errorHandling/errorHandler");
dbconnection;
//Middle Wares
app.use(express.json());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    limit: 100,
  })
);
app.use(hpp());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
///routes
app.use("/admin", require("./apis/adminRoutes"));
app.use("/student", require("./apis/studentRoutes"));
app.use("/prof-profAssist", require("./apis/prof-profAssist"));
//Hello message
app.get("/", (request, response) =>
  response.json({ status: "Success", message: "Hello World!" })
);
//Not found Page
app.get("*", (request, response) =>
  response.json({ status: "Error", message: "Not Found Page" })
);
//Error Handler
app.use(notFound);
app.use(errorHandler);
//Listen On Port
app.listen(process.env.PORT, () =>
  console.log(`Uni Assist app listening on port ${process.env.PORT}!`)
);
