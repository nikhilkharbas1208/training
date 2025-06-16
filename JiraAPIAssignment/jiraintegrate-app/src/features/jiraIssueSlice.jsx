import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIssues } from '../JiraService';

// Thunk to fetch issues
export const loadIssues = createAsyncThunk(
  'issues/loadIssues',
  async (projectKey, thunkAPI) => {
    try {
      const data = await fetchIssues(projectKey);
      return data.issues; // assumes fetchIssues returns { issues: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice definition
const jiraIssueSlice = createSlice({
  name: 'issues',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadIssues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadIssues.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export default jiraIssueSlice.reducer;
