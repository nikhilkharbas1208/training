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
import { ModuleRegistry,  AllCommunityModule} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import ButtonStyled from './common/ButtonStyled';
import styles from './common/JiraTableTest.module.css'

ModuleRegistry.registerModules([
  AllCommunityModule
]);

const JiraTableTest = () => {
  const { issues } = useContext(JiraIssuesContext);
  console.log(issues);
  const getRowClass = (params) => {
  const rowClass = params.node.rowIndex % 2 === 0
    ? styles.alternateRow1
    : styles.alternateRow2;
  return `${rowClass} ${styles.hoverRow}`;
};

  const columnDefs = [
    { headerName: 'Ticket Id', field: 'id' ,
      cellRenderer: (params) => {
      return (
       <NavLink
          to={`/issue/${params.data.id}`} className={styles.linkCell}
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
    { headerName: 'Priority', field: 'fields.priority.name' },
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Jira Tickets</h1>
      </div>
      <NavLink to="/create" style={{ marginBottom: '10px', display: 'inline-block' }}>
      <ButtonStyled>Create</ButtonStyled>
      </NavLink>
      <ButtonStyled>Edit</ButtonStyled>
      <div className={` ${styles.customGrid} ag-theme-alpine`} style={{ height: 500}}>
        <AgGridReact
          rowData={issues}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10} domLayout="autoHeight" getRowClass={getRowClass}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </div>
  );
};

export default JiraTableTest;
