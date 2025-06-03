import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
// import { Home } from '../../Pages/Home';
export const AppLayout = () => {
    const navigation=useNavigate();
    if (navigation.state === 'loading') return <h1>Loading...</h1>;

    return(
        <>
        <Header/>
        {/* <Home/> */}
        <Outlet/>
        <Footer/>
        </>
    );
};
export default AppLayout;