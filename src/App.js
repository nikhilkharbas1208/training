import React, { Suspense, createContext, lazy } from 'react';
import { Provider } from 'react-redux';
import { Store } from './store/store';
import { JiraIssuesProvider } from './context/JiraIssuesContext';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundry';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import './i18n'; 
import 'semantic-ui-css/semantic.min.css';
import GraphComponent from './components/GraphComponent';


const JiraTableTest = lazy(() => import('./components/JiraTableTestComponent'));
const TableComponent = lazy(() => import('./components/TableComponent'));
// const JiraTable = lazy(() => import('./components/JiraTable'));
const IssueDetailsPage = lazy(() => import('./components/IssueDetailsComponent'));
const CreateIssuePage = lazy(() => import('./components/CreateIssuePageComponent'));
// const ErrorBoundary = ({ children }) => {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       {children}
//     </Suspense>
//   );
// };
export const JiraIssueContext = createContext();

function App() {
  return (
    <div className="App">
    {/* <Provider store={Store}>
    <JiraTable projectKey="PRAC" />
    </Provider> */}
     <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <JiraIssuesProvider projectKey="PRAC">
        <JiraIssueContext.Provider value={{ projectKey: "PRAC" }}>
        <Suspense fallback={<div><Skeleton height={30} width={200} style={{ marginBottom: 10 }} />
        <Skeleton height={20} count={5} style={{ marginBottom: 6 }} /></div>}>
         <Routes>
          <Route path="/" element={<TableComponent />} />
          <Route path="/issue/:issueId" element={<IssueDetailsPage />} />
          <Route path="/create" element={<CreateIssuePage />} />
          <Route path="/graph" element={<GraphComponent />} />
        </Routes>
        </Suspense>
        </JiraIssueContext.Provider>
         </JiraIssuesProvider>  
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  );
}

export default App;
