
import { NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import styles from './common/JiraTableTest.module.css';

 const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
  const statusOptions = ['To Do', 'In Progress', 'Done', 'ON HOLD', 'IN TEST'];
  const issueTypeOptions = ['Bug', 'Task'];

export const getJiraColumnDefs = ({ t, editMode, handleDeleteClick }) => [
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
    cellEditorParams: { values: issueTypeOptions },
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
    editable: editMode,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: statusOptions, 
    },
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
    cellEditorParams: { values: priorityOptions },
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
