
const express = require("express");
let app = express();

let path=require('path');

// enable the application to be able to parse JSON bodies in post/put
app.use(express.json());

let env = require("dotenv").config(); // it does not need to be a variable

require("./connection/db");

const bodyParser = require('body-parser')

const cors = require('cors')

// selecting the port to use
let port = process.env.PORT || 5000;

// connect to static content
app.use(express.static("./public"));

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

let exampleRoute = require("./routes/user");
app.use(exampleRoute);

let recipeRoute = require("./routes/recipe");
app.use(recipeRoute);

let recipeIngredientRoute = require("./routes/recipe_ingredient");
app.use(recipeIngredientRoute);

let ingredientsRoute = require("./routes/ingredients");
app.use(ingredientsRoute);

app.use(express.static(path.join(__dirname, "/client/build")));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
//  });
 

// this is not in use anymore
//const port = process.env.PORT || 4001; // setting the port we are using

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`); // console log what port we are using
})



