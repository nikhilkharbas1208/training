import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from 'ag-grid-react'
import JiraLogin from './JiraLogin';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../StyleComponents/button.style';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'react-i18next';

ModuleRegistry.registerModules([AllCommunityModule]);

  
const DisplayData = () => {
    const{t,i18n} = useTranslation("global")
    
    const changeLang = (lang)=>{
      i18n.changeLanguage(lang)
    }
    

   const navigate = useNavigate()
   const CreateIssueHandler=()=>{
      navigate ('/createissue')
   }
  
   return (
    <div>
        <button onClick={()=>changeLang("en")} className='m-2'>en</button>
        <button onClick={()=>changeLang("tl")}  className='m-2'>tl</button>
         <br/><br/>
        <Button onClick={CreateIssueHandler} bgColor="rgb(136, 148, 253)"  >{t("Create Issue")}</Button>
        <br/><br/>
        <JiraLogin   render = {
            (rowData,colDefs,columnStyle,loading)=>( loading ?  <Skeleton height={400} width={10000} style={{ position: 'absolute', top: 120, left: 0 }} /> :
                <div   className="ag-theme-quartz" style={{ height: 500 }}>
                            <AgGridReact rowData={rowData} 
                                 columnDefs={colDefs}
                                 rowSelection={{ type: 'multiRow' }}
                                 pagination={true}
                                 paginationPageSize={8}
                                 paginationPageSizeSelector={[8,16]}
                                 defaultColDef={columnStyle}
                                 
                            />
                        </div>) }
                /><Outlet/>
                </div>
  )
}

export default DisplayData

