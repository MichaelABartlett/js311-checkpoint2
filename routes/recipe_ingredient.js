const express = require("express");

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("../controller/recipe_ingredient");

let auth = require("../middleWare/middleware");

// getting the jwt library
const jwt = require("jsonwebtoken");

// to connect to the database
const db = require("../connection/db");


// POST   
// POST/recipe_ingredient/add -body {recipe_id: "id of recipe", ingredient_id: "id of ingredient"}
// will add a new ingredient to our recipe_ingredient table in the database

router.post("/recipe_ingredient/add", auth.checkJwt, controller.addRecipeIngredient); 


// LIST   
// GET/recipe_ingredient/list   there is no body, we are just requesting the entire recipe_ingredient table

router.get("/recipe_ingredient/:id", controller.listRecipeIngredient); // 

// we are making the entire file available to the program
module.exports = router;