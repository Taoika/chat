import { useState, useRef, useEffect } from 'react'
import './index.scss'
import { MessageOutlined, SoundOutlined, RocketOutlined } from '@ant-design/icons'
import { setSendMsg } from '../../store/slice/websocket'
import { setClientMessageId } from '../../store/slice/message'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import useMediaRecorder from '../../hooks/useMediaRecorder'
import { input, chatRoomUserInfo } from '../../constant/type'
import ActerList from '../ActerList'

export default function WordInput() {

    const dispatch = useAppDispatch()
    const { userId, name, color, icon } = useAppSelector((state) => state.userInfo)
    const { clientMessageId } = useAppSelector((state) => state.message)

    const [text, setText] = useState(true); // 是否是文本输入
    const [recording, setRecording] = useState(false); // 录音中
    const [wordInput, setWordInput] = useState<input | null>(null); // 输入
    const [acterHidden, setActerHidden] = useState(true); // 唤醒@
    const [queryString, setQueryString] = useState("");
    const [acterArr, setActerArr] = useState<chatRoomUserInfo[]>([]); // 被@的用户
    const textRef = useRef<HTMLInputElement>(null);

    const { startRecord, stopRecord } = useMediaRecorder(setRecording, setWordInput); // 录音hook

    const handleSwitch = () => { // 文本语音切换
        setText(!text);
    }

    const handleSend = () => { // 文本信息发送        
        if(textRef.current){            
            setWordInput({
                data: { 
                    content: textRef.current.value,
                    atUserId: acterArr.map(value=>value.userId),
                }, 
                messageContentType: 8
            });
            textRef.current.value = ''; 
        }
    }

    const handleChange = (event: any) => { // 输入框文本变化  
        if(event.nativeEvent.data === '@'){ // 输入了@
            setQueryString(''); // 清空查询字符串 之后用户输入的都作为查询依据
            handleShow();
        }
        else if(!acterHidden){ // 不是输入@ 用户列表显示
            setQueryString(`${queryString}${event.nativeEvent.data}`)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // 输入框 按键
        if (!acterHidden) { // 用户列表显示
            switch(event.code){
                case "ArrowUp":
                case "ArrowDown":
                case "Enter":
                case "Escape":
                    event.preventDefault();break;
            }
        }
        else if(event.key === 'Enter'){ // 用户列表隐藏 键入Enter
            handleSend();
        }
    }

    const handlePickUser = (user: chatRoomUserInfo) => { // 选择了某个用户
        const input = textRef.current
        if(!input || !input.selectionStart) return ;
        const atPosi = input.value.lastIndexOf('@', input.selectionStart);
        const preText = input.value.slice(0, atPosi); // @前 不包括@以及模糊搜索部分
        
        const nextText = input.value.slice(input.selectionStart, input.value.length) // @后
        console.log(preText, nextText);
        const newText = `${preText}@${user.username} ${nextText}`; // 加上@
        input.value = newText;
        setActerArr(prev=>[...prev, user]);
        handleHidden();
    };

    const handleHidden = () => { // 用户列表隐藏
        setActerHidden(true);
        setQueryString('');
    }

    const handleShow = () => { // 用户列表显示
        setActerHidden(false);
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
          messageType: 6, // 群聊信息类型
          icon: icon,
          color: color,
        }
        localStorage.setItem('Chat-msgId', `${clientMessageId+1}`);
        dispatch(setClientMessageId(clientMessageId+1)) // 信息序号自增自增 不管有没有网络
        dispatch(setSendMsg(msg)) // 传给ws处理器
        setActerArr([]);
        setWordInput({
            data: {content: '', atUserId: []},
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
            text ? 
                <div className="input_container">
                    <input 
                        className='input' 
                        ref={textRef} 
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div> :
            !recording ? 
                <div className="speech" onClick={startRecord}>点击说话</div> : 
                <div className="speech" onClick={stopRecord}>结束语音</div>
        }
        <div className="send" onClick={handleSend}><RocketOutlined className='icon'/></div>
        <ActerList 
            hidden={acterHidden} 
            queryString={queryString}
            onPickUser={handlePickUser} 
            onHide={handleHidden}
        />
    </div>
  )
}
