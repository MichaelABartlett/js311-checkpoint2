

const db = require('../connection/db');

const cors = require('cors');
const twilio = require('twilio');


let mysql = require("mysql");

// to get the password hash, since out database does not store the password directly
const bcrypt = require("bcrypt");

require("dotenv").config(); // it does not need to be a variable

// getting the jwt library
const jwt = require("jsonwebtoken");



// beginning of recipes  ***************************************************************************

// POST/recipe/add

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_name": "name of recipe to be added",
     * "servings": "number of servings in the recipe"
     * }
     */

let addRecipe = function(req, res){
    console.log("Inside addRecipe");

    // Each corresponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body
    let recipe_name = req.body.recipe_name;
    let servings = req.body.servings;

    console.log("right before if statement")
    // checking if the client added all fields
    // inserting a response if client does not enter a field
    if(!recipe_name){
        res.status(400).send('recipe_name is required')
        return
      } else if(!servings){
        res.status(400).send('serving is required')
          return
      } else 
        console.log("made it thru the if statement")
       
    // console.log("made it past if statment")

    // MySQL statement is below. The "?" are placeholders where the variables will be added
    // The items in the () below must be in order, that is how they will be inserted
    let sql = "INSERT INTO recipe (recipe_name, servings) values ( ? , ?  )"

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(recipe_name);
    params.push(servings);

    // the params list will be inserted into the sql statement and ran.
    // if not a error will git thrown
    db.query(sql, params,function(error, rows){
        if(error){
            console.log("Failed to add to database", error);
            res.sendStatus(500); // if something went wrong
        } else {
            res.status(201).send("Recipe added to database"); // letting client know everything went good
        }
    })
}

// ****************************************************************
// add recipe instructions

// POST/recipe/addRecipeInstructionStep

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_id": "id of recipe to add instruction",
     * "instruction": "instruction setp to be added",
     * }
     */

     let addRecipeInstructionStep = function(req, res){
        console.log("Inside addRecipeInstructionStep");
    
        // Each corresponding variable is saving the value of the request body that was entered into the odject
        // This will be added into Postman as a json body
        let recipe_id = req.body.recipe_id;
        let instruction = req.body.instruction;
    
        console.log("right before if statement")
        // checking if the client added all fields
        // inserting a response if client does not enter a field
        if(!recipe_id){
            res.status(400).send('recipe_name is required')
            return
          } else if(!instruction){
            res.status(400).send('instruction is required')
              return
          } else 
            console.log("made it thru the if statement")
           
        // console.log("made it past if statment")
    
        // MySQL statement is below. The "?" are placeholders where the variables will be added
        // The items in the () below must be in order, that is how they will be inserted
        let sql = "INSERT INTO recipe_instruction (recipe_id, instruction) values ( ? , ? )"
    
        // Below we are pushing all the 'req.body...' from above into a list
        let params = [];
        params.push(recipe_id);
        params.push(instruction);
    
        // the params list will be inserted into the sql statement and ran.
        // if not a error will git thrown
        db.query(sql, params,function(error, rows){
            if(error){
                console.log("Failed to add to database", error);
                res.sendStatus(500); // if something went wrong
            } else {
                res.status(201).send("Recipe instruction added to database"); // letting client know everything went good
            }
        })
    }
    

// ****************************************************************

// add recipe ingredients
// this is doen in the recipe_ingredient folder with the addRecipeIngredient function

// ****************************************************************


// LIST 
// GET/recipe/list
// this is losting all the recipe table
let listRecipes = function(req, res){
    console.log("LIST listRecipes()");

    // nothing is added into this sql statement because we are just returning the entire recipes table
    let sql = "SELECT * FROM recipe;"; 

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            // returning all the rows in the recipes table
            res.json(rows);
            }
        })
}


// ***************************************************************

// GET/recipe/allNames
// displays all the recipe names in racipe table
let getRecipes = function(req, res){
    console.log("GET getRecipes()");

    // this is a SQL statement to put all recipe colum in a array
    let sql = "SELECT recipe_name, id FROM recipe;"; 

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            // now that we have no error we can start processing the result
            // before this step we are listing all the rows in the table
            // the map higher order function is taking out the item in the incredient column and pushing it into the ingredientArray
            let recipeArray =
                rows.map(function(row){
                    return row;
                })
            res.json(recipeArray);
            
        }
    })
}

// ****************************************************************

// this will list the id of a recipe
// LIST 
// GET/recipe/:recipe_name


let listRecipeId = function(req, res){
    console.log("LIST listRecipeId()");
    
    let recipe_name = req.params.recipe_name;


    let sql = "SELECT id FROM recipe WHERE recipe_name = (?);"; 

    

    db.query(sql, recipe_name, function(error, row){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", row)
            // returning all the rows in the recipes table
            res.json(row);
            }
        })
}





// ******************************************************************************************


// delete/recipe/:id

// Below is the layout of the object that will be getting deleted
    /**
     * { 
     * "recipe_name": "name of recipe to be deleted",
     * }
     */

let deleteRecipeByRecipe = (req, res) => {

    // this is the request from the client
    let deleteItem = req.params.id; 

    // the request 'now deleteItem' will be inserted into the sql statement below
    let sql = "delete from recipe where id = ?"
   
    console.log("recipe to delete: ", deleteItem);
      
    db.query(sql, deleteItem, (err, results) => {
        if(err){
            console.log("the error is: ", err)
            res.status(500).send("The recipe did not exist or check spelling"); 
        } else {
            res.status(200).send(`The recipe ${deleteItem} was deleted`)
            }
        })
  }

// ********************************************************************

// PUT 
// recipe/change

  // Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_name": "recipe name", // name of ingredient you want to coose
     * "servings": "number of servings" // the new instruction that you want for the ingredient
     * }
     */

let putRecipe = (req, res) => {
    console.log("Inside putRecipe");

    // Each corisponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body

    let recipe_name = req.body.recipe_name;
    let servings = req.body.servings;
    //console.log("recipe_name: ", recipe_name)
    //console.log("servings: ", servings)

    // MySQL statement is below. 
    let sql = "update recipe set servings = (?)  where recipe_name =  (?)"

//

        // Below we are pushing all the 'req.body...' from above into a list
        let params = [];
        params.push(servings);
        params.push(recipe_name);
        
//
    db.query(sql,params, function(error, rows){
        if(error){
            console.log("Failed to change to database", error);
            res.status(500).send("Something has went wrong, the serving was not changed"); // if something went wrong
        } else {
            res.status(201).send(`The serving for ${recipe_name} has been changed`); // letting client know everything went good
        }
    })
}

//***************************************************************************************************************** */
// send a text message

// Sending a text
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// let sendText = (req,res) => {
//     console.log('inside sendText in backend')
//     // GET variables, passed via query string

//     //const { phoneNumber, textmessage} = req.query
//     const phoneNumber = req.query.phoneNumber
//     const textmessage = req.query.textmessage


//     client.message.create({
//         body: textmessage,
//         to: phoneNumber,
//         from: '+17754069709' // phone number from Twilio
//     }).then((message) => console.log(message.body))
// }


// end of recipes ******************************************************************************************



// list all the functions that you want to export, this will allow them to be read in other files
module.exports = { addRecipe, addRecipeInstructionStep , getRecipes, deleteRecipeByRecipe, listRecipes, putRecipe, listRecipeId} 