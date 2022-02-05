
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
    textmessage: "",
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
      console.log('recipe_id: ' ,res.data[0].id)
      console.log('res: ', res)
      setState({...state, recipeId: res.data[0].id})
      //setRecipeInstruction({...recipeInstruction, recipe_id: res.data[0].id})
     //console.log('recipe_id: ', state.recipeId )
  })
  .catch(error => {
      console.log(error)
  })
}

  const submit2 = () => {
  Axios.get(`/recipe_ingredient/${state.recipeId}`)
  .then(res => {
    console.log('res in recipe_ingredient:' , res)
    setIngredients(res.data)
  })
  .catch(error => {
    console.log(error)
  })
  }
  

const textIt = (e) => {
  e.preventDefault();
  console.log('phoneNumber:', cookTime.phoneNumber)
  console.log('textmessage:', cookTime.textmessage)
    Axios.get(`/user/sendtext?phoneNumber=${cookTime.phoneNumber}&textmessage=${cookTime.textmessage}`)
    .then(res => {
      console.log('got thru Axios to send message', res)
    })
    .catch(err => {
      console.log(err)
    })
}

  return (
    <div className="pickedRecipe">
       <div className='recipes' >
        <h1>Recipes you can pick from</h1>
        <ul className='pickList'>{list.map(name => <li key={name.recipe_name}>{name.recipe_name}</li>)} </ul> 
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
      <div className='buildList'>
          <p>Now that you have selected a recipe to cook let's build the list that will remind you to PREP the ingredients so you will be ready to cook.</p>
            
        </div>
        <button onClick={submit2}>Build you list</button>
        <h1>Recipe Information</h1>
        <section className='listing'>
          <div className='listingItem'>
            <h3 className='listTitle'>Ingredients</h3>
          <ul>{ingredients.map(listIngredients => <li key={listIngredients.ingredient}>{listIngredients.ingredient}</li>)}</ul>
          </div>
          <div className='listingCenter'>
            <h3 className='listTitle'>Prep Time</h3>
          <ul>{ingredients.map(listTime => <li key={listTime.ingredient}>{listTime.prep_time }</li>)}</ul>
          </div>
          <div className='listingItem'>
            <h3 className='listTitle'>Prep Instructions</h3>
          <ul>{ingredients.map(listInstruction => <li key={listInstruction.ingredient}>{listInstruction.prep_instruction}</li>)}</ul>
          </div>
        </section>
      <section className='selectDate' >
        <br/>
        <form className='eachItem' onSubmit={textIt} id='textIt'>
        <h1>Enter Your Phone Number</h1>
            <input type="text" name="phoneNumber" placeholder='EX:512333444' className='input' autoComplete='off'
            onChange={(e) => setCookTime({...cookTime, phoneNumber: e.target.value})}></input>
                <br/>
          <h1>Enter Your Prep Instructions</h1>
            <input type="text" name="prepInstructions" placeholder='Enter prep instructions here' className='input' autoComplete='off'
            onChange={(e) => setCookTime({...cookTime, textmessage: e.target.value})}></input>
                <br/>
                <div className='it'>
                <button className='sendText' type="submit">Send a text</button>
                </div>
        </form>
      </section>
    </div>



  );
}

export default PickedRecipe;
