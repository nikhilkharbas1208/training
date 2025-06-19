import store from "./AApp/store";
console.log('Initial State',store.getState())
const unsubscribe = store.subscribe(()=>{
    // console.log('Updated State',store.getState())
})
store.dispatch()
unsubscribe();