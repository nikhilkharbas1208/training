import { use, useContext, useEffect, useState } from 'react';
import styles from '../Components/CreateIssue.module.css'
import { useTranslation } from 'react-i18next';
import JiraContext from '../JiraContext';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8'
import { jsonSchema, uiJsonSchema } from './CreateIssueSchema';


export default function CreateIssue() {

  const{t,i18n} = useTranslation("global")
  const changeLang = (lang)=>{
    i18n.changeLanguage(lang)
    }
  const [formData, setFormData] = useState({});
  const [projectKey, setProjectKey] = useState('');
  const [issueType, setIssueType] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);  
  const {userData} = useContext(JiraContext)
  const auth=userData.auth


  const handleSubmit = async (formData) => {
    // e.preventDefault();
    // const payload = {
    //   fields: {
    //     project: { key: projectKey },
    //     summary,
    //     description: {
    //       type: 'doc',
    //       version: 1,
    //       content: [
    //         { type: 'paragraph', content: [{ type: 'text', text: description }] }
    //       ]
    //     },
    //     issuetype: { name: issueType }
    //   }
    // };

         
          try {
            const res = await fetch('/rest/api/3/issue', {
              method: 'POST',
              headers: {  'Authorization': `Basic ${auth}`,
                  'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            });
            setResult(await res.json());
          } catch (err) {
            setResult({ error: err.message });
          }
  };
  

  return (
    <center className={styles.wrapper}>
      {/* <div>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>{t("Create Issue")}</h2>
      <label className={styles.label}>{t("Project Key")}<br/><br/>
        <input className={styles.data}value={projectKey} onChange={e => setProjectKey(e.target.value)} />
      </label><br/><br/>
      <label className={styles.label}>{t("Issue Type")}<br/><br/>
        <input className={styles.data} value={issueType} onChange={e => setIssueType(e.target.value)} />
      </label><br/><br/>
      <label className={styles.label}>{t("Summary")}<br/><br/>
        <input className={styles.data} value={summary} onChange={e => setSummary(e.target.value)} required />
      </label><br/><br/>
      <label className={styles.label}>{t("Description")}<br/><br/>
        <textarea className={styles.data} value={description} onChange={e => setDescription(e.target.value)} required />
      </label><br/><br/>
      <button className={styles.click}type="submit">{t("Create Task")}</button>

      {result && (
        <div style={{color:'#DC3545'}} >
          {result.key
            ? `Created issue ${result.key}`
            : result.errors}
        </div>
      )}
    </form>
    </div> */}
    <div style={{ margin: '2rem' }}>
      <h2>Create Issue</h2>
      <Form
        schema={jsonSchema}
        uiSchema={uiJsonSchema}
        validator={validator}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        onSubmit={({ formData }, e) => handleSubmit(formData)}//({ formData }) => console.log('Submitted:', formData)
        onError={errors => console.log('Errors:', errors)}
      >
        <button type="submit">Submit</button>
        {result && (
        <div style={{color:'#DC3545'}} >
          {result.key
            ? `Created issue ${result.key}`
            : result.errors}
        </div>
      )}
      </Form>
    </div>
    </center>
  );
}
