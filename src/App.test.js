import React from 'react';
import { render, screen,waitFor } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './TestUtils';
import jiraContext from './JiraContext'
import CreateIssue from './JiraIntegrate/CreateIssue';
import DisplayData from './JiraIntegrate/DataDisplay';
import IssueDetails from './JiraIntegrate/IssueDetails';
import EditIssue from './JiraIntegrate/EditIssue';
import axios from 'axios';
import { BrowserRouter } from 'react-router';
import { testdata } from './TestData';



 export const mockContext = { userData: { auth: 'dummy' } };
 export const initialTokens = testdata;

 jest.mock('axios');
test('renders App', async() => {

   axios.get.mockResolvedValue({ data: { issues: [] } });
   
      renderWithProviders(
          <jiraContext.Provider value={mockContext}>
            <App />
          </jiraContext.Provider>,
          {
            preloadedState: {
               jira: { tokens: initialTokens, loading: false, error: null }
            },
          }
        );

        await waitFor(() => {
          expect(screen.getByText('Integrated Jira with ReactJS')).toBeInTheDocument();
        });

});


test('create issue component',async()=>{
        render(
      <jiraContext.Provider value={mockContext}>
        <CreateIssue />
      </jiraContext.Provider>
  );

  const heading = await screen.findByRole('heading', { name: /create issue/i });
  expect(heading).toBeInTheDocument();
        
})

test('edit issue component',async()=>{
 renderWithProviders(
          <jiraContext.Provider value={mockContext}>
            <EditIssue />
          </jiraContext.Provider>,
          {
            preloadedState: {
               jira: { tokens: initialTokens, loading: false, error: null }
            },
          }
        );
     const heading = await screen.findByRole('heading', { name: /Update Issue/i });
     expect(heading).toBeInTheDocument();
        
    
})
test('issue details component',async()=>{
         renderWithProviders(
          <jiraContext.Provider value={mockContext}>
            <IssueDetails />
          </jiraContext.Provider>,
          {
            preloadedState: {
               jira: { tokens: initialTokens, loading: false, error: null }
            },
          }
        );
     const heading = await screen.findByRole('heading', { name: /Issue Details/i });
     expect(heading).toBeInTheDocument();
})

test('display data component',async()=>{
           
          const mockContextWithData = { userData: { auth: 'dummy' },
            datas : { current: { data: { issues: testdata } } }
          };
          renderWithProviders( 
          <jiraContext.Provider value={mockContextWithData}>
           <BrowserRouter>
            <DisplayData   />
           </BrowserRouter>
          </jiraContext.Provider>,
           {
            preloadedState: {
               jira: { tokens: initialTokens, loading: false, error: null }
            },
          }
         )
      const button = await screen.findByTitle('createIssue');
      expect(button).toBeInTheDocument();
    
})

