import './App.css';
// import { State } from './Components/State';
// import { DerivedState } from './Components/DerivedState';
//import { MessageProps } from './Components/MessageProps';
import { BioProvider } from './hooks/ContextAPI';
import { Home } from './hooks/ContextAPI/Home';
import { About } from './hooks/ContextAPI/About';
//import { ParentComponent } from './Components/PropDrilling';
function App() {
  return (
    <div className="App">
      {/* <State/> */}
      {/* <DerivedState/> */}
      {/* <MessageProps/> */}
      {/* <ParentComponent/> */}
      <BioProvider>
        <Home/>
        <About/>
      </BioProvider>
    </div>
  );
}

export default App;
