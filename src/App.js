import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayData from './JiraIntegrate/DataDisplay';
import IssueDetails from './JiraIntegrate/IssueDetails';
import CreateIssue from './JiraIntegrate/CreateIssue';



function App() {
  return (
    <>
    {/* <DisplayData/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplayData/>}/>
        <Route path="issuedetails/:id" element={<IssueDetails/>}/>
        <Route path="/createissue" element={<CreateIssue/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
    {/* <CreateIssue/> */}
    
    </>
  );
}

export default App;
