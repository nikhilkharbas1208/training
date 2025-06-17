import axios from "axios";

// Access env variables
const CORS_PROXY = process.env.REACT_APP_CORS_PROXY;
const JIRA_BASE_URL = process.env.REACT_APP_JIRA_BASE_URL;
const JIRA_EMAIL = process.env.REACT_APP_JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.REACT_APP_JIRA_API_TOKEN;

const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);

export const fetchIssues = async (projectKey) => {
  try {
    const response = await axios.get(
      `/rest/api/3/search?jql=project=${projectKey}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: 'application/json',
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};