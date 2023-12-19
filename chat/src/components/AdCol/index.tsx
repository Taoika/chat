import { useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import './index.scss'

export default function AdCol() {

    const [height, setHeight] = useState('7vh')

    const handleJump = () => { // 跳转
        let win = window.open('_black')
        win = win ? win : window
        win.location.href = "https://qgailab.com/vi/"
    }

    const handleClose = (e: any) => { // 删除
        e.stopPropagation();
        setHeight('0vh')
    }
  return (
    <div className='AdCol' onClick={handleJump} style={{height: height}}>
        <div className='AdLeft'>
            <img src="https://pic-1316520471.cos.ap-guangzhou.myqcloud.com/vsicon.png" alt="icon"/>
            <span>点击跳转虚拟互动直播间！快邀请好友来同屏体验吧！</span>
        </div>
        <CloseOutlined className='closeBtn' onClick={handleClose}/>
    </div>
  )
}
