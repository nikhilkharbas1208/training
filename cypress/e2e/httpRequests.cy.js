

describe("Http Request", () => {

    it("GET Call", () => {
        cy.request('GET', 'https://vaishnavishinde425.atlassian.net/rest/api/3/search')
            .its('status')
            .should('equal', 200);
    })

    it("Minimal POST Call", () => {
        cy.request({
            method: 'POST',
            url: 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue',
            headers: {
      'Authorization': `Basic ${Cypress.env('Cypress_BASIC_AUTH')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
               body: {
      fields: {
        project: { key: 'PRAC' },
        summary: 'Issue created from Cypress test',
        issuetype: { name: 'Task' },
        priority: { name: 'High' },
        description: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'Created via Cypress test using Basic Auth.'
            }]
          }]
        }
      }
    },
            failOnStatusCode: false
        }).then((res) => {
            cy.log('Response status:', res.status);
            cy.log('Body:', JSON.stringify(res.body));
        });
    });

    it("POST Call to create Jira issue", () => {
  cy.request({
    method: 'POST',
    url: 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue',
    headers: {
      'Authorization': `Basic ${Cypress.env('Cypress_BASIC_AUTH')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      fields: {
        project: { key: 'PRAC' },
        summary: 'Issue created from Cypress test',
        issuetype: { name: 'Task' },
        priority: { name: 'High' },
        description: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{
              type: 'text',
              text: 'Created via Cypress test using Basic Auth.'
            }]
          }]
        }
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
    cy.log('Issue created with key:', response.body.key);
  });
});


    //     it("POST Call", () => {
    //         cy.log(`Email: ${Cypress.env('Cypress_JIRA_EMAIL')}`);
    // cy.log(`Token length: ${Cypress.env('Cypress_JIRA_API_TOKEN')?.length}`);
    //         cy.request({
    //             method: 'POST',
    //             url: 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue',
    //             auth: {
    //                 username: Cypress.env('Cypress_JIRA_EMAIL'),
    //                 password: Cypress.env('Cypress_JIRA_API_TOKEN')
    //             },
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: {


    //                 "fields": {
    //                     "project": {
    //                         "key": "PRAC"
    //                     },
    //                     "summary": "Hello this is just to test cypress",
    //                     "customfield_10068": "test cypress",
    //                     "description": {
    //                         "type": "doc",
    //                         "version": 1,
    //                         "content": [
    //                             {
    //                                 "type": "paragraph",
    //                                 "content": [
    //                                     {
    //                                         "text": "This is a test issue to demonstrate Jira API",
    //                                         "type": "text"
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     },
    //                     "issuetype": {
    //                         "name": "Task"
    //                     },
    //                     "priority": {
    //                         "name": "High"
    //                     }

    //                 }
    //             }
    //         }).then((response) => {
    //       expect(response.status).to.eq(201); // ✅ Success response for creating an issue
    //       cy.log('Created issue ID:', response.body.key); // Optional: log the issue key
    //     });
    //         // .its('status')
    //         // .should('equal', '201');
    //     })

    // it("Delete Call", () => {
    //     cy.intercept('Delete', 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue/PRAC-45').as('deleteIssue');
    //     cy.wait('@deleteIssue').its('response.statusCode').should('eq', 204);

    // })

    // it("PUT Call", () => {
    //     cy.intercept('Put', 'https://vaishnavishinde425.atlassian.net/rest/api/3/issue/PRAC-45',
    //         {body: {


    //             "fields": {
    //                 "project": {
    //                     "key": "PRAC"
    //                 },
    //                 "summary": "Testxfghpodgjfdfan",
    //                 "customfield_10068": "Tdgfdg Postman",
    //                 "description": {
    //                     "type": "doc",
    //                     "version": 1,
    //                     "content": [
    //                         {
    //                             "type": "paragraph",
    //                             "content": [
    //                                 {
    //                                     "text": "This is a test issue to dfgdfg Jira API",
    //                                     "type": "text"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 "issuetype": {
    //                     "name": "Bug"
    //                 },
    //                 "priority": {
    //                     "name": "Low"
    //                 }

    //         }
    //     }} 
    //      )

    // })
})

