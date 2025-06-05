// App.js or Table.jsx
import React, { useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// ✅ Import & register only required modules
import { CheckboxCellRenderer, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule  } from 'ag-grid-community';
// import { GridReadyEvent } from 'ag-grid-community';?
import { TextEditorModule, TextFilterModule,
  NumberFilterModule, NumberEditorModule, RowSelectionModule,PaginationModule  } from 'ag-grid-community';

ModuleRegistry.registerModules([PaginationModule  ,ClientSideRowModelModule, TextEditorModule ,TextFilterModule, NumberFilterModule,NumberEditorModule, RowSelectionModule]);

const SimpleComp =p => {
  const viewHandler = useCallback(()=> window.alert('Name:'+p.value))
  return(
  <>
    <button onClick={viewHandler}>view</button>
    {p.value}
  </>);
}
const MyCellComponent = p => {
    return(
        <>
         <button onClick={()=>window.alert("Action!")}>
            Edit
         </button>
         {p.value}
        </>
    );
}

export const Table = () => {
  const rowData = [
     { name: "John", age: 25, country: "USA", edit: '' },
  { name: "Maria", age: 30, country: "UK", edit: '' },
  { name: "Lee", age: 28, country: "China", edit: '' },
  { name: "Alice", age: 22, country: "Canada", edit: '' },
  { name: "Bob", age: 35, country: "Australia", edit: '' },
  { name: "Eva", age: 27, country: "Germany", edit: '' },
  { name: "Tom", age: 33, country: "France", edit: '' },
  { name: "Liam", age: 24, country: "Ireland", edit: '' },
  { name: "Sophia", age: 29, country: "Italy", edit: '' },
  { name: "Noah", age: 31, country: "Brazil", edit: '' },
  { name: "Isabella", age: 26, country: "Mexico", edit: '' },
  { name: "Mason", age: 23, country: "Netherlands", edit: '' },
  { name: "Olivia", age: 28, country: "Sweden", edit: '' },
  { name: "Ethan", age: 34, country: "New Zealand", edit: '' },
  { name: "Emma", age: 25, country: "Norway", edit: '' },
  { name: "James", age: 32, country: "South Africa", edit: '' },
  { name: "Ava", age: 27, country: "Japan", edit: '' },
  { name: "Lucas", age: 30, country: "South Korea", edit: '' },
  ];

  const columnDefs = [
    { headerName: "Name", field: "name", checkboxSelection: true, headerCheckboxSelection: true, cellRenderer: SimpleComp},    //flex: 2
    { headerName: "Age", field: "age" },
    { headerName: "Country", field: "country" },
    { headerName: "Edit", field: "edit", cellRenderer: MyCellComponent}
  ];
  const defaultColDef={
        sortable: true , editable: true, filter: true, //flex: 1      // flex for resize column width
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 300, width: 700 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs} defaultColDef={defaultColDef} rowSelection="multiple" pagination={true} paginationPageSize={10} paginationPageSizeSelector={[10,20]}
      />
    </div>
  );
};
