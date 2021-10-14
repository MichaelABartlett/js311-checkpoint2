


const express = require("express");
let app = express();

// enable the application to be able to parse JSON bodies in post/put
app.use(express.json());

let env = require("dotenv").config(); // it does not need to be a variable

require("./example/db");

// selecting the port to use
let port = process.env.PORT;

// connect to static content
app.use(express.static("./public"));

let exampleRoute = require("./example/route");
app.use(exampleRoute);



// this is not in use anymore
//const port = process.env.PORT || 4001; // setting the port we are using

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`); // console log what port we are using
})


