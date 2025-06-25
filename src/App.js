
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableComponent from "./components/TableComponent";
import { UserDetailPage } from "./components/UserDetailPage";
import { Suspense } from 'react';

function App() {
  return (
    <Router>
      <Routes>
         
        <Route path="/" element={
        <Suspense fallback={<div>Loading data...</div>}>
        <TableComponent />
        </Suspense>
      } />
        
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
