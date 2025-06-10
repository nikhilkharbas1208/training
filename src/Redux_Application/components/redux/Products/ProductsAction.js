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
        fetch('https://fakestoreapi.com/products')
        .then(res=>{//res.json()
            const info =res.json();
            console.log(info)
            return info
        })
        .then(json=>{
            const pdata=json.map(product=>product.title)
            console.log(pdata)
            dispatch(fetchSuccess(pdata))
         })
        .catch(err=>{
            console.log(err.message)
            dispatch(fetchError(err.message))
        })
    }
}