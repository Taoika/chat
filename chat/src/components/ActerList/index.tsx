import { useState, useRef, useEffect } from 'react';
import './index.scss'
import { chatRoomUserInfo } from '../../constant/type';

type props = {
    hidden: boolean,
    chatRoomUser: chatRoomUserInfo[],
    acterListState: {
        setActerList: React.Dispatch<React.SetStateAction<chatRoomUserInfo[]>>,
        acterList: chatRoomUserInfo[],
    },
}

export default function ActerList(props: props) {
    const { hidden, chatRoomUser, acterListState } = props;
    const { acterList, setActerList } = acterListState;

    const [selected, setSelected] = useState(0);
    const listRef = useRef<HTMLUListElement>(null);

    const handleActer = (user: chatRoomUserInfo) => { // 处理@
        setActerList([...acterList, user])
    }

    useEffect(()=>{ // selected的改变
        if(!listRef.current || hidden) return ;
        const list = listRef.current.childNodes;
        list.forEach((value)=>{
            const node = value as HTMLLIElement;
            node.classList.remove('selected');
        })
        const node = list[selected] as HTMLLIElement;
        if(!node) return ;
        node.classList.add('selected');
    },[selected, hidden]);

    useEffect(()=>{ // 按键监听
        if(hidden) return ;
        const handleKeyDown = (event: KeyboardEvent) => {
            switch(event.key){
                case 'ArrowDown':
                    console.log('进来');
                    setSelected(prev=>{
                        console.log(prev);
                        return prev+1
                    });
                    break;
                case 'ArrowUp':
                    console.log('进来');
                    setSelected(prev=>{
                        console.log(prev);
                        return prev==0?0:prev-1});
                    break;
                case 'Enter':
                    if(!listRef.current) break;
                    const list = [...listRef.current.childNodes]; // 不这样展开放进去下面过滤会报错的
                    const node = list.filter((value: any)=>value.classList.contains('selected'))[0] as HTMLLIElement
                    const userId = node.getAttribute('user-id')
                    if(!userId) break;
                    const userInfo = chatRoomUser.filter((value)=>value.userId==parseInt(userId))
                    setActerList([...acterList, userInfo[0]])
                    break;
            }
        }
        console.log('添加监听');
        
        window.addEventListener('keydown', (event) => handleKeyDown(event));
        return ()=>{
            console.log('去除监听');
            
            window.removeEventListener('keydown', (event) => handleKeyDown(event));
        }
    },[hidden]);
    
  return (
    <ul className={`ActerList ${hidden?'hidden':''}`} ref={listRef}>
        {
            chatRoomUser.map((value)=>(
                <li className='Acter_user' key={value.userId} user-id={value.userId} onClick={()=>handleActer(value)}>
                    <div className={`iconfont ${value.icon} avatar`} style={{backgroundColor: value.color}}/>
                    <div className="name">{value.username}</div>
                </li>
            ))
        }
    </ul>
  )
}
