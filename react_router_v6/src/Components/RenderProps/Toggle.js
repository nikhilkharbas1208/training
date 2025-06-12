import React from 'react'

// const Toggle = ({flag, render}) => {
//   return render(flag);
// };
const Toggle = ({flag, children}) => {
  return (
    <>
    <h3>This is toggle</h3>
    {children(flag)}
    </>
  );
};

export default Toggle;