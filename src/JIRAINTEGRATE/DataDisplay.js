import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import "ag-grid-community/styles/ag-theme-quartz.css"
import { AgGridReact } from 'ag-grid-react'
import JiraLogin from './JiraLogin';

ModuleRegistry.registerModules([AllCommunityModule]);


const DisplayData = () => {
  return (
    <div>
        <h6>DisplayData</h6>
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
        
        />
    </div>
  )
}

export default DisplayData
