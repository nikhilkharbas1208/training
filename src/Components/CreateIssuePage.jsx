// CreateIssuePage.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { JIRA_API_TOKEN, JIRA_EMAIL } from '../constants/UrlConstants';
import styles from './common/CreateIssueForm.module.css';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import LoaderComponent from './common/LoaderComponent';
import { createIssue } from '../services/JiraService';

const CreateIssuePage = () => {
  const [summary, setSummary] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshIssues } = useContext(JiraIssuesContext);

  const auth = btoa(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
    const formData = {
      summary,
      customTitle,
      description,
      issueType,
      priority,
    };
    await createIssue(formData);
    refreshIssues();
    navigate('/');
  } catch (error) {
    console.error('Issue creation failed:', error);
    alert('Failed to create issue');
  } finally {
    setLoading(false);
  }
};

return (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <h2 className={styles.title}>Create New Jira Issue</h2>
      {loading && <LoaderComponent message="Creating issue..." />}
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          required
        />

        <label className={styles.label}>Issue Type</label>
        <select
          className={styles.input}
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
        >
          <option>Task</option>
          <option>Bug</option>
        </select>

        <label className={styles.label}>Summary</label>
        <input
          className={styles.input}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />

        <label className={styles.label}>Priority</label>
        <select
          className={styles.input}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Highest</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
          <option>Lowest</option>
        </select>

        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.button} type="submit" disabled={loading}>
            Create
          </button>
          <button
            className={styles.cancel}
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default CreateIssuePage;
