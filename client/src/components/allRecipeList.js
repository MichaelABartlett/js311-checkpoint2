import '../Stlyes/allRecipeList.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'





function AllRecipeList() {

  let recipe = [
    'Apple Pie',
    'Fried Chicken',
    'Baked Potato',
    'PBJ',
    'Hot Dog'
  ]

  // onload a call for a list of all recipe names and added to the recipe variable

  const AddNewRecipe = () => {

  }

  return (
    <main className="allRecipeList">
      <h1>Recipes</h1>
      <div className='addNewRecipe' >
        <br/>
          <Link to="/addRecipe">
            <button type='button'>
              Add a new Recipe
            </button>
          </Link>
          
        <br/>
      </div>
      <div className='recipes' >
        <h1>List out recipes here</h1>
        <ul>{recipe.map(name => <li key={name}>{name}</li>)} </ul> 
      </div>
    </main>

  );
}

export default AllRecipeList;


{/* <ol>{recipe.map((recipe, index) => {
            return (
              <Recipes key={index} name={recipe.name} isLiked={false} image_url={beer.image_url} />
            )
          })}</ol>   */}