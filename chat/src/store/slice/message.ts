import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

const msgId = localStorage.getItem('Chat-msgId');

interface message {
    clientMessageId: number,
}

const initialState: message = {
    clientMessageId: msgId ? parseInt(msgId) : 0
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setClientMessageId: (state, action: PayloadAction<number>) => {
            state.clientMessageId = action.payload;
        },
    },
});

export const { setClientMessageId } = messageSlice.actions

export const selectMessage = (state: RootState) => {
    const { clientMessageId } = state.message;
    return { clientMessageId };
}

export default messageSlice.reducer