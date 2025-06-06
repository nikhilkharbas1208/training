import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../API/GetUserApi";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { themeQuartz } from 'ag-grid-community';
import { CheckboxCellRenderer, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule  } from 'ag-grid-community';
import { TextEditorModule, TextFilterModule, NumberFilterModule, NumberEditorModule, RowSelectionModule,PaginationModule  } from 'ag-grid-community';
import { NavLink } from "react-router-dom";

ModuleRegistry.registerModules([PaginationModule  ,ClientSideRowModelModule, TextEditorModule ,TextFilterModule, NumberFilterModule,NumberEditorModule, RowSelectionModule]);

const myTheme = themeQuartz
	.withParams({
        backgroundColor: "#1f2836",
        browserColorScheme: "dark",
        chromeBackgroundColor: {
            ref: "foregroundColor",
            mix: 0.07,
            onto: "backgroundColor"
        },
        foregroundColor: "#FFF",
        headerFontSize: 14
    });


function TablePage() {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      cellRenderer: (params) => (
        <NavLink to={`/user/${params.data.id}`}>
          {params.value}
        </NavLink>
      ),
    },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Company", field: "company.name" },
    { headerName: "Address", field: "address.city" },
    { headerName: "Website", field: "website" },
    { headerName: "Username", field: "username" },
  ];

  useEffect(() => {
    fetchUsers().then((data) => setRowData(data));
  }, []);

  return (
    <div style={{ height: 500}}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} theme={myTheme} defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          floatingFilter: true,
        }}/>
    </div>
  );
}

export default TablePage;
