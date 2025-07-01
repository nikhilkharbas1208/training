import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIssues } from '../services/JiraService';


export const loadIssues = createAsyncThunk(
  'issues/loadIssues',
  async (projectKey, thunkAPI) => {
    try {
      const data = await fetchIssues(projectKey);

      console.log("Fetched issues from API:", data.issues);
      return data.issues;
    } catch (error) {
      console.error("Error fetching issues:", error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to load issues');
    }
  }
);


const initialState = {
  items: [],
  loading: false,
  error: null,
};


const jiraIssueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssue: (state, action) => {
      const issue = action.payload;
      state.items = state.items.map((item) =>
        item.id === issue.id ? issue : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIssues.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIssue } = jiraIssueSlice.actions;

export default jiraIssueSlice.reducer;
