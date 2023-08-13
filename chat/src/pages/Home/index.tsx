import './index.scss'
import LeftSidebar from '../../components/LeftSidebar'
import Dialogue from '../../components/Dialogue'
import WordInput from '../../components/WordInput'
import OnlineUsers from '../../components/OnlineUsers'
import useSocketService from './socketService'

export default function Home() {

  useSocketService();

  return (
    <div className='Home'>
        <LeftSidebar/> 
        <div className="rightChat">
          <Dialogue/>
          <WordInput/>
        </div>
        <OnlineUsers/>
    </div>
  )
}
