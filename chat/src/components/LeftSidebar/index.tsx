import { Badge } from 'antd';
import './index.scss'
import { useAppSelector } from "../../store/hook";
import Avatar from '../Avatar';

export default function LeftSidebar() {

  const { color, icon } = useAppSelector((state) => state.userInfo)

  const toActer = () => {
    console.log('toActer');
  }

  return (
    <Badge.Ribbon text="@" className='LeftSidebar_hippies' color={color}>
        <div className='LeftSidebar'>
          <Avatar icon={icon} color={color} type='circle' size='big'/>
        </div>
        <div 
          className="LeftSidebar_badge_click ant-ribbon ant-ribbon-placement-end css-dev-only-do-not-override-txh9fw"
          style={{backgroundColor: 'rgb(136, 133, 160)'}}
          onClick={toActer}
        >
          @
        </div>
    </Badge.Ribbon>
  )
}
