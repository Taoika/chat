import { useState, useRef, useEffect, useContext } from 'react'
import './index.scss'
import { MessageOutlined, SoundOutlined, RocketOutlined } from '@ant-design/icons'
import { setSendMsg } from '../../store/slice/websocket'
import { setClientMessageId } from '../../store/slice/message'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import useMediaRecorder from './mediaRecorder'
import { input } from '../../constant/type'

export default function WordInput() {

    const dispatch = useAppDispatch()
    const { userId, name, color, icon } = useAppSelector((state) => state.userInfo)
    const { clientMessageId } = useAppSelector((state) => state.message)

    const [text, setText] = useState(true); // 是否是文本输入
    const [recording, setRecording] = useState(false); // 录音中
    const [wordInput, setWordInput] = useState<input | null>(null); // 输入
    const textRef = useRef<HTMLInputElement>(null);

    const { startRecord, stopRecord } = useMediaRecorder(setRecording, setWordInput);

    const handleSwitch = () => { // 文本语音切换
        setText(!text);
    }

    const handleSend = () => { // 信息发送
        if(textRef && textRef.current){
            setWordInput({
                data: {
                    content: textRef.current.value.trimStart() // 去除空格
                }, 
                messageContentType: 8
            });
            textRef.current.value = ''; 
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // 输入框的Enter监听
        if(event.key === 'Enter'){
            handleSend();
        }
    }

    const handleWordChange = () => { // 文本变化

    }

    useEffect(()=>{ // 发送信息处理
        if(!wordInput?.data.content || wordInput.messageContentType === -1) return ;    
        const msg = {
          chatRoomId: 1,
          clientMessageId: clientMessageId,
          clientTime: Date.now(),
          fromUserId: userId,
          fromUserName: name,
          isText: true,
          data: wordInput.data  ,
          messageContentType: wordInput.messageContentType,
          messageType: 6,
          icon: icon,
          color: color,
        }
        localStorage.setItem('Chat-msgId', `${clientMessageId+1}`);
        dispatch(setClientMessageId(clientMessageId+1)) // 信息序号自增自增 不管有没有网络
        dispatch(setSendMsg(msg)) // 传给ws处理器
        setWordInput({
            data: {content: ''},
            messageContentType: -1
        }); // 及时清空
    },[wordInput]);

  return (
    <div className='WordInput'>
        <div className="switch" onClick={handleSwitch}>
            {
                text ? <MessageOutlined className='icon'/> : <SoundOutlined className='icon'/>
            }       
        </div>
        {
            text ? <div className="input"><input type="text" name="wordInput" id="wordInput" ref={textRef} onKeyDown={handleKeyDown} onChange={handleWordChange}/></div> :
            !recording ? 
                <div className="speech" onClick={startRecord}>点击说话</div> : 
                <div className="speech" onClick={stopRecord}>结束语音</div>
        }
        <div className="send" onClick={handleSend}>
            <RocketOutlined className='icon'/>
        </div>
    </div>
  )
}
