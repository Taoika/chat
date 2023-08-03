import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { userInfo } from '../../constant/type'

const initialState: userInfo = {
    token: '', 
    userId: '',
    name: '', 
    color:'',
    icon: '',
}

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
        setIcon: (state, action: PayloadAction<string>) => {
            state.icon = action.payload;
        },
        setAllUserInfo: (state, action: PayloadAction<userInfo>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.color = action.payload.color;
            state.icon = action.payload.icon;
        }
    },
});

export const { setToken, setUserId, setName, setColor, setIcon, setAllUserInfo } = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => {
    const {token, userId, name, color, icon} = state.userInfo;
    return {token, userId, name, color, icon};
}

export default userInfoSlice.reducer