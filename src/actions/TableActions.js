export function setTableRowData(data) {
  return (dispatch, getState) => {
    return dispatch({ type: data.type, payload: data.payload });
  };
}
