import s from './MessageInput.module.css';

import {useState} from "react";

export const MessageInput = ({sendMessage}) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        sendMessage(input);
        setInput('');
    };

    return (
        <div className={s.message}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите сообщение"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};