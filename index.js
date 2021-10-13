

const express = require("express");

let env = require("dotenv").config(); // it does not need to be a variable

let app = express();

// enable the application to be able to parse JSON bodies in post/put
app.use(express.json());

require("./example/db");

// selecting the port to use
let port = process.env.PORT;

// connect to static content
app.use(express.static("./public")); // this is not in use yet

let exampleRoute = require("./example/route");
app.use(exampleRoute);

// tesing Heroku *******************************************************

app.get("/", function(req, res){
    //res.send("Hello Heroku App this is new to me, The code is: "+ process.env.SuperSecretCode)
    let thing = 'I think this means we are working';
    res.send(thing);
})



// this is not in use anymore
//const port = process.env.PORT || 4001; // setting the port we are using

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`); // console log what port we are using
})


