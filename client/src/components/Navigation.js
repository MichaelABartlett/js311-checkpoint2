import React from 'react'
import { AppBar, Toolbar,
    Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'





const Navigation = (props) => {

    // const cookies = document.cookie
    // .split(';')
    // .map(cookie => cookie.split('='))
    // .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    // console.log('navigation props: ', props)
    // console.log('LoggedIn cookie in nav', cookies.loggedIn)



    return (
        <AppBar>
            <Toolbar>
                <Typography>
                   
                </Typography>
                <ul className="nav-list">
                    <li className="navItem">
                        <Link to="/">Testing</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/addRecipe">App Recipe</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/logIn">Log In</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/howItWorks">How It Works</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/calender">Calender</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/allRecipeList">All Recipe List</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/pickedRecipe">Picked Recipe</Link>
                    </li>
                    <li className="navItem">
                        <Link to="/createProfile">Create Profile</Link>
                    </li>
                    {/* <li className="nav-list-item" 
                        onClick={() => {
                            document.cookie = "loggedIn="
                            window.location.replace("/")
                        }}>
                        {cookies.loggedIn ? "Logout" : ""}
                    </li> */}
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
