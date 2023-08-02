import './index.scss'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { msg } from '../../constant/type';

type props = {
  children: React.ReactNode,
  msg: msg,
}

export default function ISay(props: props) {

  const { children, msg } = props; 
  const { color, fromUserName } = msg;

  return (
    <div className='Say ISay'>
        <div className="bubble" style={{'--bubble-background': color || 'white'} as React.CSSProperties}>{children}</div>
        <Avatar 
          className='avatar'
          style={{
            margin: '0 16px',
            backgroundColor: color || 'black',
          }} 
          shape="square" 
          size="large" 
          icon={<UserOutlined />} 
        />
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
