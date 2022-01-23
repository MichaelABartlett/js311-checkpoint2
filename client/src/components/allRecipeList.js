import '../Stlyes/allRecipeList.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';





function AllRecipeList() {

  const AddNewRecipe = () => {

  }

  return (
    <main className="allRecipeList">
      <h1>Recipes</h1>
      <div className='addNewRecipe' >
        <br/>
          <input type="text" name="addNewRecipe" placeholder='Add a New Recipe' className='input' onChange={(e) => {
            AddNewRecipe(e.target.value)
             }}></input>
        <br/>
      </div>
      <div className='recipes' >
        <h1>List out recipes here</h1>
        {/* <ol>{this.state.recipe.map((recipe, index) => {
            return (
              <Recipes key={index} name={recipe.name} isLiked={false} image_url={beer.image_url} />
            )
          })}</ol>   */}
      </div>
    </main>

  );
}

export default AllRecipeList;
