import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { msg } from '../../constant/type';

interface WebSocketState {
    isConnected: boolean;
    receiveMsg: msg | null;
    sendMsg: msg | null
}

const initialState: WebSocketState = {
    isConnected: false,
    receiveMsg: null,
    sendMsg: null,
}

export const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setReceiveMsg: (state, action: PayloadAction<msg | null>) => {
            state.receiveMsg = action.payload;
        },
        setSendMsg: (state, action: PayloadAction<msg | null>) => {
            state.sendMsg = action.payload;
        },
    },
});

export const { setConnected, setReceiveMsg, setSendMsg } = webSocketSlice.actions

export const selectWebSocket = (state: RootState) => {
    const { isConnected, receiveMsg, sendMsg } = state.webSocket;
    return { isConnected, receiveMsg, sendMsg };
}

export default webSocketSlice.reducer