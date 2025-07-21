import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, TextArea, Dropdown, Button, Segment, Container, Header, Loader } from 'semantic-ui-react';
import { JiraIssuesContext } from '../context/JiraIssuesContext';
import { createIssue } from '../services/JiraService';
import { useTranslation } from 'react-i18next';
import LoaderComponent from './common/LoaderComponent';
import Form from '@rjsf/semantic-ui';
import validator from '@rjsf/validator-ajv8';

// const issueTypes = [
//   { key: 'task', text: 'Task', value: 'Task' },
//   { key: 'bug', text: 'Bug', value: 'Bug' },
// ];

// const priorities = [
//   { key: 'highest', text: 'Highest', value: 'Highest' },
//   { key: 'high', text: 'High', value: 'High' },
//   { key: 'medium', text: 'Medium', value: 'Medium' },
//   { key: 'low', text: 'Low', value: 'Low' },
//   { key: 'lowest', text: 'Lowest', value: 'Lowest' },
// ];

const schema = {
  type: 'object',
  required: ['customTitle', 'summary', 'priority', 'issueType'],
  properties: {
    customTitle: {
      type: 'string',
      title: 'Title'
    },
    issueType: {
      type:'string',
      title: 'Issue Type',
      enum: ['Task', 'Bug']
    },
    summary: {type: 'string', title: 'Summary'},
    priority: {
      type: 'string',
      title: 'Priority',
      enum: ['Highest', 'High', 'Medium', 'Low', 'Lowest']
    },
    description: {type: 'string', title: 'Description'}
  }
};

const uischema = {
  description: {
    'ui:widget': 'textarea'
  }
}

const CreateIssuePage = () => {
  // const [summary, setSummary] = useState('');
  // const [customTitle, setCustomTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [issueType, setIssueType] = useState('Task');
  // const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);

  const { projectKey, refreshIssues } = useContext(JiraIssuesContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const handleSubmit = async (e) => {
  const handleSubmit = async ({formData}) => {
    // e.preventDefault();
    setLoading(true);

    try {
      // const formData = { summary, customTitle, description, issueType, priority };
      await createIssue(formData);
      navigate('/');
    } catch (error) {
      console.error('Issue creation failed:', error);
      alert('Failed to create issue');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f8fc',
  }}>
    <Container style={{ width: 500}}>
      <Segment style={{ padding: '2em' }} padded>
        <Header as="h2" textAlign="center" color="blue">
          {t('createNewJiraIssue')}
        </Header>
        {loading && <LoaderComponent message="Creating issue..." />}
        {/* <Form onSubmit={handleSubmit}>
          <Form.Field
            control={Input}
            label={t('title')}
            placeholder={t('title')}
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            required
          />

          <Form.Field
            control={Dropdown}
            label={`${t('issue')} ${t('type')}`}
            selection
            options={issueTypes}
            value={issueType}
            onChange={(e, { value }) => setIssueType(value)}
            required
          />

          <Form.Field
            control={Input}
            label={t('summary')}
            placeholder={t('summary')}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          <Form.Field
            control={Dropdown}
            label={t('priority')}
            selection
            options={priorities}
            value={priority}
            onChange={(e, { value }) => setPriority(value)}
            required
          />

          <Form.Field
            control={TextArea}
            label={t('description')}
            placeholder={t('description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button primary type="submit" disabled={loading}>
            {t('create')}
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            {t('cancel')}
          </Button>
        </Form> */}
        <Form
        schema = {schema}
        uischema = {uischema} 
        onSubmit={handleSubmit} disabled={loading} validator={validator}
        >
          <Button primary type="submit" disabled={loading}>
            {t('create')}
          </Button>
          <Button type="button" onClick={() => navigate('/')}>
            {t('cancel')}
          </Button>

        </Form>
      </Segment>
    </Container>
    </div>
  );
};

export default CreateIssuePage;
