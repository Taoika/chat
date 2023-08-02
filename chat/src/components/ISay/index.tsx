import './index.scss'
import { msg } from '../../constant/type';
import '../../assets/font/iconfont.css'

type props = {
  children: React.ReactNode,
  msg: msg,
}

export default function ISay(props: props) {

  const { children, msg } = props; 
  const { color, fromUserName, icon } = msg;

  return (
    <div className='Say ISay'>
        <div className="bubble" style={{'--bubble-background': color || 'white'} as React.CSSProperties}>{children}</div>
        <div className={`iconfont ${icon} avatar`}  style={{backgroundColor: color || 'black'}}/>
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
