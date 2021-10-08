
const express = require("express");

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("./controller");


// POST   
// POST/record -body {ingredient: "name of ingredient", preptime: "time amount", instruction: "say what to do"}
// will add a new ingredient to our ingredients table in the database

// the route, (the folder we are going into)controller.addIngredient(the function we are calling)
router.post("/record", controller.addIngredient); 


// LIST   
// LIST/list   there is no body, we are just requesting the entire ingredients table

// the route, (the folder we are going into)controller.listIngredients(the function we are calling)
router.get("/list", controller.listIngredients); // 



// GET 
// GET/record 
// will list all of the ingredient in the ingredients table from the database

// the route, (the folder we are going into)controller.getIngredients(the function we are calling)
router.get("/record", controller.getIngredients);


// DELETE
// DELETE/:ingredient
// will delete the ingredient that is entered in the place of ":ingredient"

// the route, (the folder we are going into)controller.deleteIngredientByIngredient(the function we are calling)
router.delete('/:ingredient', controller.deleteIngredientByIngredient)


// PUT
// PUT/put -body {ingredient: "name of ingredient you want to change instruction on", instruction: "give new instruction"}
// select ingredient and then change instructions on that selected ingredient

// the route, (the folder we are going into)controller.putIngredients(the function we are calling)
router.put("/put", controller.putIngredients)


// we are making the entire file available to the program
module.exports = router;