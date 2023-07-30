import './index.scss'
import avatar from '../../assets/images/avatar.jpg'

export default function LeftSidebar() {
  return (
    <div className='LeftSidebar'>
      <div className="avatar"><img src={avatar} alt="这是你卡瓦的头像"/></div>
    </div>
  )
}
