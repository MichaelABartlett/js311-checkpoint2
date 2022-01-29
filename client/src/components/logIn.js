import '../Stlyes/login.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';
//require("dotenv").config();



function LogIn() {

  const [state, setState] = useState({
    username:"",
    password: ""
  })

  const submit = (e) => {
    e.preventDefault();
    console.log('this is the state: ', state);
    Axios.post("/login", state)
    .then(res => {
      console.log("made it thru", res.data)
      //process.env.jwtSecret = res.data;
      console.log(process.env.jwtSecret)
    })
    .catch(error => {
      console.log(error)
    })
    document.getElementById("logInForm").reset();
  }
  

  return (
    <main className="logIn">
        <h1>Login</h1>
            <form className='body' onSubmit={submit} id="logInForm">
                <br/>
            <input type="text" name="username" placeholder='User Name' className='input' autoComplete='off'
                  onChange={(e) => setState({...state, username: e.target.value})}></input>
                <br/>
            <input type="password" name="password" placeholder='Password' className='input' 
                  onChange={(e) => setState({...state, password: e.target.value})}></input>
              <button type="submit">Submit</button>
            </form>

    </main>

  );
}

export default LogIn;

