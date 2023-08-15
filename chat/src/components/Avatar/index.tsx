import { useRef } from 'react';
import './index.scss'

type props = {
    icon: string,
    color: string,
    type: 'circle' | 'square',
    size: 'big' | 'normal' | 'small',
}

export default function Avatar(props: props) {
    const { icon, color, type } = props;
    const avatarRef = useRef<HTMLDivElement>(null)
    
    if(avatarRef.current){
        const style = avatarRef.current.style
        style.backgroundColor = color || 'black'
        switch(type){
            case 'circle':
                
                break;
            case 'square':
                style.borderRadius = '0'
                break;
        }
    }
    
  return (
    <div className="Avatar">
        <div className={`iconfont ${icon} avatar`} ref={avatarRef}/>
    </div>
  )
}
