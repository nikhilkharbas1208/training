import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIssues } from '../API/JiraService';


export const loadIssues = createAsyncThunk(
  'issues/loadIssues',
  async (projectKey, thunkAPI) => {
    try {
      const data = await fetchIssues(projectKey);
      return data.issues;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const jiraIssueSlice = createSlice({
  name: 'issues',
  initialState: {
    items: [],
  },
  reducers: {},
});

export default jiraIssueSlice.reducer;
