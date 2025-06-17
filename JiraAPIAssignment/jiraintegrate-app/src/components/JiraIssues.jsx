import React, { useEffect, useState } from "react";
import { fetchIssues } from "../API/JiraService";

const JiraIssues = ({ projectKey }) => {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await fetchIssues(projectKey);
        console.log("data",data);
        console.log("data.issues",data.issues);
        setIssues(data.issues);
      } catch (err) {
        setError(err.message);
      }
    };

    loadIssues();
  }, [projectKey]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Jira Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.key}: {issue.fields.summary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JiraIssues;
