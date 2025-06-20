import { useState } from 'react';

export default function CreateIssue() {
  const [projectKey, setProjectKey] = useState('TEST');
  const [issueType, setIssueType] = useState('Task');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);

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

          const username = process.env.REACT_APP_USERNAME
      const apiToken =process.env.REACT_APP_API_TOKEN
      const auth = btoa(`${username}:${apiToken}`);

    try {
      const res = await fetch('/rest/api/3/issue', {
        method: 'POST',
        headers: {  'Authorization': `Basic ${auth}`,
             'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setResult(await res.json());
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <center>
        <form onSubmit={handleSubmit}>
      <label>Project Key:<br/>
        <input value={projectKey} onChange={e => setProjectKey(e.target.value)} />
      </label><br/>
      <label>Issue Type:<br/>
        <input value={issueType} onChange={e => setIssueType(e.target.value)} />
      </label><br/>
      <label>Summary:<br/>
        <input value={summary} onChange={e => setSummary(e.target.value)} required />
      </label><br/>
      <label>Description:<br/>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      </label><br/>
      <button type="submit">Create Task</button>

      {result && (
        <div style={{color:'#DC3545'}} >
          {result.key
            ? `Created issue ${result.key}`
            : result.errors}
        </div>
      )}
    </form>
    </center>
  );
}
