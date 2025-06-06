import { lazy, Suspense } from 'react';
//lazy loading
const TablePage = lazy(() => import ('./TablePage'));


export const Home = () => {
    return(
        <>
        <h1>Home Page</h1>
        {/* <Table/> */}
        {/* React Suspense */}
        <Suspense fallback={<div>Loading data...</div>}>
        <TablePage/>
        </Suspense>
        </>
    );
};