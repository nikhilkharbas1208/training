import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button } from 'semantic-ui-react';

export default function RowEditingGrid() {
  const [rowData, setRowData] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', price: 30000 },
    { id: 2, make: 'Ford', model: 'F-150', price: 45000 },
    { id: 3, make: 'Tesla', model: 'Model 3', price: 65000 },
  ]);
console.log("in rowedit function")
  const gridApiRef = useRef();

  const onGridReady = params => {
    gridApiRef.current = params.api;
    console.log("onGridReady   function",gridApiRef.current )

  };

  const startRowEditing = params => {
    const firstEditableCol = params.columnApi.getAllColumns()
      .find(col => col.getColDef().editable);
    if (!firstEditableCol) return;

    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      colKey: firstEditableCol.getColId(),
    });
        console.log("startRowEditing   function",gridApiRef.current )

  };

  const stopRowEditing = (params, cancel) => {
    params.api.stopEditing(cancel);
    console.log("stopRowEditing   function",gridApiRef.current )
  };

  const actionCellRenderer = params => {
    const editingCell = params.api.getEditingCells()
      .some(cell => cell.rowIndex === params.node.rowIndex);
 console.log("stopRowEditing   function",gridApiRef.current )
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        
        {editingCell ? (
          <>
            <Button size="small" onClick={() => stopRowEditing(params, false)}>
              Update
            </Button>
            <Button size="small" onClick={() => stopRowEditing(params, true)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button size="small" onClick={() => startRowEditing(params)}>
            Edit
          </Button>
        )}
      </div>   
      
    );
  };

  const columnDefs = [
    { field: 'make', editable: true },
    { field: 'model', editable: true },
    {
      field: 'price',
      editable: true,
      valueParser: params => Number(params.newValue),
      valueSetter: params => {
        const v = Number(params.newValue);
        if (isNaN(v)) return false;
        params.data.price = v;
        return true;
      },
    },
    {
      headerName: 'Actions',
      colId: 'actions',
      cellRenderer: actionCellRenderer,
      editable: false,
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 700 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1, resizable: true }}
        editType="fullRow"
        frameworkComponents={{ actionCellRenderer: actionCellRenderer }}
        onGridReady={onGridReady}
      />
    </div>
  );
}
