import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import axios from "axios"

import { key } from "../Components/JiraViewComponent"


const initialState = {
    loading:false,
    tokens:[],
    error:'',
}

const JiraSlice = createSlice({
    name:'jira',
    initialState,
    reducers:{     
    fetchJiraIssue:(state,action)=>{
        // console.log(action,"in jira slice")
        state.tokens = action.payload;
    },
    deleteJiraIssue:(state,action)=>{
        // console.log([state.tokens],"state data in jira delete")
         state.tokens= state.tokens.filter(tok => tok.key !== action.payload)
        //  console.log([state.tokens.filter(tok =>{console.log(tok); 
        //  return tok.key !== action.payload})],"-----------------------delete in jira")
    },
    updateJiraIssue:(state,action)=>{

        // console.log(action.payload)
        const data = action.payload.data;
        const index = action.payload.index;
                // console.log(current(state.tokens),"in jira update state value")
                // let index = -1
                // const token = state.tokens.find(t => {index=index+1; return t.key === action.payload.key} );
            
            //    // console.log(state.tokens.find(t => {index=index+1;console.log(t.key,"====="); return t.key === action.payload.key} ),"-----",action.payload.key)
            //     if (token) {
            //     token.fields.summary = action.payload.fields.summary;
            //     token.fields.description.content[0].content[0].text =
            //         action.payload.fields.description.content[0].content[0].text;
            //     }

              state.tokens[index]=data;
        
        //  console.log(current(token),"_________________________after the update",index,"::::position")
    },
    // createJiraIssue:(state,action)=>{
    //         const token = state.tokens[0];
    //         if(token){
    //             token.fields.summary = action.payload.fields.summary;
    //             token.fields.description.content[0].content[0].text =
    //                 action.payload.fields.description.content[0].content[0].text;
    //             token.key=action.payload.key
    //         }
    //         state.tokens=state.tokens.unshift(token)

    // }

    },

})
   
export default JiraSlice.reducer
export const {fetchJiraIssue,deleteJiraIssue,updateJiraIssue} = JiraSlice.actions