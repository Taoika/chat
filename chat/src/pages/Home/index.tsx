import { useEffect } from 'react'
import './index.scss'
import LeftSidebar from '../../components/LeftSidebar'
import Dialogue from '../../components/Dialogue'
import WordInput from '../../components/WordInput'
import OnlineUsers from '../../components/OnlineUsers'
import useSocketService from '../../hooks/useSocketService'
import useRequest from '../../hooks/useRequest'
import {useAppSelector} from "../../store/hook.ts";

export default function Home() {

    const { reqGetMsg } = useRequest();
    useSocketService();
    const { token } = useAppSelector((state) => state.userInfo)

    useEffect(() => { // 拉取群聊历史信息
        if(!token) return 
        reqGetMsg(); 
    }, [token]);

    return (
        <div className='Home'>
            <LeftSidebar/>
            <div className="rightChat">
                <Dialogue/>
                <WordInput/>
            </div>
            <OnlineUsers/>
        </div>
    )
}
