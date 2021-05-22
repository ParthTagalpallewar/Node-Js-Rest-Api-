const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;

// parse requests of content-type: application/json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to learning node js application." });
});

require("./api/routes/customer.routes.js")(app);
require("./api/routes/images.routes.js")(app,multer)

// set port, listen for requests
app.listen( port, () => {
  console.log("Server is running on port 300.");
});