import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { msg, msgOffset } from '../../constant/type';

const msgId = localStorage.getItem('Chat-msgId');

interface message {
    clientMessageId: number, // 客户端信息id
    chatMsg: msg[], // 群聊信息
    msgOffset: msgOffset, // 信息偏移
}

const initialState: message = {
    clientMessageId: msgId ? parseInt(msgId) : 1,
    chatMsg: [],
    msgOffset: {max: 9223372036854775807, offset: 0},
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setClientMessageId: (state, action: PayloadAction<number>) => {
            state.clientMessageId = action.payload;
        },
        setChatMsg: (state, action: PayloadAction<msg[]>) => {
            state.chatMsg = action.payload;
        },
        setMsgOffset: (state, action: PayloadAction<msgOffset>) => {
            state.msgOffset = action.payload;
        },
    },
});

export const { setClientMessageId, setChatMsg, setMsgOffset } = messageSlice.actions

export const selectMessage = (state: RootState) => {
    const { clientMessageId, chatMsg, msgOffset } = state.message;
    return { clientMessageId, chatMsg, msgOffset };
}

export default messageSlice.reducer