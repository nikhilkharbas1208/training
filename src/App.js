import logo from './logo.svg';
import './App.css';
import JiraLogin from './JIRAINTEGRATE/JiraLogin'
import DisplayData from './JIRAINTEGRATE/DataDisplay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IssueDetails from './JIRAINTEGRATE/IssueDetails';

function App() {
  return (
    <>
    {/* <DisplayData/> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DisplayData/>}/>
        <Route path="issuedetails/:id" element={<IssueDetails/>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
