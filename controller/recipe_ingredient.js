const db = require('../connection/db');

let mysql = require("mysql");

// to get the password hash, since out database does not store the password directly
const bcrypt = require("bcrypt");

require("dotenv").config(); // it does not need to be a variable

// getting the jwt library
const jwt = require("jsonwebtoken");


// POST/recipe_ingredient/add

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_id": "id of recipe to be added",
     * "ingredient": "ingredient to be added",
     * "prep_time": "how long to prep ingredient",
     * "prep_instruction": "instruction on how to prep item"
     * }
     */

let addRecipeIngredient = function(req, res){
    console.log("Inside addRecipeIngredient");

    // Each corresponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body
    let recipe_id = req.body.recipe_id;
    let ingredient = req.body.ingredient;
    let prep_time = req.body.prep_time;
    let prep_instruction = req.body.prep_instruction;

    console.log("right before if statement")
    // checking if the client added all fields
    // inserting a response if client does not enter a field
    if(!recipe_id){
        res.status(400).send('recipe_id is required')
        return
      } else if(!ingredient){
        res.status(400).send('ingredient is required')
          return
      } else if(!prep_time){
        res.status(400).send('prep_time is required')
          return
      } else if(!prep_instruction){
        res.status(400).send('instruction is required')
          return
      } else 
        console.log("made it thru the if statement")
       

    // MySQL statement is below. The "?" are placeholders where the variables will be added
    // The items in the () below must be in order, that is how they will be inserted
    let sql = "INSERT INTO recipe_ingredient (recipe_id, ingredient, prep_time, prep_instruction) values ( ? , ? , ? , ? )"

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(recipe_id);
    params.push(ingredient);
    params.push(prep_time);
    params.push(prep_instruction);

    // the params list will be inserted into the sql statement and ran.
    // if not a error will git thrown
    db.query(sql, params,function(error, rows){
        if(error){
            console.log("Failed to add to database", error);
            res.sendStatus(500); // if something went wrong
        } else {
            res.status(201).send("Recipe_ingredient added to database"); // letting client know everything went good
        }
    })
}

// ****************************************************************

// this will list the ingredients for a single recipe
// LIST 
// PUT/recipe_ingredient/list

// Below is the layout of the object that will be getting listed
    /**
     * { 
     * "recipe_id": "recipe_id", // id of the recipe that you want to list the ingredients for
     * }
     */


let listRecipeIngredient = function(req, res){
    console.log("LIST listRecipeIngredient()");
    
    let recipe_id = req.body.recipe_id;


    let sql = "SELECT recipe_ingredient.ingredient FROM recipe_ingredient WHERE recipe = (?);"; 

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(recipe_id);

    db.query(sql, params, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            // returning all the rows in the recipes table
            res.json(rows);
            }
        })
}

// list all the functions that you want to export, this will allow them to be read in other files
module.exports = { addRecipeIngredient, listRecipeIngredient} 






// old functions
// POST/recipeIngredient/add

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_id": "id of recipe to be added",
     * "ingredient_id": "id of ingredient to be added",
     * }
     */

    //  let addRecipeIngredient = function(req, res){
    //     console.log("Inside addRecipeIngredient");
    
    //     // Each corresponding variable is saving the value of the request body that was entered into the odject
    //     // This will be added into Postman as a json body
    //     let recipe_id = req.body.recipe_id;
    //     let ingredient_id = req.body.ingredient_id;
    
    //     console.log("right before if statement")
    //     // checking if the client added all fields
    //     // inserting a response if client does not enter a field
    //     if(!recipe_id){
    //         res.status(400).send('recipe_id is required')
    //         return
    //       } else if(!ingredient_id){
    //         res.status(400).send('ingredient_id is required')
    //           return
    //       } else 
    //         console.log("made it thru the if statement")
           
    
    //     // MySQL statement is below. The "?" are placeholders where the variables will be added
    //     // The items in the () below must be in order, that is how they will be inserted
    //     let sql = "INSERT INTO recipe_ingredient (recipe_id, ingredient_id) values ( ? , ? )"
    
    //     // Below we are pushing all the 'req.body...' from above into a list
    //     let params = [];
    //     params.push(recipe_id);
    //     params.push(ingredient_id);
    
    //     // the params list will be inserted into the sql statement and ran.
    //     // if not a error will git thrown
    //     db.query(sql, params,function(error, rows){
    //         if(error){
    //             console.log("Failed to add to database", error);
    //             res.sendStatus(500); // if something went wrong
    //         } else {
    //             res.status(201).send("Recipe_ingredient added to database"); // letting client know everything went good
    //         }
    //     })
    // }



    
// // LIST 
// // GET/recipe_ingredient/list
// let listRecipeIngredient = function(req, res){
//     console.log("LIST listRecipeIngredient()");

//     // nothing is added into this sql statement because we are just returning the entire recipes table
//     let sql = "SELECT * FROM recipe_ingredient;"; 

//     db.query(sql, function(error, rows){
//         if(error){
//             res.sendStatus(500);
//         } else {
//             console.log("rows: ", rows)
//             // returning all the rows in the recipes table
//             res.json(rows);
//             }
//         })
// }
    