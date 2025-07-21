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
import ButtonStyled from './common/ButtonStyledComponent';
import styles from './common/JiraTableTest.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LoaderComponent from './common/LoaderComponent';
import { deleteIssue, updateIssues } from '../services/JiraService';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelectorComponent';
import { JiraIssueContext } from '../App';
import { getJiraColumnDefs } from './getJiraColumns';
import { FiRefreshCw } from 'react-icons/fi';
import WithTheme from './WithTheme';

ModuleRegistry.registerModules([
  AllCommunityModule
]);

const TableComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { items, loading } = useSelector((state) => state.issues);
  console.log("Items in store:", items);
  const [editMode, setEditMode] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { projectKey } = useContext(JiraIssueContext);


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
      //dispatch(deleteIssuefromStore(issueId));
      dispatch(loadIssues(projectKey));
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

      console.log("editedRows", editedRows);
      await updateIssues(editedRows);
      // const updatedIssuesArray = Object.values(editedRows);
      // dispatch(updateIssuesInStore(updatedIssuesArray));
      dispatch(loadIssues(projectKey));
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

  const columnDefs = getJiraColumnDefs({  t,  editMode, handleDeleteClick,});

  const mItems = useMemo(() => {
    return items.map((item) => JSON.parse(JSON.stringify(item)));
  }, [items]);

  
  //   if (Math.random() > 0.5) {
  //   throw new Error("Test Error Boundary");
  // }
  return (
    // css modules 
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

      {/* common loader */}
      {isDeleting && <LoaderComponent message="Deleting issue..." />}
      {isSaving && <LoaderComponent message="Saving changes..." />}

      
      <NavLink to="/create" style={{ marginBottom: '10px', display: 'inline-block' }}>
       {/* Styled component */}
        <ButtonStyled>{t('create')}</ButtonStyled>
      </NavLink>
      <ButtonStyled onClick={handleEdit} disabled={editMode}>
        {t('edit')}
      </ButtonStyled>
      <NavLink to="/graph" style={{ marginBottom: '10px', display: 'inline-block' }}>
       {/* Styled component */}
        <ButtonStyled>{t('graph')}</ButtonStyled>
      </NavLink>
      <ButtonStyled onClick={() => dispatch(loadIssues(projectKey))} style={{ marginBottom: '10px', display: 'inline-block',  }}>
        <FiRefreshCw style={{ fontSize: '12px' }} />
      </ButtonStyled>


      {loading ? (
        <div style={{ marginTop: '20px' }}>
          {/* show skeleton */}
          <Skeleton  height={40}  count={10}  style={{ marginBottom: '10px', borderRadius: '6px' }}  baseColor="#e0e0e0"  highlightColor="#f5f5f5"  animation="wave"/>
        </div>
      ) : (
        <div className={`ag-theme-alpine ${styles.customGrid}`} style={{ height: 500 }}>
          <AgGridReact  rowData={mItems}  columnDefs={columnDefs} defaultColDef={{  filter: true,  sortable: true, resizable: true,}}
            pagination={true}  paginationPageSize={10}  domLayout="autoHeight"  getRowClass={getRowClass}
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

      <div style={{  position: 'fixed', bottom: '20px', right: '20px',  display: 'flex', justifyContent: 'flex-end',}}>
        <ButtonStyled  onClick={handleSave} disabled={!editMode || Object.keys(editedRows).length === 0}>
          {t('save')}
        </ButtonStyled>
        <ButtonStyled onClick={handleCancel} style={{ marginLeft: '10px' }} disabled={!editMode}>
          {t('cancel')}
        </ButtonStyled>
      </div>
    </div>
  );
};

export default WithTheme(TableComponent);
