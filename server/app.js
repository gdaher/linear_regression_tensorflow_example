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

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
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

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
//what is this for???
// app.get("*", function(req, res, next) {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

//for 500 errors
app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
