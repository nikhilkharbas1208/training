import { useState } from "react";
import Message from './Message';

export const MessageProps = () => {
    const [message, setMessage] = useState('');
    const changeHandle = (e) => {
        setMessage(e.target.value);
    };
    return (
        <div>
            <h1>Enter Message:</h1>
            <input type="text" onChange={changeHandle} value={message}/>
            <Message message={message}/>
        </div>
    );
};