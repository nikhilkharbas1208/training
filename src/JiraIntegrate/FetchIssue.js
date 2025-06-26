import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';



//-----------------------Function Component---------------------------------


const withFetchIssue = (Component,data) => {
    return function FetchIssue1(){

    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const [projectKey, setProjectKey] = useState('');
    const [issueType, setIssueType] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [result, setResult] = useState(null);
    const [issueKey,setIssuekey]=useState('');
    
    
    
    
    const username = process.env.REACT_APP_USERNAME
    const apiToken =process.env.REACT_APP_API_TOKEN
    const auth = btoa(`${username}:${apiToken}`);
    
    
     const handleButton = () => {
           
        const fetchIssues = async () => {
             let id = await data();
            console.log("issue id is",id)
          try {
            const response = await fetch(`/rest/api/3/issue/${id}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
      }
    })
           if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
    
            const datainfo = await response.json();
            console.log(datainfo)
            setIssues(datainfo);
            setProjectKey(datainfo?.fields?.project?.key || '');
            setIssueType(datainfo?.fields?.issuetype?.name || '');
            setSummary(datainfo?.fields?.summary  || '');
            setIssuekey(datainfo?.key || '')
            setDescription(datainfo?.fields?.description?.content[0]?.content[0]?.text || '');
          } catch (err) {
            console.log(err.message)
            setError(err.message);
          }
        };
         fetchIssues();
    }
// const timeoutID = setTimeout( handleButton() , 2000);
   
     useEffect(()=>handleButton(),[])  

    
    // handleButton()
 console.log(projectKey,issueType,summary,description,issueKey)

   return (
            <Component  data={{projectKey,issueType,summary,description,issueKey}}/>
   )
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