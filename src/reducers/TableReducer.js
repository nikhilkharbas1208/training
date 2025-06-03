export const initialState = {
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

const getTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TABLE_DATA": {
      return {
        ...state,
      };
    }
    case "SET_TABLE_ROWS": {
      return {
        ...state,
        rows: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
export default getTableReducer;
