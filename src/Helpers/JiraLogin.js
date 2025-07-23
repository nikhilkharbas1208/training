import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import 'semantic-ui-css/semantic.min.css';

// import { Button } from '../Components/button.style';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJiraIssue, fetchJiraIssue, updateJiraIssue } from '../Features/JiraSlice';
import JiraContext from '../JiraContext';
import '../App.css';
import { Button,Icon } from 'semantic-ui-react';

// import { fetchJiraIssue } from '../ToolKit/features/jira/JiraSlice';
export   let rowData;

export let fetchIssues;
const JiraLogin = ({render}) => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const [Result,setResult] = useState('');
  const {userData} = useContext(JiraContext)
  const auth=userData.auth     
  const navigate = useNavigate()
  const{t,i18n} = useTranslation("global")
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch()
  const jiraissues = useSelector(state=>state.jira.tokens)
  const [isOnOff,setIsOnOff] = useState(false);
  const [rowTemp,setRowTemp] = useState({data:"",index:0})
  let data ;
  let index;
  const gridApi = useRef(null);

  const CellData =  (p) => (
      <Link to={`/issuedetails/${p.data.id}`}>
        {p.value}
      </Link>
    )  
    
  const DeleteIssueHandler=async (id)=>{
       console.log("hi hello",id)
        try {
              const res = await axios.delete(`/rest/api/3/issue/${id}`, {
                      headers: {  'Authorization': `Basic ${auth}`, },
                    });
                    setResult( res);
                    console.log(res);
                    dispatch(deleteJiraIssue(id))
                    rowData=jiraissues
                    render(rowData, colDefs, columnStyle, loading)
            } catch (err) {
                    setResult({ error: err.message });
            } 
        }

       
    const StartEditIssueHandler =(p)=>{
     
      let ri = p.node.rowIndex;
       console.log(ri);
         gridApi.current = p.api;
          onBtStartEditing(ri);
          setIsOnOff(true);
        }
      const StopEditIssueHandler =(p)=>{
     
          onBtStopEditing();
          setIsOnOff(false)
        }
   
    const onGridReady = useCallback((params) => {
      gridApi.current = params.api;
    }, []);

    const CancelEditIssueHandler = ()=>{
      fetchIssues()
      setIsOnOff(false)
    }
    const ActionCell = (p)=>{
     //console.log(p);
       return (
                <div style={{ display: 'flex', gap: '50px' }}>
                 <Button onClick={()=>StartEditIssueHandler(p)}> <Icon name="edit"/> </Button>
                 <Button  onClick={()=>CancelEditIssueHandler()}> <Icon name="cancel" /> </Button> 
                 
                </div> 
              );
      }

      const ActionCell2 = (p)=>{
       return (
                <div style={{ display: 'flex', gap: '50px' }}>
                 <Button onClick={()=>DeleteIssueHandler(p.data.key)}> <Icon name="trash"/> </Button>
                 <Button onClick={()=>StopEditIssueHandler(p)}> <Icon name="save" /> </Button> 
                
                </div> 
              );
      }

    


    const [ colDefs,setColDefs ] = useState([
        
        {  field:`id`,
         headerName:`${t("Id")}`
        },
        {  field:`key`,
           headerName:`${t("Key")}`,
           cellRenderer :CellData,
        },
        {  field:"fields.issuetype.name",
           headerName:`${t("Type")}`,
           cellEditor: 'agSelectCellEditor',
           cellEditorParams: {
              values: [' Task ', 'Bug', 'Epic']
           }
        },
        {  field:"fields.summary",
           headerName:`${t("Summary")}`,
           editable:true,
           
        },
        {  field:"fields.status.name",
           headerName:`${t("Status")}`,
           editable:true,
           cellEditor: 'agSelectCellEditor',
           cellEditorParams: {
              values: ['To Do', 'In Progress', 'Done', 'deploy']
           }
        },
        {  field:"fields.reporter.displayName",
            headerName:`${t("Reporter")}`,
        },
        { 
          field :"self",
          headerName:"",
          cellRenderer:ActionCell,
        },
        { 
          field :"self",
          headerName:"",
          cellRenderer:ActionCell2,
        }
 
     ])

    function onCellValueChanged(event) {
            console.log( event);
            //  dispatch(updateJiraIssue(event.data));
          }

   
     const updateRow = async (row) => {
                // Fetch available transitions
                const payload =  {  "fields": 
                            {
                                "project": {  "key": row.fields.project.key  },
                                "summary":row.fields.summary,
                                "description": {
                                                  "type": "doc",
                                                  "version": 1,
                                                  "content": [
                                                    {
                                                      "type": "paragraph",
                                                      "content": [
                                                        {
                                                          "text": "description",
                                                          "type": "text"
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                },
                                "issuetype": {
                                  "name": row.fields.issuetype.name
                                }
                              
                              }
                            }
                const issueKey = row.key;
                const transitionName = row.fields.status.name;
                const meta = await axios.get(`/rest/api/3/issue/${issueKey}/transitions`);
                console.log(meta)
                const t = meta.data.transitions.find(t => t.name === transitionName);
                if (!t) throw new Error(`Transition '${transitionName}' not found`);

               
                await axios.post(
                  `/rest/api/3/issue/${issueKey}/transitions`,
                  { transition: { id: t.id } },
                  { headers: { 'Content-Type': 'application/json' }}
                );
                await axios.put(
                  `/rest/api/3/issue/${issueKey} `,payload,
                  { headers: { 'Content-Type': 'application/json' }}
                );

               
              }

           
    function  onRowValueChanged(event){
            console.log( event);
            // data= event.data;index= event.rowIndex;
             dispatch(updateJiraIssue({data: event.data,index: event.rowIndex}));
            updateRow(event.data);
          }

    const columnStyle = useMemo(()=>{
           
        return{
            flex:5,
            filter:true,
           
              headerValueGetter: params => t(`${params.colDef.headerName}`),
              onCellValueChanged: onCellValueChanged,
              onRowValueChanged: onRowValueChanged,
              valueSetter: params => {
                const { newValue, data, colDef, node } = params;
                const type = colDef.field; 
                let updatedFields = {
                  ...data.fields
                };
                console.log(params)

                if(type === 'fields.summary')
                  updatedFields.summary = newValue;
                if(type === 'fields.status.name')
                      {  updatedFields = {
                      ...data.fields,
                      status: {
                        ...data.fields.status,
                        name: newValue
                      }
                    };}
                     if(type === 'fields.issuetype.name')
                      {  updatedFields = {
                      ...data.fields,
                      issuetype: {
                        ...data.fields.issuetype,
                        name: newValue
                      }
                    };}
                


              const updatedRow = {
                  ...data,
                  fields: updatedFields,
                };
                
                
                node.setData(updatedRow);

                return true;
              }  
              
                      }
    },[i18n.language])

  const datas =useRef();

  useEffect(() => {
                         fetchIssues = async () => {
                          const projectKey = "JIR";
                          try {
                            const response = await axios.get(`/rest/api/3/search?jql=project=${projectKey}`,
                             {  headers: { 'Content-Type': 'application/json' }}
                            );
                            datas.current = response?.data?.issues ?? []; 
                            dispatch(fetchJiraIssue(datas.current));
                          } catch (error) {
                              if (error) return <div>Error: {error}</div>;
                          }finally{
                              setLoading(false);
                          }

                        };

                        fetchIssues();
      }, []);

 
 function onBtStopEditing() {
  gridApi.current.stopEditing();
  
}

function onBtStartEditing(ri) {
  // gridApi.setFocusedCell(0, "id");
  console.log(ri);
  gridApi.current.startEditingCell({
    rowIndex: ri,
    colKey: "fields.summary",
  });
}

      rowData =jiraissues
     // console.log(rowData,"it is row data")
  return render(rowData, colDefs, columnStyle, loading,onRowValueChanged,onGridReady,gridApi);


}


export default JiraLogin;    






