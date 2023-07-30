import { useState } from 'react'
import './index.scss'
import LeftSidebar from '../../components/LeftSidebar'
import Dialogue from '../../components/Dialogue'
import WordInput from '../../components/WordInput'

export default function Home() {

  const [wordInput, setWordInput] = useState('');

  return (
    <div className='Home'>
        <LeftSidebar/> 
        <div className="rightChat">
          <Dialogue/>
          <WordInput/>
        </div>
    </div>
  )
}
