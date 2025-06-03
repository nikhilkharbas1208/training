import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { createRoutesFromElements,Route } from 'react-router-dom';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import { Movie } from './Pages/Movie';
import AppLayout from './Components/layout/AppLayout';
import { Home } from './Pages/Home';
import { ErrorPage } from './Pages/ErrorPage';
import { GetMoviesData } from './API/GetAPIData';
import { MovieDetails } from './Components/UI/MovieDetails';
import { GetMoviesDetails } from './API/GetMovieDetails';
const App = () => {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <AppLayout/>,
      errorElement : <ErrorPage/>,
      children: [
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/about",
      element : <About/>
    },
    {
      path : "/movie",
      element : <Movie/>,
      loader : GetMoviesData
    },
    {
      // Dynamic Routing
      path : "/movie/:movieID",
      element : <MovieDetails/>,
      loader : GetMoviesDetails
    },
    {
      path : "/contact",
      element : <Contact/>
    },
    ]
    }
  ]);
    // const router = createBrowserRouter(
    //   createRoutesFromElements(
    //     <Route>
    //       <Route path="/" element={ <Home /> }/>
    //       <Route path="/about" element={ <About />}/>
    //       <Route path="/movie" element={ <Movie />}/>
    //       <Route path="/contact" element={ <Contact />}/>
    //     </Route>
    //   )
    // );

  return <RouterProvider router={router}/>
};

export default App;
