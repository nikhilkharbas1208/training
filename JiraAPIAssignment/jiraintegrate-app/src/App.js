import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './Store';
import JiraTable from './JiraTable';

function App() {
  return (
    <div className="App">
    <Provider store={Store}>
    <JiraTable projectKey="PRAC" />
    </Provider>
    </div>
  );
}

export default App;
