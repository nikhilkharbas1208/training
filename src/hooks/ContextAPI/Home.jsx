import { useContext } from "react";
import { BioContext } from ".";

export const Home = () => {
    // const name=useContext(BioContext);
    const {myName, myage}=useContext(BioContext);
    return(
        <div>
            <h1>Hello Context API.. My name is { myName }.. My age is { myage }</h1>
        </div>
    );
}