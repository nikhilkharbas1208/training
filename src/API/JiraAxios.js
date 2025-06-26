
import axios from "axios";
import { JIRA_EMAIL, JIRA_API_TOKEN, JIRA_BASE_URL } from "../constants/UrlConstants";

const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);
const proxy = "http://localhost:8080/";

const jiraAxios = axios.create({
  baseURL: `${proxy}${JIRA_BASE_URL}`,
  headers: {
    Accept: "application/json",
  },
});

jiraAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic ${auth}`;
  return config;
});

export default jiraAxios;
