import React, { createContext, useState, useEffect } from 'react';
import { fetchIssues } from '../API/JiraService';

export const JiraIssuesContext = createContext();

export const JiraIssuesProvider = ({ projectKey, children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setloading] = useState([]);
  const [error, seterror] = useState([]);
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


  useEffect(() => {
    
    if (projectKey) {
      loadIssues();
    }
  }, [projectKey]);

  return (
    <JiraIssuesContext.Provider value={{ issues, loading, error, refreshIssues:loadIssues}}>
      {children}
    </JiraIssuesContext.Provider>
  );
};
