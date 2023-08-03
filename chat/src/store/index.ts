import { configureStore } from '@reduxjs/toolkit'
import webSocket from './slice/websocket'
import userInfo from './slice/userInfo'
import message from './slice/message'

export const store = configureStore({
    reducer: {
        webSocket,
        userInfo,
        message,
    },
    
})

// 返回store的方法getState的类型
export type RootState = ReturnType<typeof store.getState>

// 拿到store的dispatch方法的类型
export type AppDispatch = typeof store.dispatch