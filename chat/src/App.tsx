import { useEffect, createContext, useRef } from "react"
import Home from "./pages/Home"
import AdCol from "./components/AdCol"
import './App.scss'
import { names, icons } from "./constant/constant"
import { reqGetToken } from "./utils/request"
import { getRandomColor, getRandomName, getRandomIconClass } from "./utils/random"
import voice from './assets/audio/audio.mp3'
import { message } from 'antd'

import { useAppDispatch } from "./store/hook"
import { setAllUserInfo } from "./store/slice/userInfo"

export const AppContext = createContext<{
  error: (errorMsg: string) => void,
  playAudio: ()=>void,
} | null>(null)

const local = localStorage.getItem('Chat-User') // 从本地获取用户数据
const userInfo = local ? JSON.parse(local) : { token: '',  name: '', userId: '',color:'', icon: '' };

export default function App() {

  const dispatch = useAppDispatch()
  dispatch(setAllUserInfo(userInfo));

  const refresh = useRef(1); // 刷新次数 使请求只发一次  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const error = (errorMsg: string) => { // 错误全局提示
    messageApi.open({
      type: 'error',
      content: errorMsg,
    });
  };

  const getToken = async (name: string, color: string, icon: string) => { // 获取token
    await reqGetToken(name, color, icon, error).then(
      res => {
        dispatch(setAllUserInfo(res)) // 存到redux
        localStorage.setItem('Chat-User', JSON.stringify(res)) // 存到本地
      }
    )
  }

  const playAudio = () => { // 声音提示
    audioRef.current && audioRef.current.play();
  };

  useEffect(()=>{ // 获取 name color 头像
    if(refresh.current !== 1) return; // 刷新不允许进入
    if(userInfo.token && userInfo.name && userInfo.userId&& userInfo.color) return ; // 本地存在用户信息不允许进入

    const name = getRandomName(names)
    const color = getRandomColor()
    const icon = getRandomIconClass(icons);
    
    getToken(name, color, icon)
    refresh.current++;
  },[]);

  return (
      <AppContext.Provider value={{'error': error, 'playAudio': playAudio}}>
        {contextHolder}
        <div className="App">
          <AdCol/>
          <Home/>
          <audio ref={audioRef}>
            <source src={voice} type="audio/mpeg"/>
            您的浏览器不支持 audio 元素!
          </audio>
        </div>
      </AppContext.Provider>
  )
}
