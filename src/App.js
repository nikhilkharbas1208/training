import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Button, ButtonLabel } from './StyleComponents/button.style';
import { AppContainer } from './StyleComponents/Container.style';
import { DotLoader } from 'react-spinners';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { DelayedComponent } from './Time';
// import DisplayData from './JiraIntegrate/DataDisplay';
// import IssueDetails from './JiraIntegrate/IssueDetails';
// import CreateIssue from './JiraIntegrate/CreateIssue';
// import EditIssue from './JiraIntegrate/EditIssue';

const DisplayData = lazy(() => (import('./JiraIntegrate/DataDisplay')));
const IssueDetails = lazy(() => import('./JiraIntegrate/IssueDetails'));
const CreateIssue = lazy(() => import('./JiraIntegrate/CreateIssue'));
const EditIssue = lazy(() => import('./JiraIntegrate/EditIssue'));

function App() {
  return (
     <div> 
   
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Suspense fallback={<center><DotLoader loading = {true}/></center>}> <DisplayData/> </Suspense>  }/>                    
          <Route path="/createissue" element={  <CreateIssue/> }/>
          <Route path="/updateissue/:id" element={<Suspense fallback={ <center><DotLoader loading = {true}/></center>}>  <EditIssue/>  </Suspense> }/>
           <Route path="/issuedetails/:id" element={ <IssueDetails/>}/>
          <Route/>
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
    

    {/* <DelayedComponent/> */}
     </div>
  );
}

export default App;
