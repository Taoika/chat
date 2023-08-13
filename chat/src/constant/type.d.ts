export type msg = { // 信息
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

export type msgPullInfo = { // 拉取信息偏移
  max: number,
  offset: number,
}

export type userInfo = { // 用户信息
  token: string, 
  userId: string,
  name: string, 
  color:string,
  icon: string,
}

export type onlineInfo = { // 在线用户信息
  userId: number,
  username: string,
  gender: string,
  color: string,
  icon: string,
  online: string,
}

export type input = { // 用户输入
  data: {
      content: string,
      duration?: number,
  },
  messageContentType: number,
}