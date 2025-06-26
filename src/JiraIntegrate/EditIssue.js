import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import withFetchIssue from './FetchIssue';
let data1;
const EditIssue = (props) => {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const username = process.env.REACT_APP_USERNAME
    const apiToken =process.env.REACT_APP_API_TOKEN
    const auth = btoa(`${username}:${apiToken}`);

    const {id} = useParams()
    data1=id
    const [projectKey1, setProjectKey1] = useState('');
    const [issueType1, setIssueType1] = useState('');
    const [summary1, setSummary1] = useState('');
    const [description1, setDescription1] = useState('');
    const [result, setResult] = useState(null);
    const [issueKey1,setIssuekey1]=useState('');


    const {projectKey,issueType,issueKey,summary,description} = props.data
    console.log("EditIssue",props.data.projectKey)
    useEffect(()=>{
      if(props.data.projectKey){
        setDescription1(props.data.description)
        setIssueType1(props.data.issueType)
        setIssuekey1(props.data.issueKey)
        setProjectKey1(props.data.projectKey)
        setSummary1(props.data.summary)
      } console.log("EditIssue data",props.data.description)
     
    },[props.data])
         
      if (error) return <div>Error: {error}</div>;

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fields: {
        project: { key: projectKey1 },
        summary:summary1,
        description: {
          type: 'doc',
          version: 1,
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: description1 }] }
          ]
        },
        issuetype: { name: issueType1 }
      }
    };

         
          try {
            const res = await fetch(`/rest/api/3/issue/${data1}`, {
              method: 'PUT',
              headers: {  'Authorization': `Basic ${auth}`,
                  'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            console.log(res,"done api call got res");
            setResult( res);
          } catch (err) {
            setResult({ error: err.message });
            
          }
  };
  return (
     <center>
    <br/>
    <br/>
        <form onSubmit={handleSubmit}>
      <label>Project Key:<br/>
        <input value={projectKey1} onChange={e => setProjectKey1(e.target.value)} readOnly/>
      </label><br/>
      <label>Issue Type:<br/>
        <input value={issueType1} onChange={e => setIssueType1(e.target.value)} readOnly/>
      </label><br/>
       <label>Issue Key:<br/>
        <textarea value={issueKey1} onChange={e => setIssuekey1(e.target.value)} readOnly />
         </label><br/>
      <label>Summary:<br/>
        <input value={summary1} onChange={e => setSummary1(e.target.value)}  />
      </label><br/>
      <label>Description:<br/>
        <textarea value={description1} onChange={e => setDescription1(e.target.value)}  />
      </label><br/>
      <button type="submit">Update Task</button>

      {result && (
        <div style={{color:'#DC3545'}} >
          {result
            ? `Updated issue   Status :${result.ok} `
            : 'not updated'}
        </div>
      )}
    </form>
  
      </center>
  )
}
const data =()=>{return data1}
export default withFetchIssue(EditIssue,data)