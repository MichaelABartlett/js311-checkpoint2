import '../Stlyes/createProfile.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function CreateProfile() {

  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    Email: ""
  })

  // post("/createUser"

  // const addIngredient = (e) => {
  //   e.preventDefault();
  //   console.log('recipe_id in ingredient: ', ingredient.recipe_id )
  //   Axios.post("/recipe_ingredient/add", ingredient)
  //   .then(res => {
  //       console.log('res in ingredient: ', res)
  //       console.log('ingredient added')
  //   })
  //   .catch(error => {
  //       console.log(error)
  //   })
  //   document.getElementById("addIngredient").reset();
  // }


  const UserName = (e) => {
    e.preventDefault();
    console.log('user: ', user)
    if(user.password != user.confirmPassword){
      alert("password and confirm password must match")
    }else {
      Axios.post("/createUser", user)
      .then(res => {
        console.log('res in userName: ', res)
        console.log("user added")
        alert(`${user.username} has been added as a new user`)
      })
      .catch(error => {
        console.log(error)
      })
    }

    document.getElementById("createprofile").reset();
  }
  

  return (
    <main className="createProfile">
      <h1>Create a Profile</h1>
      <br/>
      <form className='body' onSubmit={UserName} id="createprofile">
            <input type="text" name="username" placeholder='User Name' className='input' 
            onChange={(e) => setUser({...user, username: e.target.value})}></input>
              <br/>
            <input type="password" name="password" placeholder='Password' className='input' 
            onChange={(e) => setUser({...user, password: e.target.value})}></input>
              <br/>
            <input type="password" name="confirmPassword" placeholder='Confirm Password' className='input' 
            onChange={(e) => setUser({...user, confirmPassword: e.target.value})}></input>
              <br/>
            <input type="text" name="Email" placeholder='Email' className='input' 
            onChange={(e) => setUser({...user, Email: e.target.value})}></input>
              <br/>
              <button type='submit'>Submit</button>
        </form>
    </main>

  );
}

export default CreateProfile;
