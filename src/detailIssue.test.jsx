import '@testing-library/jest-dom'; // 👈 add this
import { fireEvent, render, screen } from '@testing-library/react';
import IssueDetailsPage from './components/IssueDetailsPage';
import React from 'react';

// Mocks
// Mock router and useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ issueId: 'TEST-1' }),
    useNavigate: () => mockNavigate,
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

jest.mock('./components/IssueFetcher', () => ({
  __esModule: true,
  default: ({ render }) =>
    render({
      loading: false,
      issue: {
        key: 'TEST-1',
        fields: {
          summary: 'Sample issue summary',
          issuetype: { name: 'Bug' },
          status: { name: 'To Do' },
          assignee: { displayName: 'Test User' },
          priority: { name: 'High' },
          description: {
            content: [{ content: [{ text: 'This is a test description.' }] }],
          },
        },
      },
    }),
}));

test('Issue Detail Component', () => {
  render(<IssueDetailsPage />);
  expect(screen.getByText(/Sample issue summary/i)).toBeInTheDocument();
  expect(screen.getByText(/High/i)).toBeInTheDocument();
  const backButton = screen.getByText(/back/i);
  fireEvent.click(backButton);
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});
