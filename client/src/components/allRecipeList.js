import '../Stlyes/allRecipeList.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom'





function AllRecipeList() {

  const [list, setList] = useState([])

useEffect(() => {
  Axios.get("/recipe/allNames")
  .then(res => {
    console.log(res.data)
    setList(res.data)
  }) 
  .catch(error => {
    console.log(error)
  })
}, []);

  // onload a call for a list of all recipe names and added to the recipe variable

  const cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    console.log('LoggedIn cookie in allrecipelist', cookies.loggedIn)
  return (
    <main className="allRecipeList">
      <div className='recipes' >
        <h1>List of Recipes</h1>
        <ul>{list.map(name => <li key={name.recipe_name}>{name.recipe_name}</li>)} </ul> 
      </div>
      <div className='addNewRecipe' >
        <br/>
              {cookies.loggedIn ? <Link to="/addRecipe"><button type='button'>Add a recipe</button></Link> : 'If you want to look at recipe ingredients you will need to log in'}
        <br/>
      </div>
      
    </main>

  );
}

export default AllRecipeList;
