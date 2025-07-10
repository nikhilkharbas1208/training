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


const JiraTableTest = lazy(() => import('./components/JiraTableTest'));
const TableRedux = lazy(() => import('./components/TableRedux'));
// const JiraTable = lazy(() => import('./components/JiraTable'));
const IssueDetailsPage = lazy(() => import('./components/IssueDetailsPage'));
const CreateIssuePage = lazy(() => import('./components/CreateIssuePage'));
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
          <Route path="/" element={<TableRedux />} />
          <Route path="/issue/:issueId" element={<IssueDetailsPage />} />
          <Route path="/create" element={<CreateIssuePage />} />
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
