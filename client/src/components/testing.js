import '../App.css';
import React, { useState, useEffect} from "react";
import Axios from 'axios';
// import { addRecipe } from '../../controller/recipes';



function Testing() {

const {recipeName, setRecipeName} = useState('')
const {image, setImage} = useState('')
const {servings, setServings} = useState('')

const recipeNames = () => {

}

const addRecipe = (req, res) => {
  Axios.post("/recipe/add", {
    recipe_name: recipeName,
    image: image,
    servings: servings
  }).then(() => {
    alert("Successful insert!!!!!!!!!!!!!!!!!!!!!!!!!")
  })
}

  return (
    <div className="App">
      <div>
   
        <h1>Working things out</h1>
        <button onClick={recipeNames}>Get Recipe Name List</button>
      </div>
      <div>
        <h1>Adding a New Recipe</h1>
        <label>recipeName</label>
        <input type="text" name="recipeName" onChange={(e) => {
          setRecipeName(e.target.value)
        }}></input>
        <label>image</label>
        <input type="text" name="image" onChange={(e) => {
          setImage(e.target.value)
        }}></input>
        <label>servings</label>
        <input type="text" name="servings" onChange={(e) => {
          setServings(e.target.value)
        }}></input>
        <button onClick={addRecipe}>Add the new Recipe</button>
      </div>
    </div>

  );
}

export default Testing;
