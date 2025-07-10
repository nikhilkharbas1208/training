// __tests__/TableRedux.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './features/jiraIssueSlice';
import { JiraIssueContext } from './App';
import { JiraIssuesProvider } from './context/JiraIssuesContext';
import TableRedux from './components/TableRedux';
import userEvent from '@testing-library/user-event';
import CreateIssuePage from './components/CreateIssuePage';

// === Mocks ===
jest.mock('./API/JiraAxios', () => ({
  default: {
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    //Instead of making a real HTTP request, it returns a resolved Promise with { data: {} }.
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    NavLink: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }) => children,
}));


const contextValue = { projectKey: 'DEMO123' };

const mockIssues = [
  {
    id: '10001',
    key: 'JIRA-1',
    summary: 'Fix login issue',
    title: 'Login Bug',
    status: 'To Do',
    priority: 'High',
    type: 'Bug',
    assignee: 'Alice',
    created: '2024-06-01',
    description: 'Login fails with 401',
  },
  {
    id: '10002',
    key: 'JIRA-2',
    summary: 'Improve dashboard UI',
    title: 'Dashboard UI',
    status: 'In Progress',
    priority: 'Medium',
    type: 'Task',
    assignee: 'Bob',
    created: '2024-06-02',
    description: 'Redesign dashboard layout',
  },
];

// === Custom render function ===
const renderWithProviders = (ui, { preloadedState } = {}) => {
  const testStore = configureStore({
    reducer: { issues: issuesReducer },
    preloadedState: {
      issues: {
        items: mockIssues,
        loading: false,
        error: null,
        ...preloadedState,
      },
    },
  });

  return render(
    <Provider store={testStore}>
      <JiraIssueContext.Provider value={contextValue}>
        <JiraIssuesProvider projectKey="DEMO123">
          <BrowserRouter>            <Routes>
            <Route path="/" element={<TableRedux />} />
            <Route path="/create" element={<CreateIssuePage />} />
          </Routes>
          </BrowserRouter>
        </JiraIssuesProvider>
      </JiraIssueContext.Provider>
    </Provider>
  );
};

// === Tests ===
describe('TableRedux Component', () => {
  it('renders Jira Ticket header', async () => {
    renderWithProviders();
    expect(await screen.findByText(/jira ticket/i)).toBeInTheDocument();
  });

  it('shows Create and Edit buttons', async () => {
    renderWithProviders();
    expect(await screen.findByText(/create/i)).toBeInTheDocument();
    expect(await screen.findByText(/edit/i)).toBeInTheDocument();
  });

  it('renders issue rows from redux store', async () => {
    renderWithProviders();

    expect(await screen.findByText(/Fix login issue/i)).toBeInTheDocument();
    expect(await screen.findByText(/Login Bug/i)).toBeInTheDocument();
    expect(await screen.findByText(/Improve dashboard UI/i)).toBeInTheDocument();
    expect(await screen.findByText("Dashboard UI")).toBeInTheDocument();
  });


});
