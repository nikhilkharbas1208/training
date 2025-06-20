// const mapDispatchToProps = (dispatch) =>{
//  const IncAction = ()=>{
//  dispatch({
//     type:"INCREMENT"
//  })   
// }

//  const DecAction = () =>{
//  dispatch({
//     type:"DECREMENT"
//  })   
// }
// return (
//     <>
//     {IncAction}
//     {DecAction}
//     </>
// )

// }

// export default mapDispatchToProps


// export const IncAction = () => async dispatch =>{
//  dispatch({
//     type:"INCREMENT"
//  })   
// }

// export const DecAction = () => async dispatch =>{
//  dispatch({
//     type:"DECREMENT"
//  })   
// }






export const IncAction = () =>({
  type:"INCREMENT"
})
  

export const DecAction = () =>({
  type:"DECREMENT"
})
