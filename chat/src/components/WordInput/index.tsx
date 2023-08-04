import { useState, useRef, useEffect } from 'react'
import './index.scss'
import { setSendMsg } from '../../store/slice/websocket'
import { useAppDispatch, useAppSelector } from "../../store/hook";

export default function WordInput() {

    const dispatch = useAppDispatch()
    const { userId, name, color, icon } = useAppSelector((state) => state.userInfo)
    const { clientMessageId } = useAppSelector((state) => state.message)

    const [text, setText] = useState(false); // 是否是文本输入
    const [wordInput, setWordInput] = useState(''); // 文本输入
    const textRef = useRef<HTMLInputElement>(null);

    const handleSwitch = () => { // 文本语音切换
        setText(!text);
    }

    const handleSend = () => { // 信息发送
        if(textRef && textRef.current){
            setWordInput(textRef.current.value);
            textRef.current.value = ''; 
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // 输入框的Enter监听
        if(event.key === 'Enter'){
            handleSend();
        }
    }

    useEffect(()=>{ // 发送信息到ws处理器
        if(!wordInput) return ;         
        const msg = {
          chatRoomId: 1,
          clientMessageId: clientMessageId,
          clientTime: Date.now(),
          fromUserId: userId,
          fromUserName: name,
          isText: true,
          message: wordInput,
          messageType: 6,
          icon: icon,
          color: color,
        }
        dispatch(setSendMsg(msg))
        setWordInput(''); // 及时清空
      },[wordInput]);

  return (
    <div className='WordInput'>
        <div className="switch" onClick={handleSwitch}>
            {
                text ? 
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1188" width="200" height="200">
                        <path d="M806.88 1002H202.2C90.74 1002 0.07 911.33 0.07 799.85V242.26c0-111.48 90.67-202.15 202.12-202.15h604.69c111.48 0 202.15 90.67 202.15 202.15v557.59c0 111.48-90.67 202.15-202.15 202.15zM202.2 120.61c-67.06 0-121.62 54.56-121.62 121.64v557.59c0 67.09 54.56 121.64 121.62 121.64h604.69c67.09 0 121.64-54.56 121.64-121.64V242.26c0-67.09-54.56-121.64-121.64-121.64l-604.69-0.01z" fill="#333333" p-id="1189"></path><path d="M243.31 395.56h522.48v80.5H243.31zM243.31 608.82h292.74v80.5H243.31z" fill="#333333" p-id="1190"></path>
                    </svg> : 
                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" p-id="899" width="200" height="200">
                        <path d="M636.16512 957.44l-70.80448-70.8096c107.59168-92.06272 176.03072-228.58752 176.03072-381.31712 0-145.49504-62.2848-276.1216-161.1776-367.77472L651.19232 66.56c117.01248 109.82912 190.51008 265.47712 190.51008 438.60992 0 180.44416-79.77984 341.90848-205.53728 452.27008z" fill="#333333" p-id="900"></path>
                        <path d="M445.08672 766.35648l-72.93952-72.92928c66.28352-36.64384 111.19104-107.16672 111.19104-188.25728 0-73.61536-37.04832-138.5216-93.47072-177.29024l71.62368-71.61344C535.72096 313.97376 583.68 403.88096 583.68 505.16992c0 108.65664-54.95808 204.44672-138.59328 261.18656zM253.96736 591.18592c-39.5776 0-71.66976-32.08192-71.66976-71.67488 0-39.59808 32.08704-71.67488 71.66976-71.67488 39.60832 0 71.68 32.0768 71.68 71.67488 0 39.59296-32.07168 71.67488-71.68 71.67488z" fill="#333333" p-id="901"></path>
                    </svg>
            }       
        </div>
        <div className="input"><input type="text" name="wordInput" id="wordInput" ref={textRef} onKeyDown={handleKeyDown}/></div>
        <div className="send" onClick={handleSend}>
            <svg className="icon" viewBox="0 0 1045 1024" version="1.1" p-id="1044" width="200" height="200">
                <path d="M989.184 87.530667c30.421333-10.154667 60.736 15.637333 55.594667 47.296l-128 789.333333a42.666667 42.666667 0 0 1-63.082667 30.336l-340.736-192.213333-154.837333 66.282666a42.666667 42.666667 0 0 1-59.349334-36.181333L298.666667 789.269333l0.256-147.733333-277.226667-156.373333c-31.168-17.6-27.882667-62.890667 4.181333-76.394667l3.306667-1.237333z m-39.936 103.232L147.349333 458.069333l215.253334 121.408a42.666667 42.666667 0 0 1 21.546666 33.706667l0.149334 3.541333-0.192 107.882667 114.666666-49.066667a42.666667 42.666667 0 0 1 34.218667 0.277334l3.541333 1.792 305.792 172.501333 106.922667-659.349333z m-127.146667 123.264a42.666667 42.666667 0 0 1-2.858666 57.728l-2.602667 2.346666-256 213.333334a42.666667 42.666667 0 0 1-57.216-63.189334l2.602667-2.346666 256-213.333334a42.666667 42.666667 0 0 1 60.074666 5.461334z" fill="#000000" p-id="1045"></path>
            </svg>
        </div>
    </div>
  )
}
