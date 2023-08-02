import './index.scss'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { msg } from '../../constant/type';

type props = {
  children: React.ReactNode,
  msg: msg,
}

export default function OtherSay(props: props) {

  const {children, msg} = props;
  const {color, fromUserName} = msg;

  return (
    <div className='Say OtherSay'>
        <Avatar   
          className='avatar'
          style={{
            margin: '0 16px',
            backgroundColor: color || 'white',
          }}
          shape="square" 
          size="large" 
          icon={<UserOutlined />} 
        />
        <div className="bubble" style={{'--bubble-background':color || 'green'} as React.CSSProperties}>{children}</div>
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
