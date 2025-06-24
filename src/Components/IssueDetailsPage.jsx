// JiraIssueDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JIRA_API_TOKEN, JIRA_EMAIL } from "../constants/UrlConstants";
import styles from './common/JiraIssueDetails.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const JiraIssueDetails = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(`/rest/api/3/issue/${issueId}`, {
          headers: {
            Authorization: `Basic ${auth}`,
            Accept: "application/json",
          },
        });
        setIssue(response.data);
      } catch (error) {
        console.error("Failed to fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [issueId]);


  return (
     <div className={styles.wrapper}>
        {loading ? (
   <Skeleton
    height={300} 
    width={600}  
    borderRadius={8}
    animation = "wave"
    style={{ margin: "100px auto" }}
  />
    ) : (
        <div className={styles.card}>
        <h2 className={styles.title}>Issue: {issue.key}</h2>
        <p className={styles.field}><span className={styles.label}>Summary:</span> <span className={styles.value}>{issue.fields.summary}</span></p>
        <p className={styles.field}><span className={styles.label}>Type:</span> <span className={styles.value}>{issue.fields.issuetype.name}</span></p>
        <p className={styles.field}><span className={styles.label}>Status:</span> <span className={styles.value}>{issue.fields.status.name}</span></p>
        <p className={styles.field}><span className={styles.label}>Assignee:</span> <span className={styles.value}>{issue.fields.assignee?.displayName || "Unassigned"}</span></p>
        <p className={styles.field}><span className={styles.label}>Priority:</span> <span className={styles.value}>{issue.fields.priority?.name || "None"}</span></p>
        <p className={styles.field}><span className={styles.label}>Description:</span><br /><span className={styles.value}>{issue.fields.description?.content?.[0]?.content?.[0]?.text || 'No description'}</span></p>
        <button className={styles.backButton} onClick={() => navigate('/')}>Back</button>
      </div>
      )}
    </div>
  );
};

export default JiraIssueDetails;
