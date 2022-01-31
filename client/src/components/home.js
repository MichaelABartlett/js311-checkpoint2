
import '../Stlyes/home.css'
import React from "react";
import hungryKid from '../images/hungryKid.jpg'
import frozenChicken from '../images/frozenChicken.jpg'



function Home() {

  return (
    <main className="home">
      <div>
   
        <h1>Cooking Prep</h1>
        <h1>Where we help</h1>
        <h1>You prep your food</h1>
        {/* <input type="text" name="userName" placeholder='User Name' className='input' onChange={(e) => {
                ViewRecipe(e.target.value)
                }}></input> */}
        <h1>Don't let this be you!!</h1>
        <section className='images'>
          <div class="hungryKid">
              <div>
                <img src={hungryKid} alt="Image of guy thinking" height={200} width={300}/>
              </div>  
          </div>
          <div class="hungryKid">
              <div>
                <img src={frozenChicken} alt="Image of prozen chicken" height={200} width={300}/>
              </div>  
          </div>
        </section>
      </div>
      
    </main>

  );
}

export default Home;
