
const db = require('./db');

let mysql = require("mysql");

// POST/record

// Below is the layout of the object that will be getting added
    /**
     * { 
     * "ingredient": "name of ingredient to be added",
     * "preptime": "git the amount of time needed to prep the ingredient",
     * "instruction": "give the instuctions on how to prep the ingredient"
     * }
     */

let addIngredient = function(req, res){
    console.log("Inside addIngredient");

    // Each corresponding variable is saving the value of the request body that was entered into the odject
    // This will be added into Postman as a json body
    let ingredient = req.body.ingredient;
    let preptime = req.body.preptime;
    let instruction = req.body.instruction;

    console.log("right before if statement")
    // checking if the client added all fields
    // inserting a response if client does not enter a field
    if(!ingredient){
        // console.log("looking at missing ingredient")
        res.status(400).send('ingredient is required')
        return
      } else if (!preptime){
        // console.log("looking at missing preptime")
        res.status(400).send('preptime is required')
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
    let sql = "INSERT INTO ingredients (ingredient, preptime, instruction) values ( ? , ? , ? )"

    // Below we are pushing all the 'req.body...' from above into a list
    let params = [];
    params.push(ingredient);
    params.push(preptime);
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


// LIST /list
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

// GET/record
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


// delete/:ingredient

let deleteIngredientByIngredient = (req, res) => {

    // this is the request from the client
    deleteItem = req.params.ingredient; 

    // the request 'now deleteItem' will be inserted into the sql statement below
    let sql = `delete from ingredients where ingredient = '${deleteItem}' ;` 
   
    console.log("ingredient to delete: ", deleteItem);
      
    db.query(sql, (err, results) => {
        if(err){
            console.log("the error is: ", err)
            res.status(500).send("The ingredient did not exist or check spelling"); // why is it sending this
        } else {
            res.status(200).send(`The ingredient ${deleteItem} was deleted`)
            }
        })
  }

// ********************************************************************

// PUT /put

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
    let sql = `update ingredients set instruction = '${instruction}'  where ingredient =  '${ingredient}' `;

    db.query(sql, function(error, rows){
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


// list all the functions that you want to export, this will allow them to be read in other files
module.exports = { addIngredient, getIngredients, deleteIngredientByIngredient, listIngredients, putIngredients } 