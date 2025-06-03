import { useState } from 'react';

export const State = () => {
    // let value = 0;
    // const handleButtonClick = () => {
    //     value++;
    //     console.log(value);
    // };
    
    const [count, setCount] = useState(0);
     console.log("Parent Component Rendered");
    const handleButtonClick = () => {
        setCount( ()=> count + 1);
    };

    const [name, setName] = useState();
    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
         e.preventDefault();
        console.log('Submitted name:', name);
    };

    return(
        <><h1>{ count }</h1>
        {/* <button onClick={handleButtonClick}>Increment</button> */}
        <button onClick={handleButtonClick}>Increment</button>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" value={name} onChange={handleChange}/></label>
            <h1>{name}</h1>
            <button type="submit">Submit</button>
        </form>
        <ChildComponent/>
        </>
    );
};

function ChildComponent(){
    console.log("Child Component Rendered");
    return <div>Child Component</div>
}