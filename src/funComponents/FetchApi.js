import { useEffect,useState} from "react";

export const FetchApi = () => {

    const [data,setData] = useState([]);
    useEffect(()=>{
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((json) => {
                setData(json);
                console.log(json);
            });
    },[]
    );


     return (
        <div >
            <h3>Fetch data from an API in React</h3>
            <div >
                {data.map((fdata) => (
                    <div key={fdata.name}>
                        <ol>
                            <div>
                                <strong>User_Name: </strong>
                                {fdata.username},
                            </div>
                            <div>FullName: {fdata.name}</div>
                            <div>UserEmail: {fdata.email}</div>
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    );
};






