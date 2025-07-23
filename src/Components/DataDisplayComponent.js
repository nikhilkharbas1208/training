import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-material.css"
import "ag-grid-community/styles/ag-grid.css";
import { AgGridReact } from 'ag-grid-react'
import JiraLogin, { fetchIssues } from '../Helpers/JiraLogin';
import { Link, Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
// import { Button } from './button.style';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'react-i18next';
import gridStyles from '../Components/DataDisplay.module.css';
import JiraView from './JiraViewComponent';
import '../App.css';
import { Button, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { updateJiraIssue } from '../Features/JiraSlice';


ModuleRegistry.registerModules([AllCommunityModule]);


  
const DisplayData = () => {
    const{t,i18n} = useTranslation("global")
    const dispatch = useDispatch()
    const changeLang = (lang)=>{
      i18n.changeLanguage(lang)
    }
    

   const navigate = useNavigate()
   const CreateIssueHandler=()=>{
      navigate ('/createissue')
   }

  
  
   return (
    <div>
        <button title="english" onClick={()=>changeLang("en")} className='m-2'>en</button>
        <button title="telugu" onClick={()=>changeLang("tl")}  className='m-2'>tl</button>
         <br/><br/>
        <Button title="createIssue" onClick={CreateIssueHandler}  ><Icon name='plus square'/>{t("Create Issue")}</Button>
        <br/><br/>
        <div   className= "ag-theme-quartz " style={{ height: 200 }} >
           <JiraLogin  render = {
            (rowData,colDefs,columnStyle,loading,onRowValueChanged,onGridReady,gridApi)=>( loading ?  <Skeleton height={300} width={10000} style={{ position: 'absolute', top: 140, left: 0 }} /> :
                        <>    <AgGridReact rowData={rowData} 
                                 columnDefs={colDefs}
                                 rowSelection={{ type: 'multiRow' }}
                                 pagination={true}
                                 paginationPageSize={8}
                                 paginationPageSizeSelector={[8,16]}
                                 defaultColDef={columnStyle}
                                 domLayout="autoHeight"
                                 rowHeight={37}
                                 headerHeight={35}
                                 gridOptions ={ { valueCache: true }}
                                 editType="fullRow"                                      
                                 onRowValueChanged= {onRowValueChanged} 
                                 onGridReady={onGridReady}
                                 ref={gridApi}
                                 //suppressColumnVirtualisation={true}
                                 
                            />
                            </>
                          ) }
             />
           
          </div>  
      </div>
  )
}


export default DisplayData
