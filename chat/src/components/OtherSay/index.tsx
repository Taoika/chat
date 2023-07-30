import './index.scss'
import avatar from '../../assets/images/avatar.jpg'

export default function OtherSay() {
  return (
    <div className='OtherSay Say'>
        <div className="avatar"><img src={avatar} alt="这是你很卡瓦但是没加载出来的头像" /></div>
        <div className="bubble">这是一段可以很长可以很短的话这是一段可以很长可以很短的话</div>
        <div className="userName">KKKKKKKKKKKKKKKT</div>
    </div>
  )
}
