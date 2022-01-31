
import '../Stlyes/pickedRecipe.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';




function PickedRecipe() {

  const [state, setState] = useState({
    recipename:"",
    recipeId: ""
  })

  
  const [ingredients, setIngredients] = useState([])
  const [cookTime, setCookTime] = useState({
    phoneNumber: "",
    date: "",
    time: ""
  })
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

  const submit = (e) => {
    e.preventDefault();
    console.log('state: ', state.recipename)
    Axios.get(`/recipe/${state.recipename}`)
    
    .then(res => {
      //console.log('recipe_id: ' ,res.data[0].id)
      console.log('res: ', res)
      setState({...state, recipeId: res.data[0].id})
      //setRecipeInstruction({...recipeInstruction, recipe_id: res.data[0].id})
     console.log('recipe_id: ', state.recipeId )
    
  })

  .catch(error => {
      console.log(error)
  })
  Axios.get(`/recipe_ingredient/${state.recipeId}`)
  .then(res => {
    console.log('res in recipe_ingredient:' , res)
    setIngredients(res.data)
  })
  .catch(error => {
    console.log(error)
  })
}
  
const textIt = (e)=> {
  e.preventDefault();
  console.log('cookTime: ' , cookTime)
  // Axios.get("/recipe/allNames")
  // .then(res => {
  //   console.log('got thru Axios to send message', res)
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}


  return (
    <div className="pickedRecipe">
       <div className='recipes' >
        <h1>Recipes you can pick from</h1>
        <ul>{list.map(name => <li key={name.recipe_name}>{name.recipe_name}</li>)} </ul> 
        <form className='body' onSubmit={submit} id="pickRecipe">
                <br/>
            <input type="text" name="recipename" placeholder='Enter Recipe Name' className='input' autoComplete='off'
                  onChange={(e) => setState({...state, recipename: e.target.value})}></input>
                  <br/>
              <button type="submit">Submit</button>
            </form>
      </div>
      <h1>Selected Recipe</h1>
      <h2>{state.recipename}</h2>
      <section className='selectDate' >
        <br/>
        <form className='eachItem' onSubmit={textIt} id='textIt'>
        <h1>Select Phone Number</h1>
            <input type="text" name="phoneNumber" placeholder='EX:1234567894' className='input' autoComplete='off'
            onChange={(e) => setCookTime({...cookTime, phoneNumber: e.target.value})}></input>
                <br/>
          <h1>Select Cook Date</h1>
            <input type="text" name="selectDate" placeholder='Ex:12/05/2022' className='input' autoComplete='off'
            onChange={(e) => setCookTime({...cookTime, date: e.target.value})}></input>
                <br/>
          <h1>Select Cook Time</h1>
            <input type="text" name="selectTime" placeholder='Ex:12:30AM' className='input' autoComplete='off'
            onChange={(e) => setCookTime({...cookTime, time: e.target.value})}></input>
                <br/>
                <button type="submit">Submit</button>
        </form>
      </section>
      <h1>All of Recipe Information</h1>
            <h3>Ingredients</h3>
          <ul>{ingredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.ingredient}</li>)}</ul>
            <h3>Prep Time</h3>
          <ul>{ingredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.prep_time}</li>)}</ul>
            <h3>Prep Instructions</h3>
          <ul>{ingredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.prep_instruction}</li>)}</ul>
    </div>



  );
}

export default PickedRecipe;
