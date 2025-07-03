import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './common/CreateIssueForm.module.css';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import LoaderComponent from './common/LoaderComponent';
import { createIssue } from '../services/JiraService';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addIssue, addIssueToStore, loadIssues } from '../features/jiraIssueSlice';

const CreateIssuePage = () => {
  const [summary, setSummary] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState('Task');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { projectKey } = useContext(JiraIssuesContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { refreshIssues } = useContext(JiraIssuesContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newIssue = {
        id: Date.now().toString(), 
        key: `LOCAL-${Math.floor(Math.random() * 10000)}`, 
        fields: {
          summary: summary, 
          customfield_10068: customTitle, 
          description: {
            content: [
              {
                content: [
                  {
                    text: description,
                  },
                ],
              },
            ],
          },
          priority: {
            name: priority,
          },
          issuetype: {
            name: issueType, 
          },
          status: {
            name: 'To Do',
          },
          assignee: {
            displayName: 'Unassigned',
          },
          created: new Date().toISOString(),
        },
      };


      // dispatch(addIssue(newIssue));
      // navigate('/');
      const formData = {
        summary,
        customTitle,
        description,
        issueType,
        priority,
      };
      const result = await dispatch(addIssue(formData)).unwrap(); // wait for the thunk to resolve
      console.log("New issue created:", result);
      // await createIssue(formData);
      // refreshIssues();
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
        <h2 className={styles.title}>{t('createNewJiraIssue')}</h2>
        {loading && <LoaderComponent message="Creating issue..." />}
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>{t('title')}</label>
          <input
            className={styles.input}
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            required
          />

          <label className={styles.label}>{t('issue')}{t('type')}</label>
          <select
            className={styles.input}
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option>Task</option>
            <option>Bug</option>
          </select>

          <label className={styles.label}>{t('summary')}</label>
          <input
            className={styles.input}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          <label className={styles.label}>{t('priority')}</label>
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

          <label className={styles.label}>{t('description')}</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.actions}>
            <button className={styles.button} type="submit" disabled={loading}>
              {t('create')}
            </button>
            <button
              className={styles.cancel}
              type="button"
              onClick={() => navigate('/')}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssuePage;
