import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import StateObject from '../Hooks/StateObject'

const About = () => {
  return (
    <div>
      
        <h1>
            About Us
        </h1>
        <div>
          
             <Link  to="Products">   <span> Products___________ </span></Link>
             <Link to="Contact">  <span> Contact___________ </span></Link>

        </div>
        <StateObject/>
      <Outlet/>
    </div>
  )
}

export default About