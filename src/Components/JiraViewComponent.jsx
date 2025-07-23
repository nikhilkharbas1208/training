import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchJiraIssue } from './features/jira/JiraSlice';
// import { deleteissue } from './features/jira/jiraSliceDelete';
import { deleteJiraIssue, fetchJiraIssue, updateJiraIssue } from '../Features/JiraSlice';
import axios from 'axios';

 
export const key = 'JIR-27'
const JiraView = () => {
let datas =useRef();
    useEffect(() => {
    const fetchIssues = async () => {
      const projectKey="JIR"
       datas.current = await axios.get(`/rest/api/3/search?jql=project=${projectKey}`)
        console.log(datas.current.data.issues,"in jira login for get")
       
      }; fetchIssues()
    },[])


    const updateneeded = {
          fields: {
            project: { key: 'JIR' },
            summary:'summary1',
            description: {
              type: 'doc',
              version: 1,
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'description1' }] }
              ]
            },
            issuekey: { name: 'JIR-27' }
          }
        }
 

    const data  = useSelector(state=>state.jira.tokens)
    useEffect(()=>{
         console.log(Array.isArray(data),"in jira view");
    },[data])

   
    const dispatch = useDispatch();

    const deleteHandle = ()=>{
      console.log(data)
      return dispatch( deleteJiraIssue('JIR-29'))
    }

    const updateHandle=()=>{
      console.log(updateneeded)
      return dispatch(updateJiraIssue(updateneeded))
    }
  return (
    <div>
        <h2>JiraView</h2>
        <button onClick={()=>( dispatch(fetchJiraIssue(datas.current.data.issues)))}>get in console</button>
        {/* <p>{data}</p> */}
        <button onClick={()=>{deleteHandle()}}> delete issue</button>
        <button onClick={()=>{updateHandle()}}>update issue</button>
    </div>
  )
}

export default JiraView