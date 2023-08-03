import { useEffect, createContext, useRef } from "react"
import Home from "./pages/Home"
import './App.scss'
import { getTokenUrl, names, icons } from "./constant/constant"
import { reqPost } from "./utils/request"
import { getRandomColor, getRandomName, getRandomIconClass } from "./utils/random"
import voice from './assets/audio/audio.mp3'
import { message } from 'antd'

import { useAppDispatch } from "./store/hook"
import { setAllUserInfo } from "./store/slice/userInfo"

export const AppContext = createContext<{
  error: (errorMsg: string) => void,
  playAudio: ()=>void
} | null>(null)

const local = localStorage.getItem('Chat-User') // 从本地获取用户数据
const userInfo = local ? JSON.parse(local) : { token: '',  name: '', userId: '',color:'', icon: '' };

export default function App() {

  const dispatch = useAppDispatch() // 存到redux
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

  const getToken = (name: string, color: string, icon: string) => { // 获取token
    const formData= new FormData();
    formData.append('client_secret', 'secret');
    formData.append('client_id', 'c1');
    formData.append('grant_type', 'password');
    formData.append('username', `${name};${color};${icon}`);
    formData.append('password', '123456');
    const config = { // 请求配置
      headers: {
        'Content-Type': 'mult nameart/form-data', 
      }
    }

    reqPost(`${getTokenUrl}`, formData, config, error, 'token获取失败!').then(
      res => {
        const token = res.token
        const userId = res.userId;
        const userInfo = { token, userId, color, name, icon };

        dispatch(setAllUserInfo(userInfo)) // 存到redux

        localStorage.setItem('Chat-User', JSON.stringify(userInfo)) // 存到本地
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

    console.log(name, color, icon);
    
    getToken(name, color, icon)
    refresh.current++;
  },[]);

  return (
    <AppContext.Provider value={{ 'error': error, 'playAudio': playAudio}}>
      {contextHolder}
      <div className="App">
        <Home/>
        <audio ref={audioRef}>
        <source src={voice} type="audio/mpeg" />您的浏览器不支持 audio 元素!</audio>
      </div>
    </AppContext.Provider>
  )
}
