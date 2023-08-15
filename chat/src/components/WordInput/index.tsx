import { useState, useRef, useEffect, useContext } from 'react'
import './index.scss'
import { MessageOutlined, SoundOutlined, RocketOutlined } from '@ant-design/icons'
import { setSendMsg } from '../../store/slice/websocket'
import { setClientMessageId } from '../../store/slice/message'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import useMediaRecorder from './mediaRecorder'
import { input, chatRoomUserInfo } from '../../constant/type'
import { checkLastCharActer } from '../../utils/stringChange'
import { getChatRoomUsersUrl } from '../../constant/constant'
import { reqGet } from '../../utils/request'
import { AppContext } from '../../App'
import ActerList from '../ActerList'

export default function WordInput() {

    const dispatch = useAppDispatch()
    const { userId, name, color, icon, token } = useAppSelector((state) => state.userInfo)
    const { clientMessageId } = useAppSelector((state) => state.message)

    const { error } = useContext(AppContext)!
    const [text, setText] = useState(true); // 是否是文本输入
    const [recording, setRecording] = useState(false); // 录音中
    const [wordInput, setWordInput] = useState<input | null>(null); // 输入
    const [acterHidden, setActerHidden] = useState(true); // 唤醒@
    const [chatRoomUser, setChatRoomUser] = useState<chatRoomUserInfo[]>([]); // 房间用户信息
    const [acterList, setActerList] = useState<chatRoomUserInfo[]>([]); // acter对象列表
    const [addActer, setAddActer] = useState(false);
    const textRef = useRef<HTMLInputElement>(null);

    const { startRecord, stopRecord } = useMediaRecorder(setRecording, setWordInput); // 录音hook

    const handleSwitch = () => { // 文本语音切换
        setText(!text);
    }

    const handleSend = () => { // 信息发送
        if(textRef && textRef.current){
            setWordInput({
                data: {
                    content: textRef.current.value.trimStart() // 去除空格 如果全部是空格 那么这是一个空的content 是不会发送的
                }, 
                messageContentType: 8
            });
            textRef.current.value = ''; 
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // 输入框的Enter监听
        if(event.key === 'Enter' && acterHidden){
            handleSend();
        }
    }

    const handleWordChange = (event: any) => { // 文本变化
        if(event.nativeEvent.inputType === 'insertCompositionText' && checkLastCharActer(event.target.value)){ // @处理
            reqGet(getChatRoomUsersUrl, token, error, '获取群聊用户失败!').then(
                res => {
                    const onlineUser = res.filter((user: chatRoomUserInfo) => user.online===true)
                    const offLineUser = res.filter((user: chatRoomUserInfo) => user.online=== false)
                    const acterList = [...onlineUser, ...offLineUser];
                    setChatRoomUser(acterList);
                    setActerHidden(false)
                    setAddActer(true);
                }
            )
        }
        else {
            setActerHidden(true);
        }
    }

    useEffect(()=>{ // @列表变化
        if(!textRef.current || !acterList[0] || !addActer) return ;
        textRef.current.value = `${textRef.current.value} ${acterList[acterList.length-1].username}`
        setActerHidden(true);
        setAddActer(false);
    },[acterList]);

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

    useEffect(()=>{ // 全局监听事件
        const handleClick = () => {
            setActerHidden(true);
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if(event.key === 'Escape' || event.key === 'Enter'){
                setActerHidden(true);
            }
        }
        window.addEventListener('click', ()=>handleClick());
        window.addEventListener('keydown', (event)=>handleKeyDown(event));
        return ()=>{
            window.removeEventListener('click', ()=>handleClick());
            window.removeEventListener('keydown', (event)=>handleKeyDown(event));
    }
    },[]);

  return (
    <div className='WordInput'>
        <ActerList hidden={acterHidden} chatRoomUser={chatRoomUser} acterListState={{setActerList: setActerList, acterList: acterList}}/>
        <div className="switch" onClick={handleSwitch}>
            {
                text ? <MessageOutlined className='icon'/> : <SoundOutlined className='icon'/>
            }       
        </div>
        {
            text ? 
                <div className="input">
                    <input 
                        type="text" 
                        name="wordInput" 
                        id="wordInput" 
                        autoComplete='off'
                        ref={textRef} 
                        onKeyDown={handleKeyDown} 
                        onChange={(event)=>handleWordChange(event)}
                    />
                </div> :
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
