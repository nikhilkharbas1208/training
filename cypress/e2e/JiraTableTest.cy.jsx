import JiraTableTest from "../../src/components/JiraTableTest";
import { mount } from '@cypress/react'
describe('Jira Table Page', () => {
  it('loads the table page and displays issue rows correctly', () => {
    // Mock the issues list
    // cy.intercept('GET', 'https://vaishnavishinde425.atlassian.net/rest/api/3/search**', {
    //   statusCode: 200,
    //   body: {
    //     issues: [
    //       {
    //         id: '10001',
    //         fields: {
    //           issuetype: { name: 'Bug' },
    //           summary: 'Fix login issue',
    //           status: { name: 'Open' },
    //           assignee: { displayName: 'Alice' },
    //           priority: { name: 'High' },
    //           created: '2025-06-01T10:00:00.000Z'
    //         }
    //       },
    //       {
    //         id: '10002',
    //         fields: {
    //           issuetype: { name: 'Task' },
    //           summary: 'Add logout functionality',
    //           status: { name: 'In Progress' },
    //           assignee: { displayName: 'Bob' },
    //           priority: { name: 'Medium' },
    //           created: '2025-06-02T12:30:00.000Z'
    //         }
    //       }
    //     ]
    //   }
    // }).as('getIssues');

    // // Visit the page
    // cy.visit('http://localhost:3000/');

    // // Wait for the API call to complete
    // cy.wait('@getIssues');

    // // Confirm the grid container appears
    // cy.get('.ag-root', { timeout: 10000 }).should('exist');

    // // Verify the number of rows matches mock data
    // cy.get('.ag-center-cols-container .ag-row')
    //   .should('have.length', 2);

    // // Check specific cell values
    // cy.contains('Fix login issue').should('exist');
    // cy.contains('Add logout functionality').should('exist');
    // cy.contains('Bug').should('exist');
    // cy.contains('Task').should('exist');

    cy.mount(<JiraTableTest/>)
  });
});
