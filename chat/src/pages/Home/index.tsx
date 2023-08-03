import './index.scss'
import LeftSidebar from '../../components/LeftSidebar'
import Dialogue from '../../components/Dialogue'
import WordInput from '../../components/WordInput'
import OnlineUsers from '../../components/OnlineUsers'
import SocketService from '../../components/SocketService'

export default function Home() {

  return (
    <div className='Home'>
        <SocketService/>
        <LeftSidebar/> 
        <div className="rightChat">
          <Dialogue/>
          <WordInput/>
        </div>
        <OnlineUsers/>
    </div>
  )
}
