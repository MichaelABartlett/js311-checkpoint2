import '../Stlyes/pickedRecipe.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function PickedRecipe() {

  const incredients = [
    {"ingredient": "bread",
     "prep_time": "none",
     "prep_instruction": "none"},
    {"ingredient": "Jelly",
     "prep_time": "none",
     "prep_instruction": "none"},
    {"ingredient": "Peanut Butter",
     "prep_time": "none",
     "prep_instruction": "none"}
  ]

  const SelectDate = () => {

  }

  const CookTime = () => {

  }

  return (
    <div className="pickedRecipe">
      <h1>Selected Recipe</h1>
      {/* <section className='images'>
          <div>
            
              <div>
                <img src={undefined} alt="Image of recipe" height={200} width={300}/>
              </div>  
          </div>
      </section> */}
      <section className='selectDate' >
        <br/>
        <a className='eachItem' >
          <h1>Select Cook Date</h1>
            <input type="text" name="selectDate" placeholder='Ex:12/05/2022' className='input' onChange={(e) => {
                SelectDate(e.target.value)
                }}></input>
                <br/>
        </a>
        <a className='eachItem' >
          <h1>Select Cook Time</h1>
            <input type="text" name="cookTime" placeholder='Ex:12:30AM' className='input' onChange={(e) => {
                CookTime(e.target.value)
                }}></input>
        </a>
      </section>
      <h1>All of Recipe Information</h1>
            <h3>Ingredients</h3>
          <ul>{incredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.ingredient}</li>)}</ul>
            <h3>Prep Time</h3>
          <ul>{incredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.prep_time}</li>)}</ul>
            <h3>Prep Instructions</h3>
          <ul>{incredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.prep_instruction}</li>)}</ul>
    </div>



  );
}

export default PickedRecipe;
