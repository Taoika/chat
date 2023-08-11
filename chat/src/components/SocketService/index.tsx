import { useState, useEffect, useRef, useContext} from 'react'
import { wsUrl} from '../../constant/constant'
import { setReceiveMsg, setConnected, setSendMsg } from '../../store/slice/websocket'
import { setAllUserInfo } from '../../store/slice/userInfo'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { msg } from '../../constant/type';
import { reqGetToken } from '../../utils/request';
import { AppContext } from '../../App';

const infoCacheString = localStorage.getItem('Chat-sendMsg');

export default function SocketService() {

    const dispatch = useAppDispatch()
    const { isConnected, sendMsg } = useAppSelector((state) => state.webSocket)
    const { token, userId, color, name, icon } = useAppSelector((state) => state.userInfo)
    const { clientMessageId } = useAppSelector((state) => state.message)

    const { error } = useContext(AppContext)!
    const [msgAck, setMsgAck] = useState(0); // 最大ack
    const [messageId, setMessageId] = useState(0); // 服务器的信息Id
    const [clientTime, setClientTime] = useState(0); // 客户端时间 用于标识回应ack
    const [infoCache, setInfoCache] = useState(infoCacheString ? JSON.parse(infoCacheString) : [])
    const [socket, setSocket] = useState<WebSocket>(); // socket
    const heartRef = useRef(1); // 心跳的防刷新
    const recInterval = useRef(Math.random() * 1000); // 随机初始重连时间间隔
    let heartTimer = 0; //心跳定时器id
    let recTimer = 0; // 重连定时器id
    const WS_URL = `${wsUrl}/${userId}/${token}`; // websocket请求地址
  
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

    const sendMsgtoServer = (socket: WebSocket, message: string) => { // 发送信息 设置定时器
      socket.send(message);
    }

    useEffect(()=>{ // 重传判断处理
      if(!socket || !isConnected) return ;
      if(clientMessageId > msgAck+1){ // 需要重传
        const reMsg = infoCache.filter((msg: msg) => msg.clientMessageId === msgAck+1)
        sendMsgtoServer(socket, JSON.stringify(reMsg[0]));
      }
    },[clientTime, messageId])

    useEffect(()=>{ // 缓存清理判断处理
      console.log(clientMessageId, msgAck);
      
      if(!socket || !isConnected) return ;
      if(clientMessageId > msgAck+1) return ;
      // 清除不需要的缓存 这个迟点清理也不打紧的
      const needCache = infoCache.filter((msg: msg) => msg.clientMessageId > msgAck+40 || msg.clientMessageId > msgAck-20)
      setInfoCache(needCache); // 更新状态
      localStorage.setItem('Chat-sendMsg', JSON.stringify(needCache)); // 更新缓存
    },[messageId])
  
    useEffect(()=>{ // 新建WebSocket 只能初始化一次
      if(heartRef.current !== 1 || !token) return ; // 等待token
      setSocket(new WebSocket(WS_URL));
      heartRef.current++;
    },[token]);
  
    useEffect(()=>{ // websocket初始化
      if(!socket) return;
      socket.onopen = function() { // 连接建立
        console.log("[open] 连接已建立");
        dispatch(setConnected(true)); // redux 已连接
        heartCheck(socket);
        clearTimeout(recTimer);
        recInterval.current = Math.random() * 1000;
      }
      
      socket.onmessage = function(event) { // 接收到服务器的信息
        const data = JSON.parse(event.data)
        const type = data.messageType;
        switch(type){
          case -1: // token过期
            reqGetToken(name, color, icon, error).then(
              res => {
                dispatch(setAllUserInfo(res)) // 存到redux
                localStorage.setItem('Chat-User', JSON.stringify(res)) // 存到本地
              }
            )
            break;
          case 0: // 服务器收到信息
            const msgId0 = data.clientMessageId
            console.log('[message] 服务器收到信息->', msgId0);
            setMsgAck(prev => prev < msgId0 ? msgId0 : prev) // 取最大的
            setClientTime(data.clientTime);
            break;
          case 1: // 对方收到信息
            const msgId1 = data.clientMessageId
            console.log('[message] 对方收到信息->', msgId1);
            setMsgAck(prev => prev < msgId1 ? msgId1 : prev)
            setMessageId(data.messageId);
            break;
          case 3: // 握手之后服务器的回应
            console.log(`[message] 握手回应:`, data);
            break;
          case 4: // 心跳回应
            console.log(`[message] 心跳回应:`, data);
            break;
          case 6: // 群聊信息
            console.log('[message] 接收到群聊信息:', data);
            dispatch(setReceiveMsg(data))
            break;
        }
      } ;
      
      socket.onclose = function(event) { // 连接关闭
        dispatch(setConnected(false));
        clearInterval(heartTimer); // 清除定时器
        if (event.wasClean) {
          console.log(`[close] 连接完全关闭, code=${event.code} reason=${event.reason}`);
        } else {
          console.log('[close] 连接中断');
        }
        reconnect();
      };
      
      socket.onerror = function(error) { // 连接错误
        dispatch(setConnected(false));
        console.log("error:",error);
        reconnect();
      };
    },[socket]);
  
    useEffect(()=>{ // 输入信息的处理
      if(!socket || !sendMsg || !isConnected) return ;
        const temp_cache = [...infoCache, sendMsg]
        setInfoCache(temp_cache) // 存状态
        localStorage.setItem('Chat-sendMsg', JSON.stringify(temp_cache)); // 存本地
        sendMsgtoServer(socket, JSON.stringify(sendMsg));
        dispatch(setSendMsg(null)); // 清空需要发送的信息
    },[sendMsg]);
    
  return (
    <></>
  )
}

