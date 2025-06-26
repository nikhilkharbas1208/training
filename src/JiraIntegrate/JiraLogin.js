import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const JiraLogin = ({render}) => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [Result,setResult] = useState('');
  const username = process.env.REACT_APP_USERNAME
  const apiToken =process.env.REACT_APP_API_TOKEN
  const auth = btoa(`${username}:${apiToken}`);
  const navigate = useNavigate()
  let rowData;
  
// '/issuedetails'
     const CellData =  (p) => (
      <Link to={`/issuedetails/${p.data.id}`}>
        {p.value}
      </Link>
    )   
    const DeleteIssueHandler=async (id)=>{
      console.log("hi hello",id)
        try {
      const res = await fetch(`/rest/api/3/issue/${id}`, {
        method: 'DELETE',
        headers: {  'Authorization': `Basic ${auth}`, },
      });
      setResult( res);
      console.log(res);
    } catch (err) {
      setResult({ error: err.message });
    } 
   }
     const DeleteData = (p)=>{
      //  console.log(p.data.id);
       return ( <button onClick={()=>DeleteIssueHandler(p.data.id)} style={{
                              padding: '2px 10px',
                              fontSize: '17px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: '#DC3545',
                              color: '#fff'
                          }}>DeleteIssue</button>)
     }
     const UpdateIssueHandler =(id)=>{
      navigate (`/updateissue/${id}`)
    }

     const UpdateData =(p)=>{
      return ( <button onClick={()=>UpdateIssueHandler(p.data.id)} style={{
                              padding: '2px 10px',
                              fontSize: '17px',
                              border: 'none',
                              borderRadius: '4px',
                              marginRight: '18px',
                              backgroundColor: '	#008000',
                              color: '#fff'
                        }}  >UpdateIssue</button>)
      
     }
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
        { 
          field :"self",
          headerName:"",
          cellRenderer:DeleteData,
        },
        {
          field :"expand",
          headerName:"",
          cellRenderer:UpdateData,
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

