import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../features/jiraIssueSlice';
export const Store = configureStore({
  reducer: {
    issues: issuesReducer,
  },
});
