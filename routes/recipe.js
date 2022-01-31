const express = require("express");

const cors = require('cors');
const twilio = require('twilio');

require("dotenv").config(); // it does not need to be a variable

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("../controller/recipes");

let auth = require("../middleWare/middleware");

// getting the jwt library
const jwt = require("jsonwebtoken");

// to connect to the database
const db = require("../connection/db");

// beginning of recipes ***********************************************************

// add new recipe
// POST   
// POST/add -body {recipe_name: "name of recipe", 
                    //image: "image url",
                    // servings: "enter the number of servings",
// will add a new recipe to our recipes table in the database

// the route, (the folder we are going into)controller.addRecipe(the function we are calling)
//router.post("/recipe/add", auth.checkJwt, controller.addRecipe); 
router.post("/recipe/add", controller.addRecipe); 


// add instruction step to recipe
// POST   
// POST/recipe/addRecipeInstuctionStep -body {recipe_id: "id of recipe", 
                                        //instruction: "instruction step",
// will add a new recipe to our recipes table in the database

// the route, (the folder we are going into)controller.addRecipe(the function we are calling)
//router.post("/recipe/addRecipeInstructionStep", auth.checkJwt, controller.addRecipeInstructionStep); 
router.post("/recipe/addRecipeInstructionStep", controller.addRecipeInstructionStep); 


// LIST   
// GET/recipe/list   there is no body, we are just requesting the entire recipes table

// the route, (the folder we are going into)controller.listRecipes(the function we are calling)
router.get("/recipe/list", controller.listRecipes); 



// GET 
// GET/recipe/allNames
// will list all of the recipe in the recipes table from the database

// the route, (the folder we are going into)controller.getrecipe(the function we are calling)
router.get("/recipe/allNames", controller.getRecipes);

// GET
// GET/recipe_id
// will get the id of the recipe

// the route, (the folder we are going into)controller.listReipeId(the function we are calling)
router.get("/recipe/:recipe_name", controller.listRecipeId) 



// DELETE
// DELETE/recipe/:id
// enter the id of the recipe that you want deleted in the place of the :id

// the route, (the folder we are going into)controller.deleteRecipeByRecipe(the function we are calling)
router.delete('/recipe/:id', [auth.checkJwt, auth.isAdmin] , controller.deleteRecipeByRecipe)


// PUT
// PUT/put -body {"recipe_name": "name of recipe you want to change servings on", "servings": "number of servings"}
// select recipe and then change serving amount on that selected recipe

// the route, (the folder we are going into)controller.putRecipe(the function we are calling)
router.put("/recipe/change", [auth.checkJwt, auth.isAdmin] , controller.putRecipe)


// Sending a text

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);



// GET
// 
router.get("/recipe/sendText", controller.sendText)


// end of recipes ***************************************************

// we are making the entire file available to the program
module.exports = router;