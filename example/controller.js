
const db = require('./db');

let mysql = require("mysql");

// to get the password hash, since out database does not store the password directly
const bcrypt = require("bcrypt");

require("dotenv").config(); // it does not need to be a variable

// getting the jwt library
const jwt = require("jsonwebtoken");

// start of login and create user *************************************************************


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
let login = function(req, res) {
    // app.post("/login", controller.login);
        // note that we do not print the body, since we do not want to leak the password in our logs
        console.log("inside Login");
        console.log("POST /login", req.body);
        
        // read the username and password from the post body
        let username = req.body.username;
        let password = req.body.password;
        console.log("username: ", username);
    
        // select the username, role and stored hash from the db for the user passed in
        db.query("select username, password_hash, role from users where username = ?", [username], (err, rows) => {
    
            // assume the password provided in the request is bad
            let goodPassword = false;
            let role;
    
            // if the database failed then log as error
            if(err){
                console.error("Error when query the db", err);
            }
            // if the database returned too many rows then log an error
            if(rows.length > 1){
                console.error("Found too many rows with the username ", username);
            }
            // if the database returned no rows, then log it, but its not an error
            // maybe the username never signed up with our application
            if(rows.length == 0) {
                console.log("Did not find a row with the username ", username);
            }
            // if query ran without an error, and only 1 row came back,
            // then check the stored hash against the password provided in the request
            if(!err && rows.length == 1) {
                row = rows[0];
    
                // get the stored hash from the database
                let hash = row.password_hash;
    
                // get the role from the database
                role = row.role;
    
                // check that the hash is the database matches the password provided
                goodPassword = bcrypt.compareSync(password, hash);
            }
    
            // if the password provided is good then return
            // a signed copy of the access token
            if(goodPassword){
                // the token should include things that you are sending back to the client
                // which include the username and role
                // not a good idea to send the password or the hash of the password back
                const unsignedToken = {
                    username: username,
                    role: role
                };
                // sign the token using the JWT secret
                const accessToken = jwt.sign(unsignedToken, process.env.jwtSecret);
    
                // send the signed token back
                res.json(accessToken);
            } else {
                // if the password provided was not good, or was not able to be verified
                // send an unathorized message and code back
                res.status(401).send("Unauthorized:");
            }
        });
    }
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
    let createUser = function(req,res){
    //app.post("/createUser", [checkJwt, isAdmin], (req, res) => {
        // note that we do not include the password in the console log
        //console.log("POST /createUser: ", req.body.username);
        let username = req.body.username;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;
    
        // make sure that the password and confirm password are the same
        if(password != confirmPassword){
            return res.status(400).send("Passwords do not match");
        }
    
        // generate the hash of the password that will be stored in the database
        let passwordHash = bcrypt.hashSync(password, 10); // this will get hashed 10 times
    
        let sql = "INSERT INTO users(username, password_hash, role) values (?,?,?);"
        db.query(sql, [username, passwordHash, 'user'], (err, rows) => {
    
            // if the insert query returned an error, we log the error
            // and return a failed message back
            if(err) {
                console.error("Failed to add user", err);
                res.status(500).send("Failed to add user");
            } else {
                // if the insert statement ran without an error, then the user was creaded
                res.send("User created");
            }
        })
    }
    

// end of login and create user ***************************************************************

// beginning of recipes  ***************************************************************************

// POST/recipe/add

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "recipe_name": "name of recipe to be added",
     * "image": "URL of image to be added",
     * "servings": "number of servings in the recipe"
     * }
     */

let addRecipe = function(req, res){
    console.log("Inside addRecipe");

    // Each corresponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body
    let recipe_name = req.body.recipe_name;
    let image = req.body.image;
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
      } else if (!image){
            image = " "
      } else 
        console.log("made it thru the if statement")
       
    // console.log("made it past if statment")

    // MySQL statement is below. The "?" are placeholders where the variables will be added
    // The items in the () below must be in order, that is how they will be inserted
    let sql = "INSERT INTO recipe (recipe_name, image, servings) values ( ? , ? , ? )"

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(recipe_name);
    params.push(image);
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


// LIST 
// GET/recipe/list
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


// ****************************************************************

// GET/recipe/allNames
let getRecipes = function(req, res){
    console.log("GET getRecipes()");

    // this is a SQL statement to put all recipe colum in a array
    let sql = "SELECT recipe_name FROM recipe;"; 

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
                    return row.recipe_name;
                })
            res.json(recipeArray);
            
        }
    })
}

// ******************************************************************************************


// delete/recipe

// Below is the layout of the object that will be getting deleted
    /**
     * { 
     * "recipe_name": "name of recipe to be deleted",
     * }
     */

let deleteRecipeByRecipe = (req, res) => {

    // this is the request from the client
    let deleteItem = req.body.recipe_name; 

    // the request 'now deleteItem' will be inserted into the sql statement below
    let sql = "delete from recipe where recipe_name = (?)"
   
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

// end of recipes ******************************************************************************************

// beginning of ingredients  ***************************************************************************

// POST/ingredient/add

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "ingredient": "name of ingredient to be added",
     * "prep_time": "git the amount of time needed to prep the ingredient",
     * "instruction": "give the instuctions on how to prep the ingredient"
     * }
     */

let addIngredient = function(req, res){
    console.log("Inside addIngredient");

    // Each corresponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body
    let ingredient = req.body.ingredient;
    let prep_time = req.body.prep_time;
    let instruction = req.body.instruction;

    console.log("right before if statement")
    // checking if the client added all fields
    // inserting a response if client does not enter a field
    if(!ingredient){
        // console.log("looking at missing ingredient")
        res.status(400).send('ingredient is required')
        return
      } else if (!prep_time){
        // console.log("looking at missing preptime")
        res.status(400).send('prep_time is required')
          return
      } else if(!instruction){
        // console.log("looking at missing instruction")
        res.status(400).send('instruction is required')
          return
      } else 
        console.log("made it thru the if statement")
       
    // console.log("made it past if statment")

    // MySQL statement is below. The "?" are placeholders where the variables will be added
    // The items in the () below must be in order, that is how they will be inserted
    let sql = "INSERT INTO ingredients (ingredient, prep_time, instruction) values ( ? , ? , ? )"

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(ingredient);
    params.push(prep_time);
    params.push(instruction);

    // the params list will be inserted into the sql statement and ran.
    // if not a error will git thrown
    db.query(sql, params,function(error, rows){
        if(error){
            console.log("Failed to add to database", error);
            res.sendStatus(500); // if something went wrong
        } else {
            res.status(201).send("Ingredient added to database"); // letting client know everything went good
        }
    })
}

// ****************************************************************


// LIST 
// GET/ingredient/list
let listIngredients = function(req, res){
    console.log("LIST listIngredients()");

    // nothing is added into this sql statement because we are just returning the entire ingredients table
    let sql = "SELECT * FROM ingredients;"; 

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            // returning all the rows in the ingredients table
            res.json(rows);
            }
        })
}


// ****************************************************************

// GET/ingredient/allNames
let getIngredients = function(req, res){
    console.log("GET getIngredients()");

    // this is a SQL statement to put all ingredient colum in a array
    let sql = "SELECT ingredient FROM ingredients;"; 

    db.query(sql, function(error, rows){
        if(error){
            res.sendStatus(500);
        } else {
            console.log("rows: ", rows)
            // now that we have no error we can start processing the result
            // before this step we are listing all the rows in the table
            // the map higher order function is taking out the item in the incredient column and pushing it into the ingredientArray
            let ingredientArray =
                rows.map(function(row){
                    return row.ingredient;
                })
            res.json(ingredientArray);
            
        }
    })
}

// ******************************************************************************************


// delete/ingredient/:id

// Below is the layout of the object that will be getting deleted
    /**
     * { 
     * "ingredient": "name of ingredient to be deleted",
     * }
     */

let deleteIngredientByIngredient = (req, res) => {

    // this is the request from the client
    let deleteItem = req.param.id; 

    // the request 'now deleteItem' will be inserted into the sql statement below
    let sql = "delete from ingredients where ingredient = (?)"
   
    console.log("ingredient to delete: ", deleteItem);
      
    db.query(sql, deleteItem, (err, results) => {
        if(err){
            console.log("the error is: ", err)
            res.status(500).send("The ingredient did not exist or check spelling"); // why is it sending this
        } else {
            res.status(200).send(`The ingredient ${deleteItem} was deleted`)
            }
        })
  }

// ********************************************************************

// PUT 
// ingredient/change

  // Below is the layout of the object that will be getting added
    /**
     * { 
     * "ingredient": "ingredient", // name of ingredient you want to coose
     * "instruction": "instructions" // the new instruction that you want for the ingredient
     * }
     */

let putIngredients = (req, res) => {
    console.log("Inside PUT");

    // Each corisponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body

    let ingredient = req.body.ingredient;
    let instruction = req.body.instruction;
    //console.log("ingredient: ", ingredient)
    //console.log("instructions: ", instruction)

    // MySQL statement is below. 
    //let sql = `update ingredients set instruction = '${instruction}'  where ingredient =  '${ingredient}' `;
    let sql = "update ingredients set instruction = ?  where ingredient =  ? "

        // Below we are pushing all the 'req.body...' from above into a list
        let params = [];
        params.push(instruction);
        params.push(ingredient);
        
    db.query(sql, params, function(error, rows){
        if(error){
            console.log("Failed to change to database", error);
            res.status(500).send("Something has went wrong, the instruction was not changed"); // if something went wrong
        } else {
            //console.log("sql: ",sql)
            //console.log("It got to the end, did anything happen?")
            res.status(201).send(`The instruction for ${ingredient} has been changed`); // letting client know everything went good
        }
    })
}

// end of ingredients ******************************************************************************************



// list all the functions that you want to export, this will allow them to be read in other files
module.exports = { addIngredient, getIngredients, deleteIngredientByIngredient, listIngredients, putIngredients, addRecipe, getRecipes, deleteRecipeByRecipe, listRecipes, putRecipe, login, createUser} 