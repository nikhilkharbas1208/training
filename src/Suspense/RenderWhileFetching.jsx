import React, { Suspense } from 'react'
import { Userdata } from './Userdata'
import { Todos } from './Todos'
import { ErrorBoundary } from "react-error-boundary";

const RenderWhileFetching = () => {


  return (
    <div><h3>RenderWhileFetching</h3>
       

        <ErrorBoundary fallback={<p> couldn't find the todos data please check once again</p>}>

        <Suspense fallback={<p>todo data is loading please wait</p>}>
            <Todos/>
        </Suspense>
        </ErrorBoundary>
       
       <ErrorBoundary fallback={<p> couldn't find the albums data please check once again</p>}>

         <Suspense fallback= {<p>user data is getting prepared to display </p>}>
          <Userdata/>
        </Suspense>
         </ErrorBoundary>
    </div>
  )
}

export default RenderWhileFetching