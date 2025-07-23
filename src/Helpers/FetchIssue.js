import React, { Suspense, useContext, useEffect, useState } from 'react'

import axios from 'axios';
import JiraContext from '../JiraContext';



//-----------------------Function Component---------------------------------


const withFetchIssue = (Component,data) => {
    return function FetchIssue1(){

    const [projectKey, setProjectKey] = useState('');
    const [issues,setIssues]=useState(null);
    const [issueType, setIssueType] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [issueKey,setIssuekey]=useState('');
    const {userData} = useContext(JiraContext)
    const auth=userData.auth
    const [loading,setLoading]=useState(true)
    const handleButton = () => {
           
        const fetchIssues = async () => {
             let id = await data();
            // console.log("issue id is",id)
          try {
            const response = await axios.get(`/rest/api/3/issue/${id}`, {
            // headers: {
            //   'Authorization': `Basic ${auth}`,
            //   'Accept': 'application/json',}
                  })
          //  if (!response.ok) {
          //     throw new Error(`Error: ${response.statusText}`);
          //   }
            const datainfo = await response;
            // console.log(datainfo)
            setIssues(datainfo)
            setProjectKey(datainfo?.data?.fields?.project?.key || '');
            setIssueType(datainfo?.data?.fields?.issuetype?.name || '');
            setSummary(datainfo?.data?.fields?.summary  || '');
            setIssuekey(datainfo?.data?.key || '')
            setDescription(datainfo?.data?.fields?.description?.content[0]?.content[0]?.text || '');
            setLoading(false)
          } catch (err) {
            console.log(err.message)
          }
        };
         fetchIssues();
    }
   useEffect(()=>handleButton(),[])  
  //  console.log(projectKey,issueType,summary,description,issueKey)
   return ( <Component  data={{projectKey,issueType,summary,description,issueKey,loading}}/>)
    }

}
   export default withFetchIssue



//-----------------------Class Component---------------------------------


// const withFetchIssue = (Component,data) => {
//     console.log("fetchissue",data,Component)
//   return (
//     class extends React.Component{
//         constructor(props){
//             super(props);
//             this.state = {
//                         issues : [],
//                         error : null,
//                         projectKey : '',
//                         issueType:'',
//                         summary:'',
//                         description:'',
//                         issueKey:'',
//                         result: null,
//                         username : process.env.REACT_APP_USERNAME,
//                         apiToken : process.env.REACT_APP_API_TOKEN,
//                         datainfo : null,
//                     };
//                      console.log(" constructor___1    :",data)
//         }
      
         

//            componentDidMount() {

//                 const handleButton = ()=> {
//               console.log("fetchissue handlebutton_____2  ")
//          const fetchIssues = async () => {
//          const auth = btoa(`${this.state.username}:${this.state.apiToken}`)
//           try {
//                let id = await data();
//                console.log("issue id is  try______3    :",id)
//             const response = await fetch(`/rest/api/3/issue/${id}`, {
//             headers: {
//                 'Authorization': `Basic ${auth}`,
//                 'Accept': 'application/json',
//             }
//                 })
//                  console.log("fetchissue class___ 4___: ",id)
//                 if (!response.ok)  throw new Error(`Error: ${response.statusText}`);
                    
//                     this.setState({datainfo:await response.json()})
//                     console.log(this.state.datainfo)
//                     // this.setState({setIssues: this.state.datainfo});
                        
//                     this.setState({projectkey:this.state.datainfo?.fields?.project?.key || ''});
//                     this.setState({issueType:this.state.datainfo?.fields?.issuetype?.name || ''});
//                     this.setState({summary:this.state.datainfo?.fields?.summary  || ''});
//                     this.setState({issueKey:this.state.datainfo?.key || ''});
//                     this.setState({description:this.state.datainfo?.fields?.description?.content[0]?.content[0]?.text || ''});
                    
//                 } catch (err) {
//                     console.log(err.message)
//                     this.setState({error:err.message}) 
//                 }
//                 };
//                  fetchIssues();
//           }
//                 console.log(this.state,"state data_____5")
//                  handleButton()
//                 console.log('in didmount_____6')
//             }
  
//         render(){ 
//             return(
                 
//                      <Component  data={{
//                                     projectKey: this.state.projectKey,
//                                     issueType: this.state.issueType,
//                                     issueKey: this.state.issueKey,
//                                     summary: this.state.summary,
//                                     description: this.state.description
//                                 }}
//                                 />
                
//             )
//         }
//     }
//   )
// }


//  export default withFetchIssue