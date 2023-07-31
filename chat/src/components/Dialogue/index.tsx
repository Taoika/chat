import './index.scss'
import OtherSay from '../OtherSay'
import ISay from '../ISay'
import useWebSocket from 'react-use-websocket';
import { wsBaseUrl } from '../../constant';

const WS_URL = 'ws://39.98.41.126:31121/ws/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzMSJdLCJ1c2VyX25hbWUiOiJ7XCJhZ2VcIjoxOCxcImdlbmRlclwiOlwi55S3XCIsXCJpc0RlbGV0ZWRcIjowLFwibGFzdElwXCI6XCIxOTIuMTY4LjE5NS4xXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJHYwd1Fwc1JvcUxyb3VMWnZvdjAyc2VaQzB0M3BJVDd0Mkc0RVk3YkNuUlZkMTJ2aEwva3IuXCIsXCJwaG9uZVwiOlwiMTMyNDI1OTcwODJcIixcInVzZXJJZFwiOjEsXCJ1c2VybmFtZVwiOlwic3VwZXJBZG1pblwifSIsInNjb3BlIjpbIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiLCJST0xFX0FQSSJdLCJleHAiOjE2OTA5NTcwNTYsImF1dGhvcml0aWVzIjpbIio6KjoqIl0sImp0aSI6ImFlNDY4MzVjLWEzOTYtNDUzNi04MWIwLWRmZDE4MDE0ZjlhYiIsImNsaWVudF9pZCI6ImMxIn0.axl11suQb0_k-jyl7prI5G1lZfeE0bpR6zr9PJ07T1I';

type props = {
  wordInput: string;
}
export default function Dialogue(props: props) {

  const { wordInput } = props;

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    }
  });

  return (
    <div className='Dialogue'>
      <OtherSay/><ISay>{wordInput}</ISay>
    </div>
  )
}
