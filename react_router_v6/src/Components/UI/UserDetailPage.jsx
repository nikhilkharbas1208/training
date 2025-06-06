import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export const UserDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    console.log(params);
    const userData =useLoaderData();
    console.log(userData);
    const {name, email, phone, address} = userData;
    return(
        <>
        <h1>User Details</h1>
        <h3>name:{name}</h3>
        <h4>email:{email}</h4>
        <h4>phone:{phone}</h4>
        <h4>Address: {JSON.stringify(address)}</h4>
        <button onClick={ handleGoBack }>
            Go Back
        </button>
        </>
    );
};