const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const router = require("./router");

// DB Setup
mongoose
  .connect(
    `mongodb+srv://bryanguner:Summer2015@cluster0.oj1ibrz.mongodb.net/auth?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

// an instance of express
const app = express();

// App Setup

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);
