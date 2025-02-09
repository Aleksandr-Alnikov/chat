import s from './FormChat.module.css';

import {useState} from "react";
import {useDispatch} from "react-redux";
import {Chat} from "../Chat/Chat.jsx";


export const FormChat = () => {
    const [credentials, setCredentials] = useState({
        idInstance: '1103189373',
        apiTokenInstance: '1416ee45d19e419d87533bc26fbf58bcd01291138eb3484397',
    });
    const [phoneNumber, setPhoneNumber] = useState('79236302808');
    const dispatch = useDispatch();

    const handleCredentialsChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={s.container}>
            <form className={s.form}>
                <label>
                    Введите свой idInstance
                    <input
                        type="text"
                        name="idInstance"
                        placeholder="idInstance"
                        value={credentials.idInstance}
                        onChange={handleCredentialsChange}
                    />
                </label>
                <label>
                    Введите свой apiTokenInstance
                    <input
                        type="text"
                        name="apiTokenInstance"
                        placeholder="apiTokenInstance"
                        value={credentials.apiTokenInstance}
                        onChange={handleCredentialsChange}
                    />
                </label>
                <label>
                    Введите свой телефон
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
            </form>
            <Chat credentials={credentials} phoneNumber={phoneNumber} />
        </div>
    );
};