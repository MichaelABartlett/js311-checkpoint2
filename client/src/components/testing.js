import '../App.css';
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function Testing() {

const [state, setState] = useState({
  recipe_name: "",
  servings: ""
})

const recipeNames = () => {
  Axios.get("/recipe/allNames")
  .then(res => {
    console.log(res)
  }) 
  .catch(error => {
    console.log(error)
  })
  }


const submit = (e) => {
  e.preventDefault();
  console.log('this is state: ', state)
  Axios.post("/recipe/add", state)
  .then(res => {
    console.log('res: ', res.data)
  })
  .catch(error => {
    console.log(error)
  })
}

  return (
    <div className="App">
      <div>
   
        <h1>Working things out!</h1>
        <button onClick={recipeNames}>Get Recipe Name List</button>
      </div>
      <div>
        <h1>Adding a New Recipe</h1>
        <form className='body' onSubmit={submit} id="addRecipeForm">
                <br/>
            <input type="text" name="recipe_name" placeholder='Recipe Name' className='input'
                  onChange={(e) => setState({...state, recipe_name: e.target.value})}></input>
                <br/>
            <input type="text" name="servings" placeholder='Numbers of servings' className='input' 
                  onChange={(e) => setState({...state, servings: e.target.value})}></input>
              <button type="submit">Submit</button>
            </form>

      </div>
    </div>

  );
}

export default Testing;
