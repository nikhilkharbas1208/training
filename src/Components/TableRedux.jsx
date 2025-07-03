import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteIssuefromStore, loadIssues, updateIssuesInStore } from '../features/jiraIssueSlice';
import {
 AllCommunityModule
} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonStyled from './common/ButtonStyled';
import styles from './common/JiraTableTest.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaTrash } from 'react-icons/fa';
import LoaderComponent from './common/LoaderComponent';
import { deleteIssue, updateIssues } from '../services/JiraService';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { JiraIssueContext } from '../App';

ModuleRegistry.registerModules([
 AllCommunityModule
]);

const TableRedux = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { items, loading, error } = useSelector((state) => state.issues);
  console.log("Items in store:",items);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {projectKey}=useContext(JiraIssueContext);

  const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const issueTypeOptions = ['Bug', 'Task'];

  useEffect(() => {
    if (projectKey) {
      dispatch(loadIssues(projectKey));
    }
  }, [projectKey]);

  const getRowClass = (params) => { 
    const rowClass = params.node.rowIndex % 2 === 0
      ? styles.alternateRow1
      : styles.alternateRow2;
    return `${rowClass} ${styles.hoverRow}`;
  };

  const handleDeleteClick = async (issueId) => {
    const confirm = window.confirm('Are you sure you want to delete this issue?');
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await deleteIssue(issueId);
      dispatch(deleteIssuefromStore(issueId));
      // dispatch(loadIssues(projectKey));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedRows({});
    dispatch(loadIssues(projectKey));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      
      console.log("editedRows",editedRows);
      await updateIssues(editedRows);
      const updatedIssuesArray = Object.values(editedRows);
      dispatch(updateIssuesInStore(updatedIssuesArray));
      alert('All updates saved!');
      setEditedRows({});
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Some updates failed.');
    } finally {
      setIsSaving(false);
    }
  };


  const columnDefs = [
    {
      headerName: t('ticketid'),
      field: 'id',
      editable: false,
      cellRenderer: (params) => (
        <NavLink to={`/issue/${params.data.id}`} className={styles.linkCell}>
          {params.value}
        </NavLink>
      ),
    },
    {
      headerName: t('type'),
      field: 'type',
      editable: editMode,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: issueTypeOptions,
      },
    },
    {
      headerName: t('title'),
      field: 'title',
      editable: editMode,
    },
    {
      headerName: t('summary'),
      field: 'summary',
      editable: editMode,
    },
    {
      headerName: t('status'),
      field: 'status',
    },
    {
      headerName: t('assignee'),
      field: 'assignee',
    },
    {
      headerName: t('created'),
      field: 'created',
    },
    {
      headerName: t('priority'),
      field: 'priority',
      editable: editMode,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: priorityOptions,
      },
    },
    {
      headerName: t('delete'),
      field: 'id',
      filter: false,
      sortable: false,
      cellRenderer: (params) => (
        <FaTrash
          onClick={() => handleDeleteClick(params.data.id)}
          style={{ cursor: 'pointer', fontSize: '12px' }}
          title="Delete"
        />
      ),
    },
  ];

  const clonedItems = useMemo(() => {
  return items.map((item) => JSON.parse(JSON.stringify(item)));
   }, [items]);

  return (
    <div className={styles.pageWrapper} style={{ position: 'relative' }}>
      <LanguageSelector />
      <div className={styles.headerSection}>
        {loading ? (
          <Skeleton height={32} width={200} style={{ marginBottom: '20px' }} />
        ) : (
          <h1 className={styles.title}>
            <center>{t('jiraTicket')}</center>
          </h1>
        )}
      </div>

      {isDeleting && <LoaderComponent message="Deleting issue..." />}
      {isSaving && <LoaderComponent message="Saving changes..." />}

      <NavLink to="/create" style={{ marginBottom: '10px', display: 'inline-block' }}>
        <ButtonStyled>{t('create')}</ButtonStyled>
      </NavLink>
      <ButtonStyled onClick={handleEdit} disabled={editMode}>
        {t('edit')}
      </ButtonStyled>

      {loading ? (
        <div style={{ marginTop: '20px' }}>
          <Skeleton
            height={40}
            count={10}
            style={{ marginBottom: '10px', borderRadius: '6px' }}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            animation="wave"
          />
        </div>
      ) : (
        <div className={`ag-theme-alpine ${styles.customGrid}`} style={{ height: 500 }}>
          <AgGridReact
            // rowData={items}
            rowData={clonedItems}
            columnDefs={columnDefs}
            defaultColDef={{
              filter: true,
              sortable: true,
              resizable: true,
            }}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            getRowClass={getRowClass}
            onGridReady={(params) => params.api.sizeColumnsToFit()}
            onCellValueChanged={(params) => {
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

export default TableRedux;
