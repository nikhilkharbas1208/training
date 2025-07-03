import React, { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import ButtonStyled from './common/ButtonStyled';
import styles from './common/JiraTableTest.module.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { JIRA_API_TOKEN, JIRA_BASE_URL, JIRA_EMAIL } from '../constants/UrlConstants';
import { FaTrash } from 'react-icons/fa';
import LoaderComponent from './common/LoaderComponent';
import { deleteIssue, updateIssues } from '../services/JiraService';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';


ModuleRegistry.registerModules([
  AllCommunityModule
]);

const JiraTableTest = () => {
  // const { issues, loading, error } = useContext(JiraIssuesContext);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const { issues, loading, error, refreshIssues, getIssueById } = useContext(JiraIssuesContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const issueTypeOptions = ['Bug', 'Task'];


  console.log(issues);
  const getRowClass = (params) => {
    const rowClass = params.node.rowIndex % 2 === 0
      ? styles.alternateRow1
      : styles.alternateRow2;
    return `${rowClass} ${styles.hoverRow}`;
  };



  const handleCancel = () => {
    setEditMode(false);
    setEditedRows({});
    refreshIssues();
  };

  const handleDeleteClick = async (issueId) => {
    const confirm = window.confirm("Are you sure you want to Delete the issue?");
    if (!confirm) return;

    setIsDeleting(true);
    await deleteIssue(issueId);
    setIsDeleting(false);
    refreshIssues();
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateIssues(editedRows);

      alert("All updates saved!");
      setEditedRows({});
      setEditMode(false);
      refreshIssues();
    } catch (err) {
      console.error("Update failed:", err);
      console.log(error.config);
      alert("Some updates failed.");
    } finally {
      setIsSaving(false);
    }
  };


  const columnDefs = [
    {
      headerName: t('ticketid'), editable: false, field: 'id',
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
    {
      headerName: t('type'), field: 'fields.issuetype.name', editable: editMode, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: issueTypeOptions,
      },
    },
    { headerName: t('title'), field: 'fields.customfield_10068', editable: editMode },
    { headerName: t('summary'), field: 'fields.summary', editable: editMode },
    { headerName: t('status'), field: 'fields.status.name' },
    { headerName: t('assignee'), field: 'fields.assignee.displayName' },
    { headerName: t('created'), field: 'fields.created', },
    {
      headerName: t('priority'), field: 'fields.priority.name', editable: editMode, cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: priorityOptions,
      },
    },
    {
      headerName: t("delete"),
      field: "id",
      filter: false,
      sortable: false,
      cellRenderer: (params) => {
        return (

          <FaTrash
            onClick={() => handleDeleteClick(params.data.id)}
            style={{ cursor: "pointer", fontSize: "12px" }}
            title="Delete"
          />
        );
      },
    }

  ];


  //   if (Math.random() > 0.5) {
  //   throw new Error("Test Error Boundary");
  // }

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      <LanguageSelector />
      <div className={styles.headerSection}>
        {loading ? (
          <Skeleton height={32} width={200} style={{ marginBottom: '20px' }} />
        ) : (
          <h1 className={styles.title}><center>{t('jiraTicket')}</center></h1>
        )}
      </div>
      {isDeleting && <LoaderComponent message="Deleting issue..." />}
      {isSaving && <LoaderComponent message="Saving changes..." />}

      <NavLink to="/create" style={{ marginBottom: '10px', display: 'inline-block' }}>
        <ButtonStyled>{t('create')}</ButtonStyled>
      </NavLink>
      <ButtonStyled onClick={handleEdit} disabled={editMode}>{t('edit')}</ButtonStyled>
      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <Skeleton height={40} count={10}
            style={{ marginBottom: '10px', borderRadius: '6px' }}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5" animation="wave" />
        </div>
      ) : (
        <div className={` ${styles.customGrid} ag-theme-alpine`} style={{ height: 500 }}>
          <AgGridReact
            rowData={issues}
            columnDefs={columnDefs}
            defaultColDef={{
              filter: true,
              sortable: true,
              resizable: true,
            }}
            pagination={true}
            paginationPageSize={10} domLayout="autoHeight" getRowClass={getRowClass}
            onGridReady={(params) => params.api.sizeColumnsToFit()} onCellValueChanged={(params) => {
              const rowId = params.data.id;
              setEditedRows((prev) => ({
                ...prev,
                [rowId]: { ...params.data },
              }));
            }}
          />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonStyled
          onClick={handleSave}
          disabled={!editMode || Object.keys(editedRows).length === 0}
        >
          {t('save')}
        </ButtonStyled>
        <ButtonStyled onClick={handleCancel} style={{ marginLeft: '10px' }} disabled={!editMode}>
          {t('cancel')}
        </ButtonStyled>
      </div>
    </div>
  );
};

export default JiraTableTest;
