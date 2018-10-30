const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
var cookieParser = require("cookie-parser");

module.exports = app;

//middleware

//logger middleware
app.use(morgan("dev"));

//static middleware
app.use(express.static(path.join(__dirname, "../public")));

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for 400 errors
app.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

//for 500 errors
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
