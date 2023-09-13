import { useContext } from "react";
import { getMsgUrl } from "../constant/constant";
import { reqPost } from "../utils/request";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setMsgOffset, setChatMsg } from "../store/slice/message";
import { AppContext } from "../App";

const useRequest = () => { // 请求hook
    
    const dispatch = useAppDispatch()
    const { msgOffset, chatMsg } = useAppSelector((state) => state.message)
    const { token } = useAppSelector((state) => state.userInfo)
	const { error } = useContext(AppContext)!

	const reqGetMsg = () => {
		const data = {
			max: msgOffset.max,
			offset: msgOffset.offset,
			chatRoomId: 1
		  }
		const config = { // 请求配置
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
		reqPost(getMsgUrl, data, config, error, "信息拉取失败").then(
			res => {
				dispatch(setMsgOffset({ // 更新信息位移
				max: res.max,
				offset: res.offset,
				}))     
				
				const list =  res.resultList.reverse(); // 颠倒数组直接放进去set里面好像不行
				dispatch(setChatMsg([...list, ...chatMsg])); // 更新聊天信息
			},
		)
	}
	return { reqGetMsg }
}

export default useRequest;