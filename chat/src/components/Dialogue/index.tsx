import { useContext, useRef, useEffect, useState } from 'react'
import './index.scss'
import OtherSay from '../OtherSay'
import ISay from '../ISay'
import NewMsgAlert from '../NewMsgAlert'
import { msg } from '../../constant/type'
import { AppContext } from '../../App'

type props = {
  msg: msg[],
  newMsg: {
    newMsgState: number,
    setNewMsg: React.Dispatch<React.SetStateAction<number>>,
  },
  setScroll: React.Dispatch<React.SetStateAction<number>>,
}

export default function Dialogue(props: props) {

  const { userInfo } = useContext(AppContext)!
  const { msg, setScroll, newMsg } = props;
  const { newMsgState, setNewMsg } = newMsg;
  const dialogueRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(false); // 新信息提示的显示

  const handleScroll = (container: HTMLDivElement) => { // 滚动事件处理
    setScroll(container.scrollTop);
  }

  const toBottom = () => { // 滚动到最底部
    if(dialogueRef && dialogueRef.current){
      dialogueRef.current.scrollTop = dialogueRef.current.scrollHeight;
      setDisplay(false);
      setNewMsg(0)
    }
  }

  useEffect(()=>{ // 信息到来   
    if(newMsgState != 0 && msg[msg.length-1]?.fromUserId === userInfo.userId){ // 自己的新信息
      toBottom();
    }    
    else if(newMsgState != 0) { // 别人的新信息
      setDisplay(true);
    }
  },[newMsgState, msg]);

  useEffect(()=>{ // 滚动事件监听
    const dialogue = dialogueRef?.current
    if(!dialogue) return ;
    
    dialogue.addEventListener('scroll', ()=>handleScroll(dialogue));

    return () => { // 及时清除滚动事件监听
      dialogue.removeEventListener('scroll', ()=>handleScroll(dialogue));
    }
  },[dialogueRef]);

  return (
    <div className='Dialogue' ref={dialogueRef}>
      {
        msg.map((value)=>{
          if(value.fromUserId === userInfo.userId){
            return <ISay key={`${userInfo.userId}-${value.clientMessageId}`} msg={value}>{value.message}</ISay>
          }
          else{
            return <OtherSay key={`${value.fromUserId}-${value.clientMessageId}`} msg={value}>{value.message}</OtherSay>
          }
        })
      }
      <NewMsgAlert onClick={toBottom} display={display} number={newMsgState}/>
    </div>
  )
}
