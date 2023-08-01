import { useEffect, createContext, useState, useRef } from "react"
import Home from "./pages/Home"
import './App.scss'
import { getTokenUrl } from "./constant/constant"
import axios from 'axios'
import { message } from 'antd'

type userInfo = {
  token: string, 
  ip: string, 
  userId: string,
}

export const AppContext = createContext<{
  userInfo: userInfo,
} | null>(null)

const local = localStorage.getItem('user') // 从本地获取用户数据
const userLocal = local ? JSON.parse(local) : {token: '', ip: '', userId: ''};

export default function App() {

  const refresh = useRef(1); // 刷新次数 使请求只发一次  

  const [userInfo, setUserInfo] = useState({
    token: userLocal?.token,
    ip: userLocal?.ip, 
    userId: userLocal?.userId,
  })

  const [messageApi, contextHolder] = message.useMessage();

  const error = (errorMsg: string) => { // 错误全局提示
    messageApi.open({
      type: 'error',
      content: errorMsg,
    });
  };

  const getToken = (username: string) => { // 获取token
    const formData = new FormData();
    formData.append('client_secret', 'secret');
    formData.append('client_id', 'c1');
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', '123456');

    const config = { // 请求配置
      headers: {
        'Content-Type': 'multipart/form-data', 
      }
    }

    axios.post(`${getTokenUrl}`, formData, config)
    .then(res=>{
      const token = res.data.data.token
      const userId = res.data.data.userId;

      setUserInfo({ // 存到状态
        token: token,
        ip: username, 
        userId: userId,
      })
      
      localStorage.setItem('user', JSON.stringify({ // 存到本地
        'token': token,
        'ip': username,
        'userId': userId,
      }))
    }, err=>{
      console.log('err->', err);
      error('token获取失败!');
    })
  }

  useEffect(()=>{ // 获取本机ip
    if(refresh.current !== 1) return; // 刷新不允许进入
    if(userInfo.token && userInfo.ip && userInfo.userId) return ; // 本地存在用户信息不允许进入

    axios.get('https://qifu-api.baidubce.com/ip/local/geo/v1/district?')
    .then(res=>{
      const ip = res.data.ip
      console.log('获取token');
      
      getToken(ip)
    },err=>{
      console.log('err->', err);
      error('ip获取失败!');
    })
    refresh.current++;
  },[]);

  return (
    <AppContext.Provider value={{'userInfo': userInfo}}>
      {contextHolder}
      <div className="App">
        <Home/>
      </div>
    </AppContext.Provider>
  )
}
