import React, { useReducer } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import getTableReducer, { initialState } from "../reducers/TableReducer";

const Table2Component = (props) => {
  const [tableState, tableDispatch] = useReducer(getTableReducer, {
    ...initialState,
    count: initialState.rows.length,
  });
  console.log("tableState::", tableState);

  const handleOnClick = () => {
    tableDispatch({
      type: "SET_TABLE_ROWS",
      payload: [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
      ],
    });
  };

  return (
    <>
      <Typography>Functional Component</Typography>

      <Button onClick={handleOnClick}>Set Rows</Button>
      <DataGrid
        rows={tableState.rows}
        columns={tableState.columns}
        initialState={{ pagination: tableState.paginationModel }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </>
  );
};
export default Table2Component;
