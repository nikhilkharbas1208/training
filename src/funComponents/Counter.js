import { useEffect, useState } from "react"

 const Counter = ()=>{
    const [num, setNum] = useState(0);
    const onHandleClick = ()=>{
        return setNum(num+1);
    }

    useEffect(()=>{
        return setNum(0);
    },[]
    );

    const ConRender = (num)=>{
       return(
         (num === 0) ? <div>number is {num}</div> :
       <div> {(num % 2) ? <p>{num} is odd</p> : <p>{num} is even</p>}</div>
       );
    }

    return (
        <center>
            <div>
                <h5>{ConRender(num)}</h5>
                <button onClick={onHandleClick}>Click</button>
            </div>
        </center>
    );
}

export default Counter;