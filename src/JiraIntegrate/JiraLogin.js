import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jiraContext } from '..';
import { Button } from '../StyleComponents/button.style';
import { useTranslation } from 'react-i18next';

const JiraLogin = ({render}) => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [Result,setResult] = useState('');
  const {userData} = useContext(jiraContext)
  const auth=userData.auth     
  const navigate = useNavigate()
  let rowData;
  const[loading,setLoading]=useState(true)
  const{t,i18n} = useTranslation("global")

  const changeLang = (lang)=>{
    i18n.changeLanguage(lang)
  }

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
       return ( <Button onClick={()=>DeleteIssueHandler(p.data.id)} bgColor="rgb(233, 81, 81)">{t("DeleteIssue")}</Button>)
     }
     const UpdateIssueHandler =(id)=>{
      navigate (`/updateissue/${id}`)
    }

     const UpdateData =(p)=>{
      return ( <Button onClick={()=>UpdateIssueHandler(p.data.id)} bgColor="rgb(95, 211, 139)" >{t("Update Issue")}</Button>)
      
     }
    const [ colDefs,setColDefs ] = useState([
        
        {  field:`${t("id")}`},
        {  field:`${t("key")}`,
           cellRenderer :CellData,
        },
        {  field:"fields.parent.key",
           headerName:`${t("Parent")}`,
        },
        {  field:"fields.issuetype.name",
           headerName:`${t("Type")}`,
        },
        {  field:"fields.summary",
            headerName:`${t("Summary")}`,
        },
        {  field:"fields.status.name",
           headerName:`${t("Status")}`,
        },
        {  field:"fields.reporter.displayName",
            headerName:`${t("Reporter")}`,
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
            // floatingFilter:true,
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
        setLoading(false)
      } catch (err) {
        console.log(err.message)
        setError(err.message);
      }
    };

    fetchIssues();
  }, []);

  if (error) return <div>Error: {error}</div>;
  rowData = issues;
 

         return render(rowData,colDefs,columnStyle,loading)
}


export default JiraLogin;

