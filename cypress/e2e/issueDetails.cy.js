describe('Issue Details Page', () => {
  it('loads the issue details and goes back', () => {
  
    // cy.intercept('GET', 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue/10068', {
    //   statusCode: 200,
    //   body: {
    //     key: 'ISSUE-10068',
    //     fields: {
    //       summary: 'Test Summary',
    //       issuetype: { name: 'Task' },
    //       status: { name: 'In Progress' },
    //       assignee: { displayName: 'Alice Smith' },
    //       priority: { name: 'Medium' },
    //       description: {
    //         content: [{ content: [{ text: 'This is a mock issue for testing.' }] }]
    //       }
    //     }
    //   }
    // }).as('getIssue');

    cy.visit('http://localhost:3000/issue/10068');

   
    // cy.wait('@getIssue');

   
    cy.contains('summary').should('exist');

    cy.contains('Back').click(); 
  });
});
