import React from 'react'
import '../Stlyes/addRecipe.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function AddRecipe(){

    
const [state, setState] = useState({
    recipe_name: "",
    servings: ""
  })





  const submit = (e) => {
    e.preventDefault();
    console.log('this is state: ', state)
    Axios.post("/recipe/add", state)
    .then(res => {
      console.log('res: ', res)
      console.log('state.recipe_name: ', state.recipe_name)
    })
    .catch(error => {
      console.log(error)
    })
    Axios.get(`/recipe/${state.recipe_name}`)
    .then(res => {
        console.log(res.data)
    })
    .catch(error => {
        console.log(error)
    })
  }
  

    const IngredientName = () => {

    }

    const PrepInstruction = () => {

    }

    const PrepTime = () => {
        
    }

    const RecipeInstruction = () => {

    }

    return(
        <main className='addRecipe'>
           <h1>Adding a New Recipe</h1>
            <form className='body' onSubmit={submit} id="addRecipeForm">
                <br/>
                <input type="text" name="recipe_name" placeholder='Recipe Name' className='input'
                    onChange={(e) => setState({...state, recipe_name: e.target.value})}></input>
                    <br/>
                <input type="text" name="servings" placeholder='Numbers of servings' className='input' 
                    onChange={(e) => setState({...state, servings: e.target.value})}></input>
                    <br/>
                <button type="submit">Submit</button>
            </form>
            <h1>Recipe Ingredients</h1>
                <div className='ingredientName' >
                    <input type="text" name="ingredientName" placeholder='Ingredient Name' className='input' onChange={(e) => {
                        IngredientName(e.target.value)
                        }}></input>
                        <br/>
                        <br/>
                    <input type="text" name="prepInstruction" placeholder='Preperation instruction if needed' className='input' onChange={(e) => {
                        PrepInstruction(e.target.value)
                        }}></input>
                        <br/>
                        <br/>
                    <input type="text" name="prepTime" placeholder='Prep Time if needed' className='input' onChange={(e) => {
                        PrepTime(e.target.value)
                        }}></input>
                        <br/>
                        <br/>
                    <input type="text" name="addAnotherIngredient" placeholder='Add Another Ingredient' className='input' onChange={(e) => {
                        PrepTime(e.target.value)
                        }}></input>
                        <br/>
                </div>
            <h1>Recipe Instructions</h1>
                <div className='instructions' >
                    <input type="text" name="recipeInstruction" placeholder='Recipe Instruction Step' className='input' onChange={(e) => {
                        RecipeInstruction(e.target.value)
                        }}></input>
                        <br/>
                        <br/>
                    <input type="text" name="addAnotherInstruction" placeholder='Add another instruction step' className='input' onChange={(e) => {
                        PrepInstruction(e.target.value)
                        }}></input>
                        <br/>
                        <br/>
                    
                </div>
        </main>
    )
}

export default AddRecipe;