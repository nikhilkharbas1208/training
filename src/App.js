import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayData from './JiraIntegrate/DataDisplay';
import IssueDetails from './JiraIntegrate/IssueDetails';
import CreateIssue from './JiraIntegrate/CreateIssue';
import EditIssue from './JiraIntegrate/EditIssue';



function App() {
  return (
    <>
    {/* <DisplayData/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplayData/>}/>
        <Route path="issuedetails/:id" element={<IssueDetails/>}/>
        <Route path="/createissue" element={<CreateIssue/>}/>
        <Route path="/updateissue" element={<EditIssue/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
    {/* <CreateIssue/> */}
    {/* <EditIssue/> */}
    
    </>
  );
}

export default App;
