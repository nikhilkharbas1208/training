import axios from "axios";
import { JIRA_EMAIL, JIRA_API_TOKEN, JIRA_BASE_URL } from "../constants/UrlConstants";

export const deleteIssue = async (issueId) => {
  try {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const response = await axios.delete(`${proxy}${JIRA_BASE_URL}/issue/${issueId}`, {
  headers: {
    Authorization: `Basic ${btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`)}`,
    Accept: "application/json",
  },
});
    return response.status === 204;
  } catch (err) {
    console.error("Failed to delete issue:", err);
    alert("Failed to delete issue");
    return false;
  }
};

 