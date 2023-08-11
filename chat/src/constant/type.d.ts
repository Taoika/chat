export type msg = {
    chatRoomId: number,
    clientMessageId: number,
    clientTime: number,
    fromUserId: string,
    fromUserName: string,
    isText: boolean,
    data: {
      content: string, // 内容
      atUserId?: number[], // @列表
      duration?: number, // 语音长度
    }
    messageContentType: number,
    color:string,
    icon: string,
}

export type msgPullInfo = {
  max: number,
  offset: number,
}

export type userInfo = {
  token: string, 
  userId: string,
  name: string, 
  color:string,
  icon: string,
}

export type onlineInfo = {
  userId: number,
  username: string,
  gender: string,
  color: string,
  icon: string,
  online: string,
}