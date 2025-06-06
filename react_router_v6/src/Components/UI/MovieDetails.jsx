import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export const MovieDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    console.log(params);
    const movieData =useLoaderData();
    console.log(movieData);
    const {Actor, Poster, Title, Plot, Type, Year, imdbID} = movieData;
    return(
        <>
        <h1>Movie Details</h1>
        <h2>Title:{Title}</h2>
        <img src={Poster} alt={Title}/>
        <p>{Plot}</p>
        <button onClick={ handleGoBack }>
            Go Back
        </button>
        </>
    );
};