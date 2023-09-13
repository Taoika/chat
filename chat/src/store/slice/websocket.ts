import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { msg } from '../../constant/type';

interface WebSocketState {
    isConnected: boolean; // 连接状态
    sendMsg: msg | null; // 需要发送的信息
}

const initialState: WebSocketState = {
    isConnected: false,
    sendMsg: null,
}

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setSendMsg: (state, action: PayloadAction<msg | null>) => {
            state.sendMsg = action.payload;
        },
    },
});

export const { setConnected, setSendMsg } = webSocketSlice.actions

export const selectWebSocket = (state: RootState) => {
    const { isConnected, sendMsg } = state.webSocket;
    return { isConnected, sendMsg };
}

export default webSocketSlice.reducer