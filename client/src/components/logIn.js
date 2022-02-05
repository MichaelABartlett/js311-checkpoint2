import '../Stlyes/login.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';


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
      console.log("made it thru", res)
      console.log('jwt', process.env.jwtSecret)
      localStorage.setItem('name', state.username)
      document.cookie = "loggedIn=true;max-age=1000"
      console.log('document.cookie: ', document.cookie)
      window.location.replace("/")
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
                  <br/>
              <button type="submit">Submit</button>
            </form>
            <p>If you do not have a accout you can create one with Create Profile</p>


    </main>

  );
}

export default LogIn;

