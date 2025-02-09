import s from './Chat.module.css'

import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../redux/chatSlice/chatSlice.js";
import {MessageList} from "../MessageList/MessageList.jsx";
import {MessageInput} from "../MessageInput/MessageInput.jsx";

export const Chat = ({credentials, phoneNumber}) => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);

    const handleSendMessage = (text) => {
        dispatch(sendMessage({credentials, phoneNumber, text}));
    };

    return (
        <div className={s.chat}>
            <MessageList messages={messages} />
            <MessageInput sendMessage={handleSendMessage} />
        </div>
    );
};
