export const data = [{
          fields: {
            project: { key: 'projectKey1' },
            summary:'summary1',
            description: {
              type: 'doc',
              version: 1,
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'description1' }] }
              ]
            },
            issuetype: { name: 'issueType1' }
          },
          key: 'issueKey1'
        },
        {
          fields: {
            project: { key: 'projectKey2' },
            summary:'summary2',
            description: {
              type: 'doc',
              version: 1,
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: 'description2' }] }
              ]
            },
            issuetype: { name: 'issueType2' }
          },
          key: 'issueKey2'
        }
]

