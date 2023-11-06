import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { msg, msgOffset } from '../../constant/type';

type newMsgType = '' | 'send' | 'receive' | 'history'
const msgId = localStorage.getItem('Chat-msgId');

interface message {
    clientMessageId: number, // 客户端信息id
    chatMsg: msg[], // 群聊信息
    msgOffset: msgOffset, // 信息偏移
    newMsgType: newMsgType, // 新增信息类型
}

const initialState: message = {
    clientMessageId: msgId ? parseInt(msgId) : 1,
    chatMsg: [],
    msgOffset: {max: 9223372036854775807, offset: 0},
    newMsgType: '',
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
        setNewMsgType: (state, action: PayloadAction<newMsgType>) => {
            state.newMsgType = action.payload;
        },
    },
});

export const { setClientMessageId, setChatMsg, setMsgOffset, setNewMsgType } = messageSlice.actions

export const selectMessage = (state: RootState) => {
    const { clientMessageId, chatMsg, msgOffset, newMsgType } = state.message;
    return { clientMessageId, chatMsg, msgOffset, newMsgType };
}

export default messageSlice.reducer