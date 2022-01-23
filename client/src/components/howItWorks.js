import '../Stlyes/howItWorks.css'
import React, { useState, useEffect} from "react";
import Axios from 'axios';



function HowItWorks() {


  return (
    <div className="howItWorks">
      <h1>How it works</h1>
      <h2>Where you are helped with getting recipes prepared so they can be cooked and served when you expected to</h2>
      <a>
        <h2>Why do we require that you have an account</h2>
        <ul>
          <li>We need to be able to text you instructions</li>
          <li>So we can build a database to store your cook calender</li>
        </ul>
        <h2>After looging In</h2>
        <ul>
          <li>Select a recipe</li>
          <li>Enter a date and time to cook them</li>
          <li>You can look at your calender for upcomming recipe cook times</li>
        </ul>
        <h2>You can add a recipe</h2>
        <ul>
          <li>Keep in mind the added recipe will be available to everyone</li>
          <li>Fill in as many fields as possiable</li>
          <li>Currently we do not have the ability to go back and change a recipe so double check everything</li>
        </ul>
      </a>
    </div>

  );
}

export default HowItWorks;
