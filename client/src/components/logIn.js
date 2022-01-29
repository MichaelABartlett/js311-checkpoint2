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
    Axios.post("/login", state).then(res => {
      console.log("made it thru", res)
    })
  }
    


  return (
    <main className="logIn">
        <h1>Login</h1>
            <form className='body' onSubmit={submit}>
                <br/>
            <input type="text" name="username" placeholder='User Name' className='input' 
                  onChange={(e) => setState({...state, username: e.target.value})}></input>
                <br/>
            <input type="text" name="password" placeholder='Password' className='input' 
                  onChange={(e) => setState({...state, password: e.target.value})}></input>
              <button type="submit">Submit</button>
            </form>

    </main>

  );
}

export default LogIn;

