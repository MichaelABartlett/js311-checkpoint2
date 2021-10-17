
const express = require("express");

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("./controller");

let auth = require("./middleware");

// getting the jwt library
const jwt = require("jsonwebtoken");

// to connect to the database
const db = require("./db");

// beginning of testing authentication ***************************************


/**
 * GET /everyone
 * 
 * Returns a message to everyone, no authentication required
 */
 router.get("/everyone", (req, res) => {
    res.json("Everyone can");
})

/**
 * 
 * Returns a success message that includes the username based on the JWT Token
 * This path is only available to authenticated users
 * 
 * GET /authOnly
 */
router.get("/authOnly", auth.checkJwt, (req, res) => {
    // return a message that show that they are logged in, and tell them the username you see
    res.json("Only the special people can, we see you as "+ req.username);
})


// end of testing authentication  ************************************

// start of login and create user ***************************************


/**
 * Generates a signed JWT token that can be used as evidence that the user is logged in
 * POST /login -d {
 *      "username": "bob",
 *      "password": "password"
 * }
 * Returns a JWT Token
 */
// login call, that passes in the username and password
// if you are using a service that manages the username and passwords
// then you would not have this avialable
router.post("/login", controller.login);


/**
 * 
 * This is for creating a new user. The JWT token is checked for appropriate role
 * 
 * POST /createUser -d {
 *      "username": "bob",
 *      "password": "somePassword",
 *      "confirmPassword": "somePassword"
 * }
 */
// create a user in the database, note that we check that the JWT token is valid,
// and that the JWT token has admin role
//  ***** to seed the first user just delete the middleware and create user, then add middleware back
// ****** this uder will need to be deleted when the program is finally deployed 
router.post("/createUser",[auth.checkJwt, auth.isAdmin] ,controller.createUser);



// end of login and create user ****************************************

// beginning of recipes ***********************************************************

// POST   
// POST/add -body {recipe_name: "name of recipe", image: "image url", servings: "enter the number of servings"}
// will add a new recipe to our recipes table in the database

// the route, (the folder we are going into)controller.addRecipe(the function we are calling)
router.post("/recipe/add", auth.checkJwt, controller.addRecipe); 


// LIST   
// GET/recipe/list   there is no body, we are just requesting the entire recipes table

// the route, (the folder we are going into)controller.listRecipes(the function we are calling)
router.get("/recipe/list", controller.listRecipes); // 



// GET 
// GET/recipe/allNames
// will list all of the recipe in the recipes table from the database

// the route, (the folder we are going into)controller.getrecipe(the function we are calling)
router.get("/recipe/allNames", controller.getRecipes);


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

// end of recipes ***************************************************

// beginning of ingredients ************************************************************8

// POST   
// POST/add -body {"ingredient": "name of ingredient", "prep_time": "time amount", "instruction": "say what to do"}
// will add a new ingredient to our ingredients table in the database

// the route, (the folder we are going into)controller.addIngredient(the function we are calling)
router.post("/ingredient/add", auth.checkJwt, controller.addIngredient); 


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