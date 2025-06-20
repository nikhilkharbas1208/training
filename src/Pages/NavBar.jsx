import React from 'react'
import { Link } from 'react-router-dom'
import About from './About'
import Products from './Products'

const NavBar = () => {
  return (
    <div>
        <nav>
             <Link to="/">  <span> _________Home_________ </span></Link>
            <Link to="/About">  <span> _______About___________ </span></Link>
             <Link to="/Settings">  <span> _______Settings___________ </span></Link>
        </nav>
        <br/>
        {/* <Link to="/ClickMe">  <button >Click me</button></Link> */}
            
       
    </div>
  )
}

export default NavBar