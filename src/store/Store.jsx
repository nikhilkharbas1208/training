import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/jiraIssueSlice';
export const store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
