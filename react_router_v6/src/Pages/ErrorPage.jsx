// import { NavLink, useNavigate, useRouteError } from "react-router-dom";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error =useRouteError();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    if(error.status === 404){
    return(
        <><h1>ErrorPage</h1>
        <h3>404 NOT FOUND</h3>
        {/* <NavLink to="/">Go bak to home Page</NavLink> */}
        <button onClick={ handleGoBack }>
            Go Back
        </button>
        </>
    );
}
    return(
        <>
        <h3>Page you are looking doesn't exist</h3>
        </>
    );
};