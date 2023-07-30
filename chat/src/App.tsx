import { useEffect } from "react"
import Home from "./pages/Home"
import './App.scss'
import axios from 'axios'
import { baseUrl, getTokenUrl } from "./constant"

export default function App() {

  const getToken = (username: string) => {

    const formData = new FormData();
    formData.append('client_secret', 'secret');
    formData.append('client_id', 'c1');
    formData.append('grant_type', 'password');
    formData.append('username', 'stopyc');
    formData.append('password', '123456');

    const config = {
      headers: {
         'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryrJj6yigwBXk1B57Q' 
        }
    }

    axios.post(`${baseUrl}${getTokenUrl}`, formData, config)
    .then(res=>{
      console.log('res->', res);
    }, err=>{
      console.log('err->', err);
    })
  }

  useEffect(()=>{
    axios.get('https://qifu-api.baidubce.com/ip/local/geo/v1/district?')
    .then(res=>{
      console.log('res->', res.data.ip);
      getToken(res.data.ip)
    },err=>{
      console.log('err->', err);
    })
  },[]);

  return (
    <div className="App">
      <Home/>
    </div>
  )
}
