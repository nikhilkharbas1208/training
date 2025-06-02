const Level1 = (props) =>{
   return <div> <Level2 data = {props.data}/></div>
}

const Level2 = (props) =>{
  return <div> <Level3 data = {props.data}/></div>
}

const Level3 = (props) =>{
   return <div> <PropsDrill data = {props.data}/></div>
}

export const PropsDrill = (props) => {
    return (
       <div>
        <h4>PropsDrill</h4>
         <p>Got info from Ancestor</p>
         <p>the data is {props.data}</p>
       </div>
    )
}