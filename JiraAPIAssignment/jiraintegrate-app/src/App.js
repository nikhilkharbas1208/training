import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import JiraTable from './components/JiraTable';
import { JiraIssuesProvider } from './context/JiraIssuesContext';
import JiraTableTest from './components/JiraTableTest';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {children}
    </Suspense>
  );
};

function App() {
  return (
    <div className="App">
    {/* <Provider store={Store}>
    <JiraTable projectKey="PRAC" />
    </Provider> */}
     <ErrorBoundary>
      <BrowserRouter>
      <JiraIssuesProvider projectKey="PRAC">
         <Routes>
          <Route path="/" element={<JiraTableTest />} />
          <Route path="/issue/:issueId"/>
        </Routes>
      </JiraIssuesProvider>
      </BrowserRouter>
    </ErrorBoundary>
    </div>
  );
}

export default App;
