// JiraIssueDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JIRA_API_TOKEN, JIRA_EMAIL } from "../constants/UrlConstants";
import styles from './common/JiraIssueDetails.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTranslation } from 'react-i18next';
import JiraIssueFetcher from "./IssueFetcher";
import WithTheme from "./WithTheme";
import IssueDetailsSkeleton from "./common/IssueDetailsSkeleton";

const JiraIssueDetails = ({ theme }) => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const [issue, setIssue] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);

  // useEffect(() => {
  //   const fetchIssue = async () => {
  //     try {
  //       const response = await axios.get(`/rest/api/3/issue/${issueId}`, {
  //         headers: {
  //           Authorization: `Basic ${auth}`,
  //           Accept: "application/json",
  //         },
  //       });
  //       setIssue(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch issue:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchIssue();
  // }, [issueId]);

  // const wrapperClass = `${styles.wrapper} ${theme === 'dark' ? styles.darkCard : styles.lightCard}`;

  return (
    <div className={styles.wrapper} style={{
    backgroundColor: theme === 'dark' ? '#2e3031' : '#e6f0ff',
    color: theme === 'dark' ? '#fff' : '#000'
  }}>
      <JiraIssueFetcher issueId={issueId} render={({ issue, loading }) => (
        loading ? (
          // <Skeleton
          //   height={300}
          //   width={600}
          //   borderRadius={8}
          //   animation="wave"
          //   style={{ margin: "100px auto" }}
          // />
          <IssueDetailsSkeleton/>
        ) : (
          <div className={styles.card}>
            <h2 className={styles.title}>{t('issue')}: {issue.key}</h2>
            <p className={styles.field}><span className={styles.label}>{t('summary')}:</span> <span className={styles.value}>{issue.fields.summary}</span></p>
            <p className={styles.field}><span className={styles.label}>{t('type')}:</span> <span className={styles.value}>{issue.fields.issuetype.name}</span></p>
            <p className={styles.field}><span className={styles.label}>{t('status')}:</span> <span className={styles.value}>{issue.fields.status.name}</span></p>
            <p className={styles.field}><span className={styles.label}>{t('assignee')}:</span> <span className={styles.value}>{issue.fields.assignee?.displayName || "Unassigned"}</span></p>
            <p className={styles.field}><span className={styles.label}>{t('priority')}:</span> <span className={styles.value}>{issue.fields.priority.name}</span></p>
            <p className={styles.field}><span className={styles.label}>{t('description')}:</span><br /><span className={styles.value}>{issue.fields.description.content?.[0]?.content?.[0]?.text || 'No description'}</span></p>
            <button className={styles.backButton} onClick={() => navigate(-1)}>{t('back')}</button>
          </div>
        )
      )} />

    </div>
  );
};

export default WithTheme(JiraIssueDetails);
