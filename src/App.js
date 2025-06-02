
import File from './funComponents/File';
import Pprops from './funComponents/Pprops';
import {Pprop} from './funComponents/Pprops.js';
import Counter from './funComponents/Counter.js';
import { PropsDrill } from './funComponents/PropDrill.js';
import { Provider } from './ContextAPI/Contexts.js';
import {LevelA} from './ContextAPI/DataConsumer.js'
import {FetchApi} from './funComponents/FetchApi.js'
import About  from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Home from './Pages/Home.jsx';
import Products from './Pages/Products.jsx';
import {BrowserRouter , Routes , Route, createBrowserRouter, createRoutesFromElements, RouterProvider, createRoutesFromChildren} from 'react-router-dom';
import RootLayout from './Layouts/RootLayout.jsx';
import NavBar from './Pages/NavBar.jsx';
import ClickMe from './Pages/ClickMe.jsx';
import Settings from './Pages/Settings.jsx';
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
     <>
     
        <Route path='/' element={<RootLayout />} > 
            <Route path='/' element={<Home/>}/>
                <Route path='About' element={<About />}>
                      <Route path='Contact' element={<Contact />} />
                      <Route path='Products' element={<Products />} />
                </Route>
            
            <Route path='Settings' element={<Settings />} />
        </Route>
       </>

    )
  )

  return(
    <div>
   
    <RouterProvider router={router} />
    </div>
  )
  
     
}

export default App;





{/* <center>
          <h1> hello world </h1>
           </center>
          <File/>
          <Pprops name="88" days="90" />
          <Pprop lable="898" field="980" />
          <Counter/>
          <PropsDrill data="you completed drill"/>
          <Provider value={{data:"you got data using Context API",}}>
             <LevelA/>
          </Provider>  
          <FetchApi/>         */}



//  <BrowserRouter>
//             <NavBar/>
//             <Routes>
//               <Route path='/' element={<Home/>} />
//               <Route path='/About' element={<About/>} />
//               <Route path='/Contact' element={<Contact/>} />
//               <Route path='/Products' element={<Products/>} />
//             </Routes>
//         </BrowserRouter>