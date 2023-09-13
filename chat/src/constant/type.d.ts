export type msg = { // 发出去的信息
    chatRoomId: number,
    clientMessageId: number, // 客户端信息id
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

export interface serverMsg extends msg { // 收到的信息
    messageId?: number, // 服务器信息id
    messageType?: number,
	serverTime?: number,
}

export type msgOffset = { // 拉取信息偏移
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
      atUserId?: number[],
  },
  messageContentType: number,
}

export type chatRoomUserInfo = { // 群聊用户信息
  userId: number,
  username: string,
  color: string,
  icon: string,
  online: booloean,
}