import { useEffect, createContext, useState, useRef } from "react"
import Home from "./pages/Home"
import './App.scss'
import { getTokenUrl, names } from "./constant/constant"
import { message } from 'antd'
import { reqPost } from "./utils/request"
import { getRandomColor, getRandomName } from "./utils/random"
import { userInfo } from "./constant/type"

export const AppContext = createContext<{
  userInfo: userInfo,
  error: (errorMsg: string) => void
} | null>(null)

const local = localStorage.getItem('Chat-User') // 从本地获取用户数据
const { token, name, userId, color } = local ? JSON.parse(local) : { token: '',  name: '', userId: '',color:'' };

export default function App() {

  const refresh = useRef(1); // 刷新次数 使请求只发一次  

  const [userInfo, setUserInfo] = useState({token, name, userId, color})

  const [messageApi, contextHolder] = message.useMessage();

  const error = (errorMsg: string) => { // 错误全局提示
    messageApi.open({
      type: 'error',
      content: errorMsg,
    });
  };

  const getToken = (name: string, color: string) => { // 获取token
    const formData= new FormData();
    formData.append('client_secret', 'secret');
    formData.append('client_id', 'c1');
    formData.append('grant_type', 'password');
    formData.append('username', name+';'+color);
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
        const userInfo = { token, userId, color, name }

        setUserInfo(userInfo)// 存到状态
        localStorage.setItem('Chat-User', JSON.stringify(userInfo)) // 存到本地
      }
    )
  }

  useEffect(()=>{ // 获取 name
    if(refresh.current !== 1) return; // 刷新不允许进入
    if(userInfo.token && userInfo.name && userInfo.userId&& userInfo.color) return ; // 本地存在用户信息不允许进入

    const name = getRandomName(names)
    const color = getRandomColor()
    
    getToken(name,color)
    refresh.current++;
  },[]);

  return (
    <AppContext.Provider value={{'userInfo': userInfo, 'error': error}}>
      {contextHolder}
      <div className="App">
        <Home/>
      </div>
    </AppContext.Provider>
  )
}
