import React, { useContext, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { NavLink } from 'react-router-dom';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import { ModuleRegistry,  AllCommunityModule} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import ButtonStyled from './common/ButtonStyled';
import styles from './common/JiraTableTest.module.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { JIRA_API_TOKEN, JIRA_EMAIL } from '../constants/UrlConstants';
import axios from 'axios';

ModuleRegistry.registerModules([
  AllCommunityModule
]);

const JiraTableTest = () => {
  const { issues, loading, error } = useContext(JiraIssuesContext);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  console.log(issues);
  const getRowClass = (params) => {
  const rowClass = params.node.rowIndex % 2 === 0
    ? styles.alternateRow1
    : styles.alternateRow2;
  return `${rowClass} ${styles.hoverRow}`;
};
const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);
  const columnDefs = [
    { headerName: 'Ticket Id',editable: false, field: 'id' ,
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
    { headerName: 'Type', field: 'fields.issuetype.name',editable: editMode  },
    { headerName: 'Title', field: 'fields.customfield_10068',editable: editMode  },
    { headerName: 'Summary', field: 'fields.summary',editable: editMode  },
    { headerName: 'Status', field: 'fields.status.name',editable: editMode  },
    { headerName: 'Assignee', field: 'fields.assignee.displayName',editable: editMode  },
    { headerName: 'Created', field: 'fields.created',editable: editMode  },
    { headerName: 'Priority', field: 'fields.priority.name',editable: editMode  },
  ];
  
  const handleEdit = () => {
    setEditMode(true);
  };

  
  const handleCancel = () => {
    setEditMode(false);
  };

 
  const handleSave = async () => {
      setEditMode(false);
  };
  
//   if (Math.random() > 0.5) {
//   throw new Error("Test Error Boundary");
// }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        {loading ? (
          <Skeleton height={32} width={200} style={{ marginBottom: '20px' }} />
        ) : (
        <h1 className={styles.title}><center>Jira Tickets</center></h1>
        )}
      </div>
      
      <NavLink to="/create"  style={{ marginBottom: '10px', display: 'inline-block' }}>
      <ButtonStyled>Create</ButtonStyled>
      </NavLink>
      <ButtonStyled onClick={handleEdit} disabled={editMode}>Edit</ButtonStyled>
      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <Skeleton height={40} count={10} 
          style={{ marginBottom: '10px', borderRadius: '6px' }}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5" animation="wave" />
        </div>
      ) : (
      <div className={` ${styles.customGrid} ag-theme-alpine`} style={{ height: 500}}>
        <AgGridReact
          rowData={issues}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10} domLayout="autoHeight" getRowClass={getRowClass}
          onGridReady={(params) => params.api.sizeColumnsToFit()}  
        />
      </div>
       )}
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
              <ButtonStyled
                onClick={handleSave}
                disabled={!editMode || Object.keys(editedRows).length === 0}
              >
                Save
              </ButtonStyled>
              <ButtonStyled onClick={handleCancel} style={{ marginLeft: '10px' }} disabled={!editMode}>
                Cancel
              </ButtonStyled>
            </div>
    </div>
  );
};

export default JiraTableTest;
