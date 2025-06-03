import "./App.css";
import TableComponent from "./components/TableComponent";
import Table2Component from "./components/Table2Component";
import { useState } from "react";

function App() {
  const [showClassComponent, setShowClassComponent] = useState(true);
  return (
    <div className="App">
      {showClassComponent ? <TableComponent /> : <Table2Component />}
    </div>
  );
}

export default App;
