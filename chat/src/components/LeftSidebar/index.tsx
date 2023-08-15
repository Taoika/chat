import './index.scss'
import { useAppSelector } from "../../store/hook";
import Avatar from '../Avatar';

export default function LeftSidebar() {

  const { color, icon } = useAppSelector((state) => state.userInfo)

  return (
    <div className='LeftSidebar'>
      <Avatar icon={icon} color={color} type='circle' size='big'/>
    </div>
  )
}
