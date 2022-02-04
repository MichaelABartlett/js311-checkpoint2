
import '../Stlyes/home.css'
import React from "react";
import hungryKid from '../images/hungryKid.jpg'
import frozenChicken from '../images/frozenChicken.jpg'



function Home() {

  return (
    <main className="home">
      <div>
   
        <p className='title'>Cooking Prep</p>
        <h1 className='explain'>Where we help you prep your food</h1>

        <h1 className='dontLet'>So you can avoid this being you</h1>
        <section className='images'>
          <div className="hungryKid">
              <div>
                <h1>Your hungry family</h1>
                <img src={hungryKid} alt="Image of guy thinking" height={200} width={300}/>
              </div>  
          </div>
          <div className="frozenFood">
              <div>
                <h1>Your frozen food</h1>
                <img src={frozenChicken} alt="Image of prozen chicken" height={200} width={300}/>
              </div>  
          </div>
        </section>
      </div>
      
    </main>

  );
}

export default Home;
