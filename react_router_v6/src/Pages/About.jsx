import { useState } from "react";
import Button from "../Components/RenderProps/Button";

export const About = () => {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count+1);
    }
    return(
        <>
        <h1>About Page</h1>
        <Button render={handleClick}
        text="click me">
            <h1>{count}</h1>
        </Button>
        </>
    ); 
};