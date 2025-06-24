import React, { useEffect, useState } from 'react'

const EditIssue = () => {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const username = process.env.REACT_APP_USERNAME
    const apiToken =process.env.REACT_APP_API_TOKEN
    const auth = btoa(`${username}:${apiToken}`);
    const [code,setCode]=useState('')
     const [projectKey, setProjectKey] = useState('');
  const [issueType, setIssueType] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [issueKey,setIssuekey]=useState('');
    const handleButton = (code) => {
        const fetchIssues = async () => {
          try {
            const response = await fetch(`/rest/api/3/issue/${code}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
      }
    })
           if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data)
            setIssues(data.issues);
            setProjectKey(data?.fields?.project?.key || '');
            setIssueType(data?.fields?.issuetype?.name || '');
            setSummary(data?.fields?.summary  || '');
            setIssuekey(data?.key || '')
            setDescription(data?.fields?.description?.content[0]?.content[0]?.text || '');
          } catch (err) {
            console.log(err.message)
            setError(err.message);
          }
        };
         fetchIssues();
    }

 
     
    
      if (error) return <div>Error: {error}</div>;
     
     
const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fields: {
        project: { key: projectKey },
        summary,
        description: {
          type: 'doc',
          version: 1,
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: description }] }
          ]
        },
        issuetype: { name: issueType }
      }
    };

         
          try {
            const res = await fetch(`/rest/api/3/issue/${code}`, {
              method: 'PUT',
              headers: {  'Authorization': `Basic ${auth}`,
                  'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            console.log(res,"is consoling");
            setResult( res);
          } catch (err) {
            setResult({ error: err.message });
          }
  };
  console.log(result,"is resulting");
  return (
     <center>
         <> <input type='text' onChange={e=>setCode(e.target.value)} style={{ padding: '10px 20px',   borderRadius: '4px', marginRight: '18px',}}/>
    <button onClick={()=>handleButton(code)}>Click Me</button></>
    <br/>
    <br/>
        <form onSubmit={handleSubmit}>
      <label>Project Key:<br/>
        <input value={projectKey} onChange={e => setProjectKey(e.target.value)} readOnly/>
      </label><br/>
      <label>Issue Type:<br/>
        <input value={issueType} onChange={e => setIssueType(e.target.value)} readOnly/>
      </label><br/>
       <label>Issue Key:<br/>
        <textarea value={issueKey} onChange={e => setIssuekey(e.target.value)} readOnly />
         </label><br/>
      <label>Summary:<br/>
        <input value={summary} onChange={e => setSummary(e.target.value)}  />
      </label><br/>
      <label>Description:<br/>
        <textarea value={description} onChange={e => setDescription(e.target.value)}  />
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

export default EditIssue