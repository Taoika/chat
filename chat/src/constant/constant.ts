const baseUrl = '39.98.41.126:31121'
export const httpBaseUrl = `http://${baseUrl}`;
export const wsBaseUrl = `ws://${baseUrl}`
export const getTokenUrl = `${httpBaseUrl}/uaa/oauth/token`; // 获取token
export const getUserUrl = `${httpBaseUrl}/user/inner/getUserByUsername`; // 获取用户名
export const wsUrl = `${wsBaseUrl}/ws`; // websocket