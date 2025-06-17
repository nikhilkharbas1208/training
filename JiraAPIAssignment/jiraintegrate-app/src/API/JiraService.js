import axios from "axios";

 const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
 const JIRA_BASE_URL = "https://vaishnavishinde425.atlassian.net/rest/api/3";
 const JIRA_EMAIL = "vaishnavishinde425@gmail.com"; 
 REMOVED;

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