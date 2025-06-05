import { NavLink } from "react-router-dom";
import "./Header.css";
export const Header = () => {
    return(
        <>
        <nav className="navbar">
                <h1 className="logo">My App</h1>
                <ul className="nav-links">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/movie">Movie</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li><NavLink to="#">Sign In</NavLink></li>
                </ul>
            </nav>
        </>
    );
};