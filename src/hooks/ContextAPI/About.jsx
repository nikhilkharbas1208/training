import { useContext } from "react";
import { BioContext } from ".";

export const About = () => {
    // const name=useContext(BioContext);
    const {myName, myage}=useContext(BioContext);
    return(
        <div>
            <h1>(About) Context API.. My name is { myName }.. My age is { myage }(About)</h1>
        </div>
    );
}