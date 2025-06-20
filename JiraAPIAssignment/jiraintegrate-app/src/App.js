import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import JiraTable from './components/JiraTable';
import { JiraIssuesProvider } from './context/JiraIssuesContext';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundry';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const JiraTableTest = lazy(() => import('./components/JiraTableTest'));
const IssueDetailsPage = lazy(() => import('./components/IssueDetailsPage'));
const CreateIssuePage = lazy(() => import('./components/CreateIssuePage'));
// const ErrorBoundary = ({ children }) => {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       {children}
//     </Suspense>
//   );
// };

function App() {
  return (
    <div className="App">
    {/* <Provider store={Store}>
    <JiraTable projectKey="PRAC" />
    </Provider> */}
     <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
      <JiraIssuesProvider projectKey="PRAC">
        <Suspense fallback={<div><Skeleton height={30} width={200} style={{ marginBottom: 10 }} />
        <Skeleton height={20} count={5} style={{ marginBottom: 6 }} /></div>}>
         <Routes>
          <Route path="/" element={<JiraTableTest />} />
          <Route path="/issue/:issueId" element={<IssueDetailsPage />} />
          <Route path="/create" element={<CreateIssuePage />} />
        </Routes>
        </Suspense>
      </JiraIssuesProvider>
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  );
}

export default App;
