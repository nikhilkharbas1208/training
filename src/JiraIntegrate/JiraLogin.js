import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const JiraLogin = ({render}) => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  let rowData;
  
// '/issuedetails'
     const CellData =  (p) => (
      <Link to={`/issuedetails/${p.data.id}`}>
        {p.value}
      </Link>
    )   
    const [ colDefs,setColDefs ] = useState([
        
        // {  field:"fields.customfield_10020.name",
        //     valueFormatter: p =>p.value.toUpperCase(),
        //     //  cellRenderer :CellData,
        // },
        {  field:"id"},
        {  field:"key",
           cellRenderer :CellData,
        },
        {  field:"fields.parent.key",
           headerName:"Parent",
        },
        {  field:"fields.issuetype.name",
           headerName:"Type"
        },
        {  field:"fields.summary",
            headerName:"Summary"
        },
        {  field:"fields.status.name",
           headerName:"Status"
        },
        {  field:"fields.reporter.displayName",
            headerName:"Reporter"
        },
        { field:"",
          headerName:"button"
        }
        
         ])


          const columnStyle = useMemo(()=>{
        return{
            flex:5,
            editable:true,
            filter:true,
            floatingFilter:true,
        }
    })
useEffect(() => {
    const fetchIssues = async () => {
      const username = process.env.REACT_APP_USERNAME
      const apiToken =process.env.REACT_APP_API_TOKEN
       const domain = process.env.REACT_APP_API_DOMAIN

      const auth = btoa(`${username}:${apiToken}`); // Base64 encode for Basic Auth
      const projectKey="JIR"
       
      try {
        const response = await fetch(`/rest/api/3/search?jql=project=${projectKey}`, {
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
      } catch (err) {
        console.log(err.message)
        setError(err.message);
      }
    };

    fetchIssues();
  }, []);

  if (error) return <div>Error: {error}</div>;
  rowData = issues;
 

         return render(rowData,colDefs,columnStyle)
}


export default JiraLogin;

