import React, { useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { loadIssues } from './features/jiraIssueSlice';
import {ClientSideRowModelModule,PaginationModule, RowSelectionModule, TextFilterModule, NumberFilterModule, TextEditorModule, NumberEditorModule,} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
ModuleRegistry.registerModules([ ClientSideRowModelModule, PaginationModule, RowSelectionModule, TextFilterModule, NumberFilterModule,TextEditorModule, NumberEditorModule,]);



const JiraTable = ({ projectKey }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.issues);
  console.log(items);

  useEffect(() => {
    dispatch(loadIssues(projectKey));
  }, [dispatch, projectKey]);

  const columnDefs = [
    { headerName: 'Ticket Id', field: 'id' },
    { headerName: 'Type', field: 'fields.issuetype.name' },
    { headerName: 'Title', field: 'fields.customfield_10068' },
    { headerName: 'Summary', field: 'fields.summary' },
    { headerName: 'Status', field: 'fields.status.name' },
    { headerName: 'Assignee', field: 'fields.assignee.displayName' },
    { headerName: 'Created', field: 'fields.created' },
  ];

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <>
    <h1>Jira Tickets</h1>
    <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
      <AgGridReact rowData={items} columnDefs={columnDefs} pagination={true} paginationPageSize={10} />
    </div>
    </>
  );
};

export default JiraTable;
