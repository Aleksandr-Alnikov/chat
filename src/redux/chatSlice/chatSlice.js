import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({credentials, phoneNumber, text}, thunkAPI) => {
        try {
            if (!credentials || !credentials.idInstance || !credentials.apiTokenInstance) {
                throw new Error('ошибка credentials');
            }
            if (!phoneNumber) {
                throw new Error('ошибка номера телефона');
            }
            if (!text || typeof text !== 'string' || text.trim() === '') {
                throw new Error('пустая строка');
            }

            const response = await fetch(
                `https://api.green-api.com/waInstance${credentials.idInstance}/SendMessage/${credentials.apiTokenInstance}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chatId: `${phoneNumber}@c.us`,
                        message: text,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`ошибка: ${errorData.message}`);
            }

            return response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async ({idInstance, apiTokenInstance}, thunkAPI) => {
        try {
            if (!idInstance || !apiTokenInstance) {
                throw new Error('не верный credentials');
            }

            const response = await fetch(
                `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`ошибка: ${errorData.message}`);
            }

            return response.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    messages: [],
    status: 'idle',
    error: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push({text: action.meta.arg.text});
                state.status = 'succeeded';
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                action.payload.forEach((msg) => {
                    state.messages.push({text: msg.body.textMessage});
                });
                state.status = 'succeeded';
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});


export default chatSlice.reducer;