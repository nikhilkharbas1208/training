import React, { Component } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { store } from "../reducers/store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setTableRowData } from "../actions/TableActions";
import { Button, Typography } from "@mui/material";

export class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationModel: { page: 0, pageSize: 5 },
      rows: [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: "satate", age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
      ],
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        { field: "firstName", headerName: "First name", width: 130 },
        { field: "lastName", headerName: "Last name", width: 130 },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          width: 90,
        },
      ],
    };
  }
  componentDidMount() {
    console.log("store::", store.getState());
    console.log("this.props::", this.props);
  }
  handleOnClick = () => {
    this.props.setTableRowData({
      type: "SET_TABLE_ROWS",
      payload: [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
      ],
    });
  };
  render() {
    return (
      <>
        <Typography>Class Component</Typography>
        <Button onClick={this.handleOnClick}>Set Rows</Button>
        <DataGrid
          rows={this.props.rows}
          columns={this.props.columns}
          initialState={{ pagination: this.props.paginationModel }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  rows: state.table.rows,
  columns: state.table.columns,
  paginationModel: state.table.paginationModel,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ setTableRowData }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
