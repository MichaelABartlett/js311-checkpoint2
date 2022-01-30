import React from 'react'
import '../Stlyes/addRecipe.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function AddRecipe(){

    
const [state, setState] = useState({
    recipe_name: "",
    servings: ""
  })

  const [ingredient, setIngredient] = useState({
    recipe_id: "",
    ingredient: "",
    prep_time: "",
    prep_instruction: ""
    })

    const [recipeInstruction, setRecipeInstruction] = useState({
        recipe_id: "",
        instruction: ""
    })

  const submit = async(e) => {
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
    await Axios.get(`/recipe/${state.recipe_name}`)
    .then(res => {
        //console.log('recipe_id: ' ,res.data[0].id)
        setIngredient({...ingredient, recipe_id: res.data[0].id})
        setRecipeInstruction({...recipeInstruction, recipe_id: res.data[0].id})
       // console.log('recipe_id: ', ingredient.recipe_id )
    })
    .catch(error => {
        console.log(error)
    })
  }
  

  const addIngredient = (e) => {
    e.preventDefault();
    console.log('recipe_id in ingredient: ', ingredient.recipe_id )
    Axios.post("/recipe_ingredient/add", ingredient)
    .then(res => {
        console.log('res in ingredient: ', res)
        console.log('ingredient added')
    })
    .catch(error => {
        console.log(error)
    })
    document.getElementById("addIngredient").reset();
  }


  const AddRecipeInstruction = (e) => {
      e.preventDefault();
      
    Axios.post("/recipe/addRecipeInstructionStep", recipeInstruction)
    .then(res => {
        console.log('recipe instruction added')
    })
    .catch(error => {
        console.log(error)
    })
    document.getElementById("addInstruction").reset();
  }

  //****************** */
    const PrepInstruction = () => {

    }

    const RecipeInstruction = () => {

    }

    return(
        <main className='addRecipe'>
           <h1>Adding a New Recipe</h1>
            <form className='body' onSubmit={submit} id="addRecipeForm">
                <input type="text" name="recipe_name" placeholder='Recipe Name' className='input'
                    onChange={(e) => setState({...state, recipe_name: e.target.value})}></input>
                    <br/>
                <input type="text" name="servings" placeholder='Numbers of servings' className='input' 
                    onChange={(e) => setState({...state, servings: e.target.value})}></input>
                    <br/>
                <button type="submit">Submit</button>
            </form>
            <h1>Recipe Ingredients</h1>
                <form className='body' onSubmit={addIngredient} id='addIngredient'>
                    <input type="text" name="ingredient" placeholder='Ingredient Name' className='input'
                     onChange={(e) => setIngredient({...ingredient, ingredient: e.target.value})}></input>
                        <br/>
                    <input type="text" name="prep_time" placeholder='Preperation time if needed' className='input' 
                    onChange={(e) => setIngredient({...ingredient, prep_time: e.target.value})}></input>
                        <br/>
                    <input type="text" name="prep_instruction" placeholder='Prep instruction if needed' className='input' 
                    onChange={(e) => setIngredient({...ingredient, prep_instruction: e.target.value})}></input>
                        <br/>
                        <p>Only one ingredient can be added at a time</p>
                    <button type='submit'>Submit</button>
                </form>
            <h1>Recipe Instructions</h1>
                <form className='body' onSubmit={AddRecipeInstruction} id='addInstruction' >
                    <input type="text" name="recipeInstruction" placeholder='Recipe Instruction Step' className='input' 
                    onChange={(e) => setRecipeInstruction({...recipeInstruction, instruction: e.target.value})}></input>
                        <br/>
                        <p>Only one instruction step can be added at a time</p>
                    <button type='submit'>Submit</button>
                    
                </form>
        </main>
    )
}

export default AddRecipe;