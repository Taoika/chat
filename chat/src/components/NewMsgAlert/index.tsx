import { DownOutlined } from '@ant-design/icons'
import './index.scss'

type props = {
    onClick: () => void,
    display: boolean,
    number: number
}

export default function NewMsgAlert(props: props) {

    const { onClick, display, number } = props;

  return (
    <div className={`NewMsgAlert ${display ? '': 'hidden'}`} onClick={onClick}>
        新信息<DownOutlined />{`${number?number:''}`}
    </div>
  )
}
