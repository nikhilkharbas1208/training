import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    console.log(id);
    const tableRowData = useSelector((state) => state.table.rows);
    const userData = tableRowData.find((user) => user.id === parseInt(id));
    const {name, email, phone, address} = userData;
    return(
        <>
        <h1>User Details</h1>
        <h3>name:{name}</h3>
        <h4>email:{email}</h4>
        <h4>phone:{phone}</h4>
        <h4>Address: {address.city}</h4>
        <button onClick={ handleGoBack }>
            Go Back
        </button>
        </>
    );
}