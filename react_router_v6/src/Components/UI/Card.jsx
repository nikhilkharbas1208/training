import { NavLink } from "react-router-dom";
export const Card = ({curMovie}) => {
    const {Poster, imdbID} = curMovie;
     console.log("Poster:", Poster);
    return(
        <>
        <li>
        <NavLink to={`/movie/${imdbID}`}>
        <img src={Poster} alt=''/>
        <button>Watch Now</button>
        </NavLink>
        </li>
        </>
    );
};