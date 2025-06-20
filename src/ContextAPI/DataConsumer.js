import { Consumer } from "./Contexts";

export const LevelA = () =>{
    return <LevelB/>;
}

export const LevelB = () =>{
    return <LevelC/>
}

export const LevelC = () =>{
    return <DataConsumer/>
}

export const DataConsumer = () =>{
    return (
        <div>
            <h3>CONTEXT API</h3>
            <Consumer>
                { (value) => (
                    <p>{value.data}</p>
                )}    
            </Consumer>  
       
        </div>
    )
}