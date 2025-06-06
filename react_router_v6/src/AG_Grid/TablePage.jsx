import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "./Api";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { themeQuartz } from 'ag-grid-community';
import { CheckboxCellRenderer, ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule  } from 'ag-grid-community';
import { TextEditorModule, TextFilterModule,
  NumberFilterModule, NumberEditorModule, RowSelectionModule,PaginationModule  } from 'ag-grid-community';

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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/details/${params.data.id}`, { state: params.data });
          }}
        >
          {params.value}
        </a>
      ),
    },
    { headerName: "Email", field: "email" },
    { headerName: "Phone", field: "phone" },
    { headerName: "Company", field: "company.name" },
  ];

  useEffect(() => {
    fetchUsers().then((data) => setRowData(data));
  }, []);

  return (
    <div style={{ height: 500 }}>
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
