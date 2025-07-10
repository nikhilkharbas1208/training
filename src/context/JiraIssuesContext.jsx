import React, { createContext, useState, useEffect } from 'react';
import { fetchIssueById, fetchIssues } from '../services/JiraService';

export const JiraIssuesContext = createContext();

export const JiraIssuesProvider = ({ projectKey, children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setloading] = useState([]);
  const [error, seterror] = useState([]);
  const [issue, setIssue] = useState([]);
  const loadIssues = async () => {
       try {
        setloading(true);
        const data = await fetchIssues(projectKey);
        setIssues(data.issues);
      } catch (err) {
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };

  //   const getIssueById = async (issueId) => {
  //   try {
  //     setloading(true);
  //     const issue = await fetchIssueById(issueId);
  //     console.log("context getIssueById",issue)
  //     return issue;
  //   } catch (err) {
  //     seterror(err.message);
  //     throw err;
  //   } finally {
  //     setloading(false);
  //   }
  // };
  const getIssueById = async (issueId) => {
  setloading(true);
  try {
    
    const existingIssue = issues.find((issue) => issue.id === issueId);
    if (existingIssue) {
      // console.log( existingIssue);
      return existingIssue;
    }
  } catch (err) {
    seterror(err.message);
    throw err;
  } finally {
    setloading(false);
  }
};



  useEffect(() => {
    
    if (projectKey) {
      loadIssues();
    }
  }, [projectKey]);

  return (
    <JiraIssuesContext.Provider value={{ issues, loading, error, refreshIssues:loadIssues, getIssueById}}>
      {children}
    </JiraIssuesContext.Provider>
  );
};
