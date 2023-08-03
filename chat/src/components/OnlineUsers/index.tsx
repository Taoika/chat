import { useEffect, useContext, useState, useRef } from 'react';
import './index.scss'
import { reqGet } from '../../utils/request';
import { getOnlineUsersUrl } from '../../constant/constant';
import { AppContext } from '../../App';
import { onlineInfo } from '../../constant/type';

export default function OnlineUsers() {

    const { error, userInfo } = useContext(AppContext)!
    const [onlineInfo, setOnlineInfo] = useState<onlineInfo[]>()
    const refreshRef = useRef(1); // 防刷新

    useEffect(()=>{ // 定期获取在线用户信息
        if(refreshRef.current !== 1) return 
        const config = { // 请求配置
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        reqGet(getOnlineUsersUrl, config, error, '获取在线人数失败').then(
            res=>{
                setOnlineInfo(res);
            }
        )
        setInterval(()=>{
            reqGet(getOnlineUsersUrl, config, error, '获取在线人数失败').then(
                res=>{
                    setOnlineInfo(res);
                }
            )
          }, 5000);
        refreshRef.current++;
    },[]);

  return (
    <div className='OnlineUsers'>
        <div className="top">{onlineInfo?onlineInfo.length:0}</div>
        {
            onlineInfo?.map((value)=>(
                <div className="onlineUser" style={{'--user-color': value.color || 'black'} as React.CSSProperties} key={value.userId}>
                    <div className={`iconfont ${value.icon || 'ertong9'} avatar`}/>
                </div>
            ))
        }
    </div>
  )
}
