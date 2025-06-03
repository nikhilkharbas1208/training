// const users = [
//     {name: "Alice", age: 32},
//     {name: "xyz", age: 23},
//     {name: "jpo", age: 34},
//     {name: "abs", age: 11}
// ];
import React, { useState } from 'react';

export const DerivedState = () => {

    const [ users , setUsers ] = useState([
    {name: "Alice", age: 32},
    {name: "xyz", age: 23},
    {name: "jpo", age: 34},
    {name: "abs", age: 11}
    ]);
    //Derived Satte userCount
    const userCount = users.length;
    const averageAge = (users.reduce((accum, curEle) => accum + curEle.age, 0))/userCount;
    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {
                    users.map((curEle, index) => {
                        return(
                        <li key={index}>
                            {curEle.name} - {curEle.age} year old
                        </li>
                        );
                    })
                }
                <h3>User Count: {userCount}</h3>
                <h3>Average Age: {averageAge}</h3>
            </ul>
        </div>
    );
};