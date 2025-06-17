import React, { createContext, useState, useEffect } from 'react';
import { fetchIssues } from '../API/JiraService';

export const JiraIssuesContext = createContext();

export const JiraIssuesProvider = ({ projectKey, children }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const loadIssues = async () => {
      const data = await fetchIssues(projectKey);
      setIssues(data.issues);
    };

    if (projectKey) {
      loadIssues();
    }
  }, [projectKey]);

  return (
    <JiraIssuesContext.Provider value={{ issues }}>
      {children}
    </JiraIssuesContext.Provider>
  );
};
