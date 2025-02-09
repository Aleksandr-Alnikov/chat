import s from './MessageList.module.css'

import {id} from '../../utils/id'


export const MessageList = ({messages}) => {

    return (
        <ul className={s.list}>
            {messages.map(item => {
                const ids = id(item.sender);
                return (
                    <li key={ids} className={s.message}>{item.text}</li>
                );
            })}
        </ul>
    );
};
