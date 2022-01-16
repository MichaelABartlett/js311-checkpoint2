
const express = require("express");

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("../controller/ingredients");


let auth = require("../middleWare/middleware");

// getting the jwt library
const jwt = require("jsonwebtoken");

// to connect to the database
const db = require("../connection/db");


// beginning of ingredients ************************************************************8

// POST   
// POST/addRecipeIncredient -body {"ingredient": "name of ingredient", "prep_time": "time amount", "instruction": "say what to do"}
// will add a new ingredient to our ingredients table in the database

// the route, (the folder we are going into)controller.addIngredient(the function we are calling)
router.post("/ingredient/addRecipeIngredient", auth.checkJwt, controller.addRecipeIngredient); 


// LIST   
// GET/ingredient/list   there is no body, we are just requesting the entire ingredients table

// the route, (the folder we are going into)controller.listIngredients(the function we are calling)
router.get("/ingredient/list", controller.listIngredients); // 



// GET 
// GET/ingredient/allNames
// will list all of the ingredient in the ingredients table from the database

// the route, (the folder we are going into)controller.getIngredients(the function we are calling)
router.get("/ingredient/allNames", controller.getIngredients);


// DELETE
// DELETE/ingredient/:id
// enter the id of the ingredient that you want deleted in the place of :id

// the route, (the folder we are going into)controller.deleteIngredientByIngredient(the function we are calling)
router.delete('/ingredient/:id', [auth.checkJwt, auth.isAdmin] , controller.deleteIngredientByIngredient)


// PUT
// PUT/put -body {"ingredient": "name of ingredient you want to change instruction on", "instruction": "give new instruction"}
// select ingredient and then change instructions on that selected ingredient

// the route, (the folder we are going into)controller.putIngredients(the function we are calling)
router.put("/ingredient/change", [auth.checkJwt, auth.isAdmin] , controller.putIngredients)

// end of ingredients ***************************************************


// we are making the entire file available to the program
module.exports = router;