import '../Stlyes/createProfile.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function CreateProfile() {

  const UserName = () => {

  }

  const Password = () => {

  }

  const ConfirmPassword = () => {

  }

  const Email = () => {

  }

  const TimeZone = () => {

  }

  return (
    <main className="createProfile">
      <h1>Create a Profile</h1>
      <br/>
        <body className='body'>
            <input type="text" name="userName" placeholder='User Name' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
              <br/>
            <input type="text" name="password" placeholder='Password' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
              <br/>
            <input type="text" name="confirmPassword" placeholder='Confirm Password' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
              <br/>
            <input type="text" name="Email" placeholder='Email' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
              <br/>
            <input type="text" name="timeZone" placeholder='Time Zone' className='input' onChange={(e) => {
                UserName(e.target.value)
                }}></input>
              <br/>
        </body>
    </main>

  );
}

export default CreateProfile;
