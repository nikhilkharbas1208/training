// // JiraService.js
// import axios from './Interceptor';

// export const fetchIssues = async (projectKey) => {
//   const response = await axios.get(`/rest/api/3/search?jql=project=${projectKey}`);
//   return response.data;
// };
import axios from "axios";
import { JIRA_API_TOKEN, JIRA_EMAIL } from "../constants/UrlConstants";

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