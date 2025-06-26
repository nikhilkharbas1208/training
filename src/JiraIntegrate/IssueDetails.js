import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import withFetchIssue from './FetchIssue';

let data1;
const IssueDetails = ({data}) => {
      const {id}= useParams()
      data1 = id
    const {projectKey,issueType,issueKey,summary,description} = data
    console.log(projectKey,"you are in issuedetails",id)
  return (
    <center>
      <div>
        <h3>IssueDetails{id}</h3>
        {/* <table style={{border:"1px solid"}}> */}
            <p><strong>Project Key </strong>{projectKey}</p>
            <p><strong>Issue Type  </strong>{issueType}</p>
            <p><strong>Issue Key   </strong>{issueKey}</p>
            <p><strong>Summary     </strong>{summary}</p>
            <p><strong>Description </strong>{description}</p>                                                 
        {/* </table> */}
      </div>
    </center>
  )

  
}

const data = ()=>{return data1}

export default withFetchIssue(IssueDetails,data)