export type msg = {
    "chatRoomId": Number,
    "clientMessageId": Number,
    "clientTime": Number,
    "fromUserId": string,
    "fromUserName": string,
    "isText": boolean,
    "message": string,
    "color":string
}

export type msgPullInfo = {
  max: Number,
  offset: Number,
}

export type userInfo = {
  token: string, 
  userId: string,
  name: string, 
  color:string,
}