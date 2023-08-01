import './index.scss'
import avatar from '../../assets/images/avatar.jpg'

type props = {
  children: React.ReactNode,
  ip: string,
}

export default function ISay(props: props) {
  const { children, ip } = props; 

  return (
    <div className='ISay Say'>
        <div className="bubble">{children}</div>
        <div className="avatar"><img src={avatar} alt="这是你很卡瓦但是没加载出来的头像" /></div>
        <div className="userName">{ip}</div>
    </div>
  )
}
