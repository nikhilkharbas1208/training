import { render, screen, waitFor } from '@testing-library/react';

import { AgGridReact } from 'ag-grid-react';
import { renderWithProviders } from './TestUtils';
import { initialTokens, mockContext } from './App.test';
import JiraContext from './JiraContext';
import { BrowserRouter } from 'react-router';
import JiraLogin from './JiraIntegrate/JiraLogin';

jest.mock('ag-grid-react', () => ({
  AgGridReact: ({ rowData, columnDefs }) => (
    <div data-testid="ag-grid">
      {rowData.map((row, i) => (
        <div key={i}>
          {columnDefs.map(col => (
            <span key={col.field} data-testid={`cell-${col.field}-${i}`}>
              {row[col.field]}
            </span>
          ))}
        </div>
      ))}
    </div>
  ),
}));

test('renders data inside the grid when loading is false', async () => {
  const rows = [
    { id: 1, name: 'JIR-12' },
    { id: 2, name: 'JIR-14' },
  ];
  const cols = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ];

  renderWithProviders(
    <JiraContext.Provider value={mockContext}>
      <BrowserRouter>
      <JiraLogin render={(rowData, colDefs, columnStyle, isLoading) =>
        isLoading ? (
          <div data-testid="skeleton" />
        ) : (
          <div data-testid="grid-wrapper">
            <AgGridReact rowData={rows} columnDefs={cols} />
          </div>
        )
      } />
      </BrowserRouter>
    </JiraContext.Provider>,
    {
      preloadedState: {
        jira: { tokens: initialTokens, loading: false, error: null },
      },
    }
  );

 
//   expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();

 
  await waitFor(() => {
    expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();
  });

  expect(screen.getByTestId('cell-name-0')).toHaveTextContent('JIR-12');
  expect(screen.getByTestId('cell-name-1')).toHaveTextContent( 'JIR-14');

  expect(screen.getByTestId('cell-id-0')).toHaveTextContent('1');
  expect(screen.getByTestId('cell-id-1')).toHaveTextContent('2');
});
