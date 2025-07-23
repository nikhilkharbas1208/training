
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import JiraReducer from './ToolKit/features/jira/JiraSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: {jira:JiraReducer}, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
