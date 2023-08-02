import './index.scss'
import { msg } from '../../constant/type';

type props = {
  children: React.ReactNode,
  msg: msg,
}

export default function OtherSay(props: props) {

  const {children, msg} = props;
  const {color, fromUserName, icon} = msg;

  return (
    <div className='Say OtherSay'>
        <div className={`iconfont ${icon} avatar`}  style={{backgroundColor: color || 'black'}}/>
        <div className="bubble" style={{'--bubble-background':color || 'green'} as React.CSSProperties}>{children}</div>
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
