import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
//import Navigation from './components/Navigation';
import cookie from 'cookie'
//import Testing from './components/testing';
import LogIn from './components/logIn';
import Home from './components/home';
import HowItWorks from './components/howItWorks';
import Calender from './components/calender';
import AllRecipeList from './components/allRecipeList';
import PickedRecipe from './components/pickedRecipe';
import AddRecipe from './components/addRecipe';
import CreateProfile from './components/createProfile';


const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
      return cookies["loggedIn"] ? true : false
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
      <Route
      {...rest}
      render={(props) => checkAuth()
          ? <Component {...props} />
          : <Link to="/sign-in" />}
      />
    )
  }


const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/addRecipe" element={ <AddRecipe />}/>
            <Route path="/logIn" element={ <LogIn />} />
            <Route path="/home" element={<Home />}/>
            <Route path="/howItWorks" element={<HowItWorks />}/>
            <Route path="/calender" element={<Calender />}/>
            <Route path="/allRecipeList" element={<AllRecipeList />}/>
            <Route path="/pickedRecipe" element={<PickedRecipe />}/>
            <Route path="/createProfile" element={<CreateProfile />}/>
        </Routes>
    );
};

export default Router;