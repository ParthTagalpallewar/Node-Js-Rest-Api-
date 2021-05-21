const express = require('express');
const app = express();
const port = 3000;

// parse requests of content-type: application/json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./api/routes/customer.routes.js")(app);


// set port, listen for requests
app.listen( port, () => {
  console.log("Server is running on port 300.");
});