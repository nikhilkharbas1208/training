import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createIssue, fetchIssueById, fetchIssues } from '../services/JiraService';


export const loadIssues = createAsyncThunk(
  'issues/loadIssues',
  async (projectKey, thunkAPI) => {
    try {
      // const data = await fetchIssues(projectKey);

      // console.log("Fetched issues from API:", data.issues);
      // return data.issues;
      const response = await fetchIssues(projectKey);
      console.log("Fetched issues from API:", response.issues)

      const data = response.issues.map((issue) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        title: issue.fields.customfield_10068,
        status: issue.fields.status?.name,
        priority: issue.fields.priority?.name,
        type: issue.fields.issuetype?.name,
        assignee: issue.fields.assignee?.displayName || 'Unassigned',
        created: issue.fields.created,
        description: issue.fields.description?.content?.[0]?.content?.[0]?.text || '',


      }))
      console.log("data", data)
      return data;

    } catch (error) {
      console.error("Error fetching issues:", error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to load issues');
    }
  }
);


export const addIssue = createAsyncThunk(
  'issues/addIssue',
  async (formData, thunkAPI) => {
    try {
      const created = await createIssue(formData);
      const newIssue = await fetchIssueById(created.id);
      console.log("newIssue",newIssue);
      return {
        id: newIssue.id,
        key: newIssue.key,
        summary: newIssue.fields.summary,
        title: newIssue.fields.customfield_10068,
        status: newIssue.fields.status?.name,
        priority: newIssue.fields.priority?.name,
        type: newIssue.fields.issuetype?.name,
        assignee: newIssue.fields.assignee?.displayName || 'Unassigned',
        created: newIssue.fields.created,
        description: newIssue.fields.description?.content?.[0]?.content?.[0]?.text || '',
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to create issue');
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
      console.log("issue added");
    },
    deleteIssuefromStore: (state, action) => {
      const issueId = action.payload;
      state.items = state.items.filter(item => item.id !== issueId);
      console.log("issue deleted from server", issueId);
    },
    updateIssuesInStore: (state, action) => {
      const updatedIssues = action.payload;
      updatedIssues.forEach((updated) => {
        const index = state.items.findIndex(item => item.id === updated.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updated };
        }
      });
    },
    // addIssueToStore: (state, action) => {
    //   const newIssue = action.payload;
    //   state.items.push(newIssue);
    //   console.log("Added Issue to the store successfully");
    // },
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
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });

  },
});

export const { setIssue, addIssueToStore, deleteIssuefromStore, updateIssuesInStore} = jiraIssueSlice.actions;

export default jiraIssueSlice.reducer;
