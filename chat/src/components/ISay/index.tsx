import './index.scss'
import { msg } from '../../constant/type';
import AudioPlayer from '../AudioPlayer';
import '../../assets/font/iconfont.css'


type props = {
  msg: msg,
}

export default function ISay(props: props) {

  const { msg } = props; 
  const { color, fromUserName, icon, messageContentType, data } = msg;
  const { content } = data;

  return (
    <div className='Say ISay' style={{'--bubble-background':color || 'black'} as React.CSSProperties}>
        {
          messageContentType === 8 ? <div className="bubble">{content}</div> : 
          messageContentType === 10 ? <AudioPlayer msg={msg}/> : ''
        }
        <div className={`iconfont ${icon} avatar`}/>
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
