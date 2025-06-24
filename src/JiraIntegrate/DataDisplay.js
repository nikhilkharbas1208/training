import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from 'ag-grid-react'
import JiraLogin from './JiraLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

  
const DisplayData = () => {
   const [result, setResult] = useState(null);
   const username = process.env.REACT_APP_USERNAME
   const apiToken =process.env.REACT_APP_API_TOKEN
   const auth = btoa(`${username}:${apiToken}`);

 const navigate = useNavigate()
   const CreateIssueHandler=()=>{
      navigate ('/createissue')
   }
  

   const [id,setId]=useState("")
   
  //  const DeleteIssueHandler=async (id)=>{
  //     console.log("hi hello",id)
  //       try {
  //     const res = await fetch(`/rest/api/3/issue/${id}`, {
  //       method: 'DELETE',
  //       headers: {  'Authorization': `Basic ${auth}`, },
  //     });
  //     setResult( res);
  //     console.log(res);
  //   } catch (err) {
  //     setResult({ error: err.message });
  //   } 
  //  }

   const UpdateIssueHandler =()=>{
      navigate ('/updateissue')
    }
  return (
    <div>
        <h6>DisplayData</h6>
        <button onClick={CreateIssueHandler} style={{
                              padding: '10px 20px',
                              fontSize: '17px',
                              border: 'none',
                              borderRadius: '4px',
                              marginRight: '18px',
                              backgroundColor: '#007BFF',
                              color: '#fff'
                        }}  >CreateIssue</button>
        <br/><br/>

         <button onClick={UpdateIssueHandler} style={{
                              padding: '10px 20px',
                              fontSize: '17px',
                              border: 'none',
                              borderRadius: '4px',
                              marginRight: '18px',
                              backgroundColor: '	#008000',
                              color: '#fff'
                        }}  >UpdateIssue</button>
        <br/><br/>
                             
        {/* <button onClick={()=>DeleteIssueHandler(id)} style={{
                              padding: '10px 20px',
                              fontSize: '17px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: '#DC3545',
                              color: '#fff'
                          }}>DeleteIssue</button>
        <input type='text' placeholder='enter the issue id/key' onChange={(e)=>setId(e.target.value)} style={{ padding: '10px 20px',   borderRadius: '4px', marginRight: '18px',}}/>
                       

       {result && (
        <div style={{color:'#DC3545'}}>
          {result.ok
            ? "data deleted"
            : `${result.statusText}`}
        </div>
      )}
      <br/><br/> */}
      

        <JiraLogin   render = {
            (rowData,colDefs,columnStyle)=>(
                <div   className="ag-theme-quartz" style={{ height: 500 }}>
                            <AgGridReact rowData={rowData} 
                                 columnDefs={colDefs}
                                 rowSelection={{ type: 'multiRow' }}
                                 pagination={true}
                                 paginationPageSize={5}
                                 paginationPageSizeSelector={[3,5,10]}
                                 defaultColDef={columnStyle}
                            />
                
                        </div>
  )
        }
        
        /><outlook/>
    </div>
  )
}

export default DisplayData

