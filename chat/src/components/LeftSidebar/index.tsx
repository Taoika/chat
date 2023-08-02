import { useContext } from 'react'
import './index.scss'
import { AppContext } from '../../App'

export default function LeftSidebar() {
  
  const { userInfo } = useContext(AppContext)!
  const { icon, color } = userInfo;

  return (
    <div className='LeftSidebar'>
      <div className={`iconfont ${icon} avatar`}  style={{backgroundColor: color || 'black'}}/>
    </div>
  )
}
