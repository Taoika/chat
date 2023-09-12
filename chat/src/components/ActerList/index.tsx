import { useState, useRef, useEffect, useContext } from 'react';
import './index.scss'
import { useAppSelector } from "../../store/hook";
import { chatRoomUserInfo } from '../../constant/type';
import { getChatRoomUsersUrl } from '../../constant/constant'
import { reqGet } from '../../utils/request'
import { AppContext } from '../../App'

type props = {
    hidden: boolean,
    queryString: string,
    onPickUser: (user: chatRoomUserInfo) => void,
    onHide: () => void,
}

const getSelected = (ul: HTMLUListElement): HTMLLIElement => { // 获取ul当前选择的节点li
    const list = [...ul.childNodes]; // 用户列表
    return list.filter((value: any)=>value.classList.contains('selected'))[0] as HTMLLIElement // 当前选择的节点
}

export default function ActerList(props: props) {
    const { token } = useAppSelector((state) => state.userInfo)

    const { hidden, queryString, onPickUser, onHide } = props;

    const { error } = useContext(AppContext)!
    const [selected, setSelected] = useState(0);
    const [chatRoomUser, setChatRoomUser] = useState<chatRoomUserInfo[]>([]); // 房间所有用户信息
    const [searchUsers, setSearchUsers] = useState<chatRoomUserInfo[]>([]); // 符合搜索条件的用户信息
    const listRef = useRef<HTMLUListElement>(null);
    const refreshRef = useRef(0);

    const handleActer = (user: chatRoomUserInfo) => { // 处理@
        onPickUser(user);
    }

    const searchUser = (queryString?: string) => { // 搜索用户
        return queryString
          ? chatRoomUser.filter(({ username }) => username.startsWith(queryString))
          : chatRoomUser.slice(0);
    };

    const handleArrowDown = () => { // 下箭头处理
        // 记住这是在监听里面的
        if(!listRef.current) return ;
        const node = getSelected(listRef.current)
        console.log(node);
        
    }

    useEffect(() => { // 查找词汇改变
        const filterdUsers = searchUser(queryString);
        setSelected(0); // 重置选择点
        setSearchUsers(filterdUsers);        
        if (!filterdUsers.length) {
          onHide();
        }
    }, [queryString]);

    useEffect(()=>{ // 获取群聊用户信息
        if(refreshRef.current) return ;
        reqGet(getChatRoomUsersUrl, token, error, '获取群聊用户失败!').then( 
        res => {
            const onlineUser = res.filter((user: chatRoomUserInfo) => user.online===true)
            const offLineUser = res.filter((user: chatRoomUserInfo) => user.online=== false)
            const acterList = [...onlineUser, ...offLineUser];
            setChatRoomUser(acterList);
            setSearchUsers(acterList);
        }
    )
    },[]);

    useEffect(()=>{ // selected的改变
        if(!listRef.current || hidden) return ;
        const list = listRef.current.childNodes;
        list.forEach((value)=>{ // 全部移除select类名
            const node = value as HTMLLIElement;
            node.classList.remove('selected');
        })
        const node = list[selected] as HTMLLIElement;
        if(!node) return ;
        node.classList.add('selected');
    },[selected]);

    useEffect(()=>{ // 按键监听 因为焦点不在列表上面 所有用全局监听
        if(hidden) return ;
        const handleKeyUp = (event: KeyboardEvent) => { // 按键处理
            switch(event.key){
                case 'Escape': // 取消
                    onHide();break;
                case 'ArrowDown': // 下箭头
                    handleArrowDown();
                    setSelected(prev=>prev+1);break;
                case 'ArrowUp': // 上箭头
                    setSelected(prev=>prev==0?0:prev-1);break;
                case 'Enter': // 输入
                    if(!listRef.current) break;
                    const node = getSelected(listRef.current);
                    const userId = node.getAttribute('user-id') // 当前选择的用户id
                    if(!userId) break;
                    const userInfo = searchUsers.filter((value)=>value.userId==parseInt(userId)) // 获取用户信息
                    onPickUser(userInfo[0]);
                    break;
            }
        }
        window.addEventListener('keyup', handleKeyUp, true);
        return ()=>{
            window.removeEventListener('keyup', handleKeyUp, true);
        }
    },[hidden]);
    
  return (
    <>
        <ul className={`ActerList ${hidden?'hidden':''}`} ref={listRef}>
            {
                searchUsers.length ? 
                searchUsers.map((value)=>(
                    <li className='Acter_user' key={value.userId} user-id={value.userId} onClick={()=>handleActer(value)}>
                        <div className={`iconfont ${value.icon} avatar`} style={{backgroundColor: value.color}}/>
                        <div className="name">{value.username}</div>
                    </li>
                )): '无搜索结果'
            }
        </ul>
    </>

  )
}
