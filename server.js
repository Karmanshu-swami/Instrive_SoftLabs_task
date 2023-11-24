// Calling all the libraries
const express = require('express');
const connectDB = require("./database/dbConnection");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

// Defining the main app function
const app = express();
app.use(express.json());

// Calling the database function
connectDB();

// Calling all the middlewares
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defining the port
const port = 5000;

// Starting the server
app.listen(port, () => {
    console.log("Node app started on ", port);
});
