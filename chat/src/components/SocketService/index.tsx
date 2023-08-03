import { useState, useEffect, useRef } from 'react'
import { wsUrl} from '../../constant/constant'
import { setReceiveMsg, setConnected, setSendMsg } from '../../store/slice/websocket'
import { useAppDispatch, useAppSelector } from "../../store/hook";

export default function SocketService() {
    const dispatch = useAppDispatch()
    const { isConnected, sendMsg } = useAppSelector((state) => state.webSocket)
    const { token } = useAppSelector((state) => state.userInfo)

    const [socket, setSocket] = useState<WebSocket>(); // socket
    const heartRef = useRef(1); // 心跳的防刷新
    const recInterval = useRef(Math.random() * 1000); // 随机初始重连时间间隔
    let heartTimer = 0; //心跳定时器id
    let recTimer = 0; // 重连定时器id
    const WS_URL = `${wsUrl}/${token}`; // websocket请求地址
  
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
  
    const wsInit = (socket: WebSocket) => { // WebSocket初始化
  
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
            setReceiveMsg(data);
            break;
        }
      };
      
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
    }
  
    useEffect(()=>{ // 新建WebSocket 只能初始化一次
      if(heartRef.current !== 1 || !token) return ; // 等待token
      setSocket(new WebSocket(WS_URL));
      heartRef.current++;
    },[token]);
  
    useEffect(()=>{ // websocket初始化
      if(!socket) return;
      wsInit(socket);
    },[socket]);
  
    useEffect(()=>{ // 发送信息给服务器
      if(!socket || !sendMsg || !isConnected) return ;
        socket.send(JSON.stringify(sendMsg));
        dispatch(setSendMsg(null)); // 清空需要发送的信息
    },[sendMsg]);
    
  return (
    <></>
  )
}

