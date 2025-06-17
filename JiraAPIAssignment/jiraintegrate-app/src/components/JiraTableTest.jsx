import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { NavLink } from 'react-router-dom';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import {
  ClientSideRowModelModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  TextEditorModule,
  NumberEditorModule,
} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  PaginationModule,
  RowSelectionModule,
  TextFilterModule,
  NumberFilterModule,
  TextEditorModule,
  NumberEditorModule,
]);

const JiraTableTest = () => {
  const { issues } = useContext(JiraIssuesContext);
  console.log(issues);
  const columnDefs = [
    { headerName: 'Ticket Id', field: 'id' ,
      cellRenderer: (params) => {
      return (
       <NavLink
          to={`/issue/${params.data.id}`}
        >
          {params.value}
        </NavLink>
      );
    },
    },
    { headerName: 'Type', field: 'fields.issuetype.name' },
    { headerName: 'Title', field: 'fields.customfield_10068' },
    { headerName: 'Summary', field: 'fields.summary' },
    { headerName: 'Status', field: 'fields.status.name' },
    { headerName: 'Assignee', field: 'fields.assignee.displayName' },
    { headerName: 'Created', field: 'fields.created' },
  ];

  return (
    <>
      <h1>Jira Tickets</h1>
      <NavLink to="/create" style={{ marginBottom: '10px', display: 'inline-block' }}>
      <button>Create</button>
      </NavLink>
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={issues}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
};

export default JiraTableTest;
