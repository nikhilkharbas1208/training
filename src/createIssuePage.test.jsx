jest.mock('./API/JiraAxios', () => {
  return {
    default: {
      interceptors: {
        request: {
          use: jest.fn(),
        },
      },
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    },
  };
});
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    NavLink: ({ children, to }) => <a href={to}>{children}</a>,
    useNavigate: () => jest.fn(),
  };
});
jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }) => children,
}));


// Mock the createIssue API call
jest.mock('./services/JiraService', () => ({
  createIssue: jest.fn(),
}));

// Mock react-router-dom's useNavigate hook
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});


import CreateIssuePage from "./components/CreateIssuePage"
import { JiraIssueContext } from "./App";
import { JiraIssuesProvider } from "./context/JiraIssuesContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as JiraService from './services/JiraService';


const contextValue = { projectKey: 'TEST123' };

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <JiraIssueContext.Provider value={contextValue}>
      <JiraIssuesProvider projectKey="TEST123">
        <BrowserRouter>{children}</BrowserRouter>
      </JiraIssuesProvider>
    </JiraIssueContext.Provider>
  </Provider>
);

describe('CreateIssuePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(<CreateIssuePage />, { wrapper: Wrapper });

    expect(screen.getByRole('heading', { name: /create new jira issue/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /IssueType/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /priority/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('submits the form and navigates after successful creation', async () => {
    JiraService.createIssue.mockResolvedValueOnce({});

    render(<CreateIssuePage />, { wrapper: Wrapper });

    
    const titleInput = screen.getByRole('textbox', { name: /Title/i });
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: 'My Test Title' } });

    
    const summaryInput = screen.getByRole('textbox', { name: /summary/i });
  expect(summaryInput).toBeInTheDocument();

  const descriptionInput = screen.getByRole('textbox', { name: /description/i });
  expect(descriptionInput).toBeInTheDocument();

  
  const issueTypeSelect = screen.getByRole('combobox', { name: /IssueType/i });
  expect(issueTypeSelect).toBeInTheDocument();

  
  const prioritySelect = screen.getByRole('combobox', { name: /priority/i });
  expect(prioritySelect).toBeInTheDocument();

  // Fill inputs
 
  fireEvent.change(summaryInput, { target: { value: 'Test Summary' } });
  fireEvent.change(descriptionInput, { target: { value: 'This is a test description' } });
  fireEvent.change(issueTypeSelect, { target: { value: 'Bug' } });
  fireEvent.change(prioritySelect, { target: { value: 'High' } });

   

    // Submit form
    userEvent.click(screen.getByRole('button', { name: /create/i }));

    // Wait for API call
    await waitFor(() => expect(JiraService.createIssue).toHaveBeenCalledTimes(1));

    // Check API call 
    expect(JiraService.createIssue).toHaveBeenCalledWith({
      summary: 'Test Summary',
      customTitle: 'My Test Title',
      description: 'This is a test description',
      issueType: 'Bug',
      priority: 'High',
    });

    // Check navigation 
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'));

  });

  test('cancel button navigates back', () => {
    render(<CreateIssuePage />, { wrapper: Wrapper });

    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
