import './index.scss'
import { useAppSelector } from "../../store/hook";

export default function LeftSidebar() {

  const { color, icon } = useAppSelector((state) => state.userInfo)

  return (
    <div className='LeftSidebar'>
      <div className={`iconfont ${icon} avatar`}  style={{backgroundColor: color || 'black'}}/>
    </div>
  )
}
