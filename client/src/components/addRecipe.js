import React from 'react'
import '../Stlyes/addRecipe.css'
import { useEffect, useState } from 'react'

function AddRecipe(){

    const RecipeName = () => {

    }
    
    // const RecipeImage = () => {

    // }

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
            <h1>Add a new Recipe</h1>
            <article className='recipeNameImage' >
                <input type="text" name="recipeName" placeholder='Recipe Name' className='input' onChange={(e) => {
                    RecipeName(e.target.value)
                    }}></input>
                <br/>
                {/* <br/>
                <input type="text" name="recipeImage" placeholder='Recipe Image' className='input' onChange={(e) => {
                    RecipeImage(e.target.value)
                    }}></input>
                <br/> */}
            </article>
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