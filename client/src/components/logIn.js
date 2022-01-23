import '../Stlyes/login.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function LogIn() {

    const UserName = () => {

    }

    const Password = () => {

    }

  return (
    <main className="logIn">
        <h1>Login</h1>
            <body className='body'>
                <br/>
            <input type="text" name="userName" placeholder='User Name' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
                <br/>
            <input type="text" name="password" placeholder='Password' className='input' onChange={(e) => {
                Password(e.target.value)
                }}></input>
            </body>

    </main>

  );
}

export default LogIn;

/* <div>
        <h1>Adding a New Recipe</h1>
        <label>recipeName</label>
        <input type="text" name="recipeName" onChange={(e) => {
          setRecipeName(e.target.value)
        }}></input>
        <label>image</label>
        <input type="text" name="image" onChange={(e) => {
          setImage(e.target.value)
        }}></input>
        <label>servings</label>
        <input type="text" name="servings" onChange={(e) => {
          setServings(e.target.value)
        }}></input>
        <button onClick={addRecipe}>Add the new Recipe</button>
      </div> */