import React from 'react'
import { AppBar, Toolbar,
    Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'





const Navigation = (props) => {

    const cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    // console.log('navigation props: ', props)
    console.log('LoggedIn cookie in nav', cookies.loggedIn)


    return (
        <AppBar position='relative'>
            <Toolbar>
            <Typography variant="h6" style={{ flexGrow: "1" }}>
                    Recipe Prep
                </Typography>
                <ul className="nav-list" >
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/">Home</Link>
                    </li>
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/howItWorks">How It Works</Link>
                    </li>
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/allRecipeList">All Recipe List</Link>
                    </li>
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/pickedRecipe">{cookies.loggedIn ? "Picked Recipe" : ""}</Link>
                    </li>
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/addRecipe">{cookies.loggedIn ? "Add Recipe" : ""}</Link>
                    </li>
                    {/* <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/calender">Calender</Link>
                    </li> */}
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/createProfile">Create Profile</Link>
                    </li>
                    <li className="navItem">
                        <Link style={{color: "white", textDecoration: 'none'}} to="/logIn">{!cookies.loggedIn ? "Log In" : ""}</Link>
                    </li>
                    <li className="nav-list-item" 
                        onClick={() => {
                            document.cookie = "loggedIn="
                            window.location.replace("/")
                        }}>
                        {cookies.loggedIn ? "Logout" : ""}
                    </li>
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
