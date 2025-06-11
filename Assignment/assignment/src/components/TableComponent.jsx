import React, { useContext } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { useSelector } from "react-redux";
import { ModuleRegistry } from 'ag-grid-community';
import {ClientSideRowModelModule,PaginationModule, RowSelectionModule, TextFilterModule, NumberFilterModule, TextEditorModule, NumberEditorModule,} from 'ag-grid-community';
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

ModuleRegistry.registerModules([ ClientSideRowModelModule, PaginationModule, RowSelectionModule, TextFilterModule, NumberFilterModule,TextEditorModule, NumberEditorModule,]);

export const TableComponent = () => {
  const { apiUsers, fetchAndSetUsers } = useContext(UserContext);
  const reduxRows = useSelector((state) => state.table.rows);
  const rowData = apiUsers ? apiUsers : reduxRows;
  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
       cellRenderer: (params) => (
         <NavLink to={`/user/${params.data.id}`}>{params.value}</NavLink>
       ),
    },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Company", field: "company.name" },
    { headerName: "Address", field: "address.city" },
    { headerName: "Website", field: "website" },
    { headerName: "Username", field: "username" },
  ];

  return (
    <>
      <h1>User List</h1>
       <button onClick={fetchAndSetUsers}>
        <h3>Fetch API Data</h3>
      </button>
      
      <div className="ag-theme-quartz" style={{ height: 400}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            floatingFilter: true,
          }}
        />
      </div>
    </>
  );
};

export default TableComponent;
