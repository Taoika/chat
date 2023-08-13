import { useEffect, useContext, useState, useRef } from 'react';
import './index.scss'
import { reqGet } from '../../utils/request';
import { getOnlineUsersUrl } from '../../constant/constant';
import { AppContext } from '../../App';
import { onlineInfo } from '../../constant/type';
import { useAppSelector } from "../../store/hook";

export default function OnlineUsers() {

    const { token } = useAppSelector((state) => state.userInfo)

    const { error } = useContext(AppContext)!
    const [onlineInfo, setOnlineInfo] = useState<onlineInfo[]>()
    const [appear, setAppear] = useState(false)
    const refreshRef = useRef(1); // 防刷新
    const onlineRef = useRef<HTMLDivElement>(null)

    const handleClick = () => { // 在线人数点击事件
        if(window.innerWidth <= 600){
            if(!onlineRef.current) return 
            onlineRef.current.style.opacity = !appear ?  '1' :  '0';
            setAppear(!appear);
        }
    }

    useEffect(()=>{ // 定期获取在线用户信息
        if(refreshRef.current !== 1 || !token) return 
        const config = { // 请求配置
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        setInterval(()=>{
            reqGet(getOnlineUsersUrl, config, error, '获取在线人数失败').then(
                res=>{
                    setOnlineInfo(res);
                }
            )
          }, 660000);
        refreshRef.current++;
    },[token]);

  return (
    <div className='OnlineUsers'>
        <div className="top" onClick={handleClick}>{onlineInfo?onlineInfo.length:0}</div>
        <div className="body" ref={onlineRef}>
            {
                onlineInfo?.map((value)=>(
                    <div 
                        className='onlineUser'
                        style={{'--user-color': value.color || 'black'} as React.CSSProperties} 
                        key={value.userId}
                    >
                        <div className={`iconfont ${value.icon || 'ertong9'} avatar`}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
