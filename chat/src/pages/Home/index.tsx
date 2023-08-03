import { useState, useContext, useEffect, useRef } from 'react'
import './index.scss'
import LeftSidebar from '../../components/LeftSidebar'
import Dialogue from '../../components/Dialogue'
import WordInput from '../../components/WordInput'
import OnlineUsers from '../../components/OnlineUsers'
import { wsUrl, getMsgUrl } from '../../constant/constant'
import { AppContext } from '../../App'
import { msg, msgPullInfo } from '../../constant/type'
import { reqPost } from '../../utils/request'

const msgId = localStorage.getItem('Chat-msgId');

export default function Home() {

  const { userInfo, error, playAudio } = useContext(AppContext)!
  const [wordInput, setWordInput] = useState(''); // 文本输入
  const [msg, setMsg] = useState<msg[]>([]); // 双方对话
  const [newMsg, setNewMsg] = useState(0); // 新信息广播
  const [socket, setSocket] = useState<WebSocket>(); // socket
  const [scroll, setScroll] = useState<number>(0); // 对话框的滚动条状态
  const [msgPullInfo, setMsgPullInfo] = useState<msgPullInfo>({max: 9846573158236160, offset: 0})
  const heartRef = useRef(1); // 心跳的防刷新
  const msgIdRef = useRef(msgId ? parseInt(msgId) : 0); // 客户端信息Id
  const recInterval = useRef(Math.random() * 1000); // 随机初始重连时间间隔
  let heartTimer = 0; //心跳定时器id
  let recTimer = 0; // 重连定时器id
  const WS_URL = `${wsUrl}/${userInfo.token}`; // websocket请求地址

  const heartCheck = (socket: WebSocket) => { // 心跳检查
    heartTimer = setInterval(()=>{ // 建立定时器 只能建立一次 或者是建立了下一个就将上一个销毁
      socket.send(JSON.stringify({"messageType": 4}));
    }, 30000);
  }

  const reconnect = () => { // 断线重连
    recTimer = setTimeout(()=>{
      setSocket(new WebSocket(WS_URL));
    }, recInterval.current);
    recInterval.current *= 2;
  }

  const pullMsg = () => { // 信息拉取
    const data = {
      max: msgPullInfo.max,
      offset: msgPullInfo.offset,
      chatRoomId: 1
    }
    const config = { // 请求配置
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    reqPost(getMsgUrl, data, config, error, "信息拉取失败").then(
      res => {
        setMsgPullInfo({
          max: res.max,
          offset: res.offset,
        })
        setMsg([...res.resultList.reverse(), ...msg]); // resultList时间顺序从新到旧
      },
    )
  }

  const socketOpen = (timeoutId: number, socket: WebSocket, recTimer: number, pullMsg: () => void, recInterval: React.MutableRefObject<number>) => {
    console.log("[open] 连接已建立");
    clearTimeout(timeoutId)
    heartCheck(socket);
    clearTimeout(recTimer);
    pullMsg();
    recInterval.current = Math.random() * 1000;
  }

  const wsInit = (socket: WebSocket) => { // WebSocket初始化

    const timeoutId = setTimeout(() => { // 设置连接超时时间为500ms
      socket.close();
      console.log('连接超时');
    }, 500); 

    socket.onopen = () => socketOpen(timeoutId, socket, recTimer, pullMsg, recInterval);
    
    socket.onmessage = function(event) { // 接收到服务器的信息
      clearTimeout(timeoutId)
      const data = JSON.parse(event.data)
      const type = data.messageType;
      switch(type){
        case 0: // 信息成功发送出去了
          console.log('[message] 信息成功发送->', data.clientMessageId);
          break;
        case 3: // 握手之后服务器的回应
          console.log(`[message] 握手回应:`, data);
          break;
        case 4: // 心跳回应
          console.log(`[message] 心跳回应:`, data);
          break;
        case 6: // 群聊信息
          console.log('[message] 接收到群聊信息:', data);
          const { chatRoomId, clientMessageId, clientTime, fromUserId, fromUserName, isText, message, color, icon } = data;
          // 注意 这里必须使用函数式的更改 这个prev获取到的是闭包外面的当前的msg 而直接获取的msg是当前闭包的msg 是旧的
          setMsg(prev => [...prev, { chatRoomId, clientMessageId, clientTime, fromUserId, fromUserName, isText, message, color, icon }]);
          setNewMsg(prev => prev+1);
          playAudio()
          break;
      }
    };
    
    socket.onclose = function(event) { // 连接关闭
      clearTimeout(timeoutId)
      clearInterval(heartTimer); // 清除定时器
      if (event.wasClean) {
        console.log(`[close] 连接完全关闭, code=${event.code} reason=${event.reason}`);
      } else {
        console.log('[close] 连接中断');
      }
      reconnect();
    };
    
    socket.onerror = function(error) { // 连接错误
      console.log("error:",error);
      clearTimeout(timeoutId)
      reconnect();
    };
  }

  useEffect(()=>{ // 新建WebSocket 只能初始化一次
    if(heartRef.current !== 1 || !userInfo.token) return ; // 等待token
    setSocket(new WebSocket(WS_URL));
    heartRef.current++;
  },[userInfo]);

  useEffect(()=>{ // websocket初始化
    if(!socket) return;
    wsInit(socket);
  },[socket]);

  useEffect(()=>{ // 发送信息给服务器
    if(!socket) return ;
    if(socket.readyState === WebSocket.OPEN && wordInput != ''){
      const msg = {
        chatRoomId: 1,
        clientMessageId: msgIdRef.current,
        clientTime: Date.now(),
        fromUserId: userInfo.userId,
        fromUserName: userInfo.name,
        isText: true,
        message: wordInput,
        messageType: 6,
        icon: userInfo.icon,
      }
      socket.send(JSON.stringify(msg));
    }
  },[wordInput]);

  useEffect(()=>{ // 发送信息渲染到页面
    if(!wordInput) return ;
    const temp_msg = {
      chatRoomId: 1,
      clientMessageId: msgIdRef.current,
      clientTime: Date.now(),
      fromUserId: userInfo.userId,
      fromUserName: userInfo.name,
      isText: true,
      message: wordInput,
      color: userInfo.color,
      icon: userInfo.icon,
    }
    setMsg([...msg, temp_msg]);
    setWordInput(''); // 清空使得相同的信息可以发送
    setNewMsg(newMsg+1);
    msgIdRef.current++; // 只要渲染到页面就应该自增了 不管有没有网络
    localStorage.setItem('Chat-msgId', `${msgIdRef.current}`);
    socket?.close();
  },[wordInput]);

  useEffect(()=>{ // 滚动事件处理    
    if(scroll === 0){
      pullMsg();
    }
  },[scroll]);

  return (
    <div className='Home'>
        <LeftSidebar/> 
        <div className="rightChat">
          <Dialogue msg={msg} setScroll={setScroll} newMsg={{newMsgState:newMsg,setNewMsg:setNewMsg}} />
          <WordInput setWordInput={setWordInput}/>
        </div>
        <OnlineUsers/>
    </div>
  )
}
