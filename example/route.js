
const express = require("express");

// this will hold the routes that the application will respond to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
// this gets the call to the correct file where the functions exist
let controller = require("./controller");

// beginning of recipes ************************************************************8

// POST   
// POST/add -body {recipe_name: "name of recipe", image: "image url", servings: "enter the number of servings"}
// will add a new recipe to our recipes table in the database

// the route, (the folder we are going into)controller.addRecipe(the function we are calling)
router.post("/recipe/add", controller.addRecipe); 


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
// DELETE/recipe/:recipe
// will delete the recipe that is entered in the place of ":recipe"

// the route, (the folder we are going into)controller.deleteRecipeByRecipe(the function we are calling)
router.delete('/recipe/:recipe', controller.deleteRecipeByRecipe)


// PUT
// PUT/put -body {recipe: "name of recipe you want to change servings on", recipe: "new serving amount"}
// select recipe and then change serving amount on that selected recipe

// the route, (the folder we are going into)controller.putRecipe(the function we are calling)
router.put("/recipe/change", controller.putRecipe)

// end of recipes ***************************************************

// beginning of ingredients ************************************************************8

// POST   
// POST/add -body {ingredient: "name of ingredient", preptime: "time amount", instruction: "say what to do"}
// will add a new ingredient to our ingredients table in the database

// the route, (the folder we are going into)controller.addIngredient(the function we are calling)
router.post("/ingredient/add", controller.addIngredient); 


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
// DELETE/ingredient/:ingredient
// will delete the ingredient that is entered in the place of ":ingredient"

// the route, (the folder we are going into)controller.deleteIngredientByIngredient(the function we are calling)
router.delete('/ingredient/:ingredient', controller.deleteIngredientByIngredient)


// PUT
// PUT/put -body {ingredient: "name of ingredient you want to change instruction on", instruction: "give new instruction"}
// select ingredient and then change instructions on that selected ingredient

// the route, (the folder we are going into)controller.putIngredients(the function we are calling)
router.put("/ingredient/change", controller.putIngredients)

// end of ingredients ***************************************************

// we are making the entire file available to the program
module.exports = router;