import WrapPromise from "../../../../Suspense/WrapPromise"

export const fetchRequest = ()=>{
    return {
        type : 'FETCH_REQUEST',
        loading : true,
    }
}

export const fetchSuccess = (data)=>{
    return{
        type : 'FETCH_SUCCESS',
        payload : data,
    }
}

export const fetchError = (message)=>{
    return{
        type : 'FETCH_ERROR',
        payload : message
    }
}

export const fetchProducts = ()=>{
    return (dispatch)=>{
        dispatch(fetchRequest())
        const promise = fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>{//res.json()
            const info =res.json();
            // console.log(info)
            return info
        })
        .then(json=>{
            const udata=json//.map(user=>user.name)
           console.log(udata)
            dispatch(fetchSuccess(udata))
         })
        .catch(err=>{
            console.log(err.message)
            dispatch(fetchError(err.message))
        })
     return WrapPromise(promise);
    }
}