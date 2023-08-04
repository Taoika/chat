import { useRef, useEffect, useState, useContext } from 'react'
import './index.scss'
import OtherSay from '../OtherSay'
import ISay from '../ISay'
import NewMsgAlert from '../NewMsgAlert'
import { AppContext } from '../../App'
import { msg, msgPullInfo } from '../../constant/type'
import { reqPost } from '../../utils/request'
import { getMsgUrl } from '../../constant/constant'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { setClientMessageId } from '../../store/slice/message'
import { setReceiveMsg } from '../../store/slice/websocket'

export default function Dialogue() {

  const dispatch = useAppDispatch()
  const { sendMsg, receiveMsg } = useAppSelector((state) => state.webSocket)
  const { clientMessageId } = useAppSelector((state) => state.message)
  const { userId, token } = useAppSelector((state) => state.userInfo)

  const { error, playAudio } = useContext(AppContext)!
  const [msg, setMsg] = useState<msg[]>([]); // 双方对话
  const dialogueRef = useRef<HTMLDivElement>(null); // 对话框
  const [display, setDisplay] = useState(false); // 新信息提示的显示
  const [msgPullInfo, setMsgPullInfo] = useState<msgPullInfo>({max: 9846573158236160, offset: 0}) // 信息拉取偏移
  const [atBottom, setAtBottom] = useState(true); // 是否在底部
  const [msgType, setMsgType] = useState<'pull' | 'send' | 'receive' | ''>(''); // pull send receive

  const toBottom = () => { // 滚动到最底部
    if(dialogueRef && dialogueRef.current){
      dialogueRef.current.scrollTop = dialogueRef.current.scrollHeight;
      setDisplay(false);
    }
  }

  const pullMsg = () => { // 信息拉取
    const data = {
      max: msgPullInfo.max,
      offset: msgPullInfo.offset,
      chatRoomId: 1
    }
    const config = { // 请求配置
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    setMsgType('pull');
    reqPost(getMsgUrl, data, config, error, "信息拉取失败").then(
      res => {
        setMsgPullInfo({
          max: res.max,
          offset: res.offset,
        })        
        setMsg(prev => [...res.resultList.reverse(), ...prev]); // resultList时间顺序从新到旧
      },
    )
  }

  useEffect(()=>{ // 新增信息处理      
    if(msgType === 'send'){
      toBottom()
    }
    else if(msgType === 'receive'){
      if(atBottom){
        toBottom()
      }
      else {
        setDisplay(true);
      }
    }
    else if(msgType === 'pull'){

    }
  },[msg]);

  useEffect(()=>{ // 滚动事件监听处理
    const dialogue = dialogueRef?.current
    if(!dialogue) return ;
    const handleScroll = (container: HTMLDivElement) => { // 滚动事件处理
      if(container.scrollTop + container.clientHeight + 200 >= container.scrollHeight){ // 底部
        setAtBottom(true);
      }
      else if(container.scrollTop >= 1000) { // 中间
        setAtBottom(false);
      }
    }
    dialogue.addEventListener('scroll', ()=>handleScroll(dialogue));
    return () => { // 及时清除滚动事件监听
      dialogue.removeEventListener('scroll', ()=>handleScroll(dialogue));
    }
  },[dialogueRef]);

  useEffect(()=>{ // 自己发送了信息
    if(!sendMsg) return ;
    setMsg([...msg, sendMsg]);
    localStorage.setItem('Chat-msgId', `${clientMessageId+1}`);
    dispatch(setClientMessageId(clientMessageId+1)) // 只要渲染到页面就应该自增了 不管有没有网络
    setMsgType('send');
  },[sendMsg]);

  useEffect(()=>{ // 收到信息
    if(!receiveMsg) return ;
    setMsg([...msg, receiveMsg]);
    dispatch(setReceiveMsg(null)); // 清空
    setMsgType('receive');
    playAudio();
  },[receiveMsg]);

  return (
    <div className='Dialogue' ref={dialogueRef}>
      {
        msg.map((value)=>{
          if(value.fromUserId === userId){
            return <ISay key={`${userId}-${value.clientMessageId}`} msg={value}>{value.message}</ISay>
          }
          else{
            return <OtherSay key={`${value.fromUserId}-${value.clientMessageId}`} msg={value}>{value.message}</OtherSay>
          }
        })
      }
      <div className="moreMsg" onClick={pullMsg}>查看更多信息</div>
      <NewMsgAlert onClick={toBottom} display={display} number={0}/>
    </div>
  )
}
