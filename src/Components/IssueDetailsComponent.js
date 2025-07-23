import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import withFetchIssue from '../Helpers/FetchIssue';
import styles from '../Components/IssueDetails.module.css';
//import { AppContainer } from '../StyleComponents/Container.style';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'react-i18next';


let data1;
const IssueDetails = ({data}) => {
      const {id}= useParams()
      data1 = id
      const{t} = useTranslation("global")
    const {projectKey,issueType,issueKey,summary,description,loading} = data
    // console.log(projectKey,"you are in issuedetails",id)
  return (
    
    <center>
       <div className={styles.wrapper}>
          {
              loading ? <Skeleton count={5} height={40}/> :
            <div>
                  <h3 className={styles.title}>{t("Issue Details")} {id}</h3>
                  <p className={styles.field}>
                    <span className={styles.label}>{t("Project Key")}</span> 
                    <span className={styles.data}>{projectKey}</span>
                  </p>
                  <p className={styles.field}>
                    <span className={styles.label}>{t("Issue Type")}</span> 
                    <span className={styles.data}>{issueType}</span>
                  </p>
                  <p className={styles.field}>
                    <span className={styles.label}>{t("Issue Key")}</span> 
                    <span className={styles.data}>{issueKey}</span>
                  </p>
                  <p className={styles.field}>
                    <span className={styles.label}>{t("Summary")}</span> 
                    <span className={styles.data}>{summary}</span>
                  </p>
                  <p className={styles.field}>
                    <span className={styles.label}>{t("Description")}</span> 
                    <span className={styles.data}>{description}</span>
                  </p>
          </div>
       }
    </div>
    </center>
   
  )

  
}

const data = ()=>{return data1}

export default withFetchIssue(IssueDetails,data)