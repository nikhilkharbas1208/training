import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const UserDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    let users;
    const handleGoBack = () => {
        navigate(-1);
    }
    console.log(id);
    const tableRowData = useSelector((state) => state.table.rows);
    const { apiUsers } = useContext(UserContext);
    if (apiUsers) {
    users = apiUsers;
    } else {
     users = tableRowData;
    }
    const filteredUsers = users.filter((user) => user.id === parseInt(id));
    const userData = filteredUsers[0];
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