// // JiraService.js
// import axios from './Interceptor';

// export const fetchIssues = async (projectKey) => {
//   const response = await axios.get(`/rest/api/3/search?jql=project=${projectKey}`);
//   return response.data;
// };
import axios, { Axios } from "axios";
import { JIRA_API_TOKEN, JIRA_EMAIL } from "../constants/UrlConstants";
import jiraAxios from "../API/JiraAxios";

const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);


export const fetchIssues = async (projectKey) => {
  try {
    const response = await jiraAxios.get(
      `/search?jql=project=${projectKey}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export const fetchIssueById = async (issueId) => {
  try {
    const response = await jiraAxios.get(`issue/${issueId}`);
    console.log("fetchIssueById from services", response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch issue:", error);
    throw error;
  }

}

export const createIssue = async (props) => {
  const body = {
    fields: {
      project: { key: 'PRAC' },
      summary: props.summary,
      customfield_10068: props.customTitle,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: props.description,
              },
            ],
          },
        ],
      },
      issuetype: { name: props.issueType },
      priority: { name: props.priority },
    },
  };

  try {
    const response = await axios.post('/rest/api/3/issue', body, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Issue creation failed:", error);
    throw error;
  }
};

export const deleteIssue = async (issueId) => {
  try {
    const response = await jiraAxios.delete(`/issue/${issueId}`);
    return response.status === 204;
  } catch (err) {
    console.error("Failed to delete issue:", err);
    alert("Failed to delete issue");
    return false;
  }
};

const getTransitionId = async (issueId, targetStatus) => {
  const res = await jiraAxios.get(`/issue/${issueId}/transitions`);
  const transitions = res.data.transitions;
  const transition = transitions.find(t => t.to.name === targetStatus);
  return transition?.id || null;
};

export const updateIssues = async (editedRows) => {

  try {
    for (const id in editedRows) {
      const row = editedRows[id];
      // const proxy = "https://cors-anywhere.herokuapp.com/";
      // const proxy = "http://localhost:8080/";
      await jiraAxios.put(
        `/issue/${id}`,
        {
          fields: {
            summary: row.summary,
            customfield_10068: row.title,
            priority: { name: row.priority },
            issuetype: { name: row.type },
          }
        },
      );
      if (row.status) {
        console.log(row.status);
        const transitionId = await getTransitionId(id, row.status);
        console.log(transitionId);

        if (transitionId) {
          const transitionBody = {
            transition: { id: transitionId }
          }

          await axios.post(`/rest/api/3/issue/${id}/transitions`, transitionBody, {
            headers: {
              Authorization: `Basic ${auth}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
        }
      }
    }
    return true;
  } catch (err) {
    console.error("Failed to update issues:", err);
    throw err;
  }
};

