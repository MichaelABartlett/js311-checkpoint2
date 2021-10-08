
const express = require("express");

// this will hold the routes that the application will respont to
const router = express.Router();

// this controller holds the functions / callback of how to handle the request when they come in
let controller = require("./controller");


// POST   /record -body {word: "Test"}
// will add the word to our table in the database
router.post("/record", controller.addIngredient); 
// path, (the folder we are going into)controller.addWord(the function we are calling)

// below was used to check if everything was working
// before we had added the controller

//router.post("/record", function(req, res){
//    console.log("Inside the GET /record", req.body);
//    res.json("In the Post");
//})

// LIST
router.get("/list", controller.listIngredients); // 



// GET /record
// will list all of the previously recorded words
router.get("/record", controller.getIngredients);// path, (the folder we are going into)controller.getWords(the function we are calling)

// below was used to check to make sure everything was working
// before we had added the controller

//router.get("/record", function(req, res){
//    console.log("inside the GET /record");
//    res.json("In the GET");
//})


router.delete('/:ingredient', controller.deleteIngredientByIngredient)

// select ingredient and then change instructions
router.put("/put", controller.putIngredients)

module.exports = router;