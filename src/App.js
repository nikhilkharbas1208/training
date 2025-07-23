
import { BrowserRouter, Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
// import { Button, ButtonLabel } from './Components/button.style';
import { AppContainer } from './Components/Container.style';
import { DotLoader } from 'react-spinners';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { DelayedComponent } from './Time';
import CakeShop from './Components/CakeShopComponent';
import JiraView from './Components/JiraViewComponent';
import styles from './Components/heading.module.css'
import RowEditingGrid from './RowEditing';
import './App.css';

// import DisplayData from './JiraIntegrate/DataDisplay';
// import IssueDetails from './JiraIntegrate/IssueDetails';
// import CreateIssue from './JiraIntegrate/CreateIssue';
// import axios from 'axios';
// import EditIssue from './JiraIntegrate/EditIssue';

const DisplayData = lazy(() => import('./Components/DataDisplayComponent'));
const IssueDetails = lazy(() => import('./Components/IssueDetailsComponent'));
const CreateIssue = lazy(() => import('./Components/CreateIssueComponent'));
const EditIssue = lazy(() => import('./Components/EditIssueComponent'));

function App() {
  return (
     <div > 
       <div className={styles.container}>
           <h1>Integrated Jira with ReactJS</h1>
           {/* <Button>
            <Icon className='trash'></Icon>
           </Button> */}
       </div>
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Suspense fallback={<center><DotLoader loading = {true}/></center>}> <DisplayData/> </Suspense>  }/>                    
          <Route path="/createissue" element={  <CreateIssue/> }/>
          <Route path="/updateissue/:id" element={<Suspense fallback={ <center><DotLoader loading = {true}/></center>}>  <EditIssue/>  </Suspense> }/>
          <Route path="/issuedetails/:id" element={ <IssueDetails/>}/>
        </Routes>
      </BrowserRouter>




      
    {/* <DisplayData/> */}
    {/* <CreateIssue/> */}
    {/* <EditIssue/> */}
            
         {/* <center>
          
           <Button bgColor="blue"><ButtonLabel>Click Me</ButtonLabel></Button><br/><br/>
           <Button bgColor="red"><ButtonLabel>Click Me</ButtonLabel></Button><br/><br/>
           <Button bgColor="green"><ButtonLabel>Click Me</ButtonLabel></Button><br/><br/>
        </center> */}
    
          {/* <CakeShop/>s */}
          {/* <JiraView/> */}
    {/* <DelayedComponent/> */}
     </div>
    // <div>
    //   <RowEditingGrid/>
    // </div>
  );
}

export default App;
