import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import withFetchIssue from '../Helpers/FetchIssue';

import styles from '../Components/UpdateIssue.module.css'
// '../CSSModules/UpdateIssue.module.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateJiraIssue } from '../Features/JiraSlice';
import JiraContext from '../JiraContext';



let data1;
const EditIssue = (props) => {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const {userData} = useContext(JiraContext)
    const auth=userData.auth
    const {id} = useParams()
    data1=id
    const [projectKey1, setProjectKey1] = useState('');
    const [issueType1, setIssueType1] = useState('');
    const [summary1, setSummary1] = useState('');
    const [description1, setDescription1] = useState('');
    const [result, setResult] = useState(null);
    const [issueKey1,setIssuekey1]=useState('');
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    // console.log("EditIssue",props.data.projectKey)

      const{t,i18n} = useTranslation("global")
    
      const changeLang = (lang)=>{
        i18n.changeLanguage(lang)
      }


    useEffect(()=>{
      if(props.data.projectKey){
        setDescription1(props.data.description)
        setIssueType1(props.data.issueType)
        setIssuekey1(props.data.issueKey)
        setProjectKey1(props.data.projectKey)
        setSummary1(props.data.summary)
        setLoading(false);
      } 
      // console.log("EditIssue data",props.data.description)
     
    },[props.data])
         
    if (error) return <div>Error: {error}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          fields: {
            project: { key: projectKey1 },
            summary:summary1,
            description: {
              type: 'doc',
              version: 1,
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: description1 }] }
              ]
            },
            issuetype: { name: issueType1 }
          },
          key: issueKey1
        };
  
              try {
                const res = await axios.put(`/rest/api/3/issue/${data1}`, payload,{
                   //JSON.stringify(payload),
                  // headers: {  'Authorization': `Basic ${auth}`,
                  //     'Content-Type': 'application/json' },
                  // body: JSON.stringify(payload)
                });
                console.log(res,"done api call got res");
                setResult( res);
                 dispatch(updateJiraIssue(payload))
              } catch (err) {
                setResult({ error: err.message });
                
              }
             
      };
  return (
     <center>
    <br/>
    <br/>
     <div className={styles.wrapper}>
       {//loading ? <Skeleton count={5} height={40}/> :
       <div>
      <h2 className={styles.title}>{t("Update Issue")}</h2>
        <form onSubmit={handleSubmit}>
      <label className={styles.label}>{t("Project Key")}<br/><br/>
        <input  className={styles.data} value={projectKey1} onChange={e => setProjectKey1(e.target.value)} readOnly/>
      </label><br/><br/>
      <label className={styles.label}>{t("Issue Type")}<br/><br/>
        <input  className={styles.data}  value={issueType1} onChange={e => setIssueType1(e.target.value)} readOnly/>
      </label><br/><br/>
       <label className={styles.label}>{t("Issue Key")}<br/><br/>
        <input  className={styles.data}  value={issueKey1} onChange={e => setIssuekey1(e.target.value)} readOnly />
         </label><br/><br/>
      <label className={styles.label}>{t("Summary")}<br/><br/>
        <input  className={styles.data}  value={summary1} onChange={e => setSummary1(e.target.value)}  />
      </label><br/><br/>
      <label className={styles.label}>{t("Description")}<br/><br/>
        <textarea  className={styles.data}  value={description1} onChange={e => setDescription1(e.target.value)}  />
      </label><br/><br/>
      <button className={styles.click} type="submit">{t("Update Task")}</button>

      {result && (
        <div style={{color:'#DC3545'}} >
          {result
            ? `Updated issue   Status :${result.status} updated `
            : 'not updated'}
        </div>
      )}
    </form>
    </div>}
      </div>
      
      </center>
  )
}
const data =()=>{return data1}
export default withFetchIssue(EditIssue,data)