import { useRef, useEffect, useState, useContext } from 'react'
import './index.scss'
import OtherSay from '../OtherSay'
import ISay from '../ISay'
import NewMsgAlert from '../NewMsgAlert'
import { AppContext } from '../../App'
import { serverMsg } from '../../constant/type'
import { useAppSelector } from "../../store/hook";
import useRequest from '../../hooks/useRequest'

// 新增信息的类型 自己发的信息 一开始收到的群聊信息（包括自己的跟别人的）别人发的信息
export default function Dialogue() {

  const { reqGetMsg } = useRequest();
  const { sendMsg } = useAppSelector((state) => state.webSocket)
  const { userId } = useAppSelector((state) => state.userInfo)
  const { chatMsg } = useAppSelector((state) => state.message)

  const { playAudio } = useContext(AppContext)!
  const dialogueRef = useRef<HTMLDivElement>(null); // 对话框
  const [msg, setMsg] = useState<serverMsg[]>([]); // 双方对话
  const [newMsgDisplay, setNewMsgDisplay] = useState(false); // 新信息提示的显示
  const [atBottom, setAtBottom] = useState(true); // 是否在底部
  const [msgType, setMsgType] = useState<'pull' | 'send' | 'receive'>('pull'); // pull send receive

  const toBottom = () => { // 滚动到最底部
    const dialogue = dialogueRef.current
    if(!dialogue) return   
    dialogue.scrollTop = dialogue.scrollHeight;
    setNewMsgDisplay(false);
  }

  const handleScroll = (container: HTMLDivElement) => { // 滚动事件处理
    if(container.scrollTop + container.clientHeight + 200 >= container.scrollHeight){ // 底部
      setAtBottom(true);
    }
    else if(container.scrollTop >= 1000) { // 中间
      setAtBottom(false);
    }
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
        setNewMsgDisplay(true);
      }
    }
  },[msg]);

  useEffect(()=>{ // 滚动事件监听处理
    const dialogue = dialogueRef?.current
    if(!dialogue) return ;
    dialogue.onscroll = () => handleScroll(dialogue);
  },[dialogueRef]);

  useEffect(()=>{ // 自己发送了信息
    if(!sendMsg) return ;
    setMsg([...msg, sendMsg]);
    setMsgType('send');
  },[sendMsg]);

  useEffect(()=>{ // 收到信息
    if(!chatMsg.length) return ;
    setMsg(chatMsg);
    setMsgType('receive');  
    playAudio();
  },[chatMsg]);

  return (
    <div className='Dialogue' ref={dialogueRef}>
      {        
        msg.map((value)=>{
          if(value.fromUserId === userId){
            return <ISay key={value.messageId} msg={value}></ISay>
          }
          else{
            return <OtherSay key={value.messageId} msg={value}></OtherSay>
          }
        })
      }
      <div className='moreMsg' onClick={reqGetMsg}>查看更多信息</div>
      <NewMsgAlert onClick={toBottom} display={newMsgDisplay} number={0}/>
    </div>
  )
}
