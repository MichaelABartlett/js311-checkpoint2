import React from 'react'
import { Routes, Route, Redirect } from 'react-router'
// import Listing from './containers/Listing'
// import SignIn from './containers/SignIn'
// import AddNewListing from './containers/AddNewListing'
// import AdminView from './containers/AdminView'
// import BizDetails from './containers/BizDetails'
import Work from './components/addRecipe'
import Navigation from './components/Navigation';
// import cookie from 'cookie'
import Testing from './components/testing';
import LogIn from './components/logIn';
import Home from './components/home';
import HowItWorks from './components/howItWorks';
import Calender from './components/calender';
import AllRecipeList from './components/allRecipeList';
import PickedRecipe from './components/pickedRecipe';
import AddRecipe from './components/addRecipe';
import CreateProfile from './components/createProfile';


// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//       return cookies["loggedIn"] ? true : false
// }

// const ProtectedRoute = ({component: Component, ...rest}) => {
//     return (
//       <Route
//       {...rest}
//       render={(props) => checkAuth()
//           ? <Component {...props} />
//           : <Redirect to="/sign-in" />}
//       />
//     )
//   }


const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Testing />}/>
            <Route path="/addRecipe" element={ <AddRecipe />}/>
            <Route path="/logIn" element={ <LogIn />} />
            <Route exact path="/home" element={<Home />}/>
            <Route exact path="/howItWorks" element={<HowItWorks />}/>
            <Route exact path="/calender" element={<Calender />}/>
            <Route exact path="/allRecipeList" element={<AllRecipeList />}/>
            <Route exact path="/pickedRecipe" element={<PickedRecipe />}/>
            <Route exact path="/createProfile" element={<CreateProfile />}/>
            {/* <ProtectedRoute path="/admin-view" component={AdminView} /> */}
            {/* <Route path="/singleListing/:id" component={BizDetails} /> */}
        </Routes>
    );
};

export default Router;