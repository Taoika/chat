
import './index.scss'
import { msg } from '../../constant/type';
import AudioPlayer from '../AudioPlayer';

type props = {
  msg: msg,
}

export default function OtherSay(props: props) {

  const { msg } = props;
  const { color, fromUserName, icon, messageContentType, data } = msg;
  const { content } = data;  

  return (
    <div className='Say OtherSay' style={{'--bubble-background':color || 'black'} as React.CSSProperties} >
        <div className={`iconfont ${icon} avatar`}/>
        {
          messageContentType === 8 ? <div className="bubble">{content}</div> : 
          messageContentType === 10 ? <AudioPlayer msg={msg}/> : ''
        } 
        
        <div className="userName">{fromUserName}</div>
    </div>
  )
}
