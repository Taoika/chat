import { useRef, useState, useEffect } from 'react';
import { Space } from 'antd';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons'
import './index.scss'
import { msg } from '../../constant/type';
import { darkenRgb } from '../../utils/stringChange';

type props = {
    msg: msg
}

export default function AudioPlayer(props: props) {

    const { data, color } = props.msg!
    const { duration, content } = data;
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [curTime, setCurTime] = useState(0);
    const moveFlag = useRef(0);
    const factor = 8; // 秒数转化为px长度的乘数因子

    const changeProgressStyle = (progress: HTMLDivElement, progressNum: number) => { // 进度条样式变化
        if(progressNum != 0){
            progress.style.backgroundImage = `linear-gradient(90deg, var(--progress-color) ${progressNum}%, #fff ${progressNum}%)`
        }
        else { // 一点渐变效果
            progress.style.backgroundImage = `linear-gradient(90deg, var(--progress-color) ${progressNum}%, #fff ${1-progressNum}%)`
        }
    }

    const handleTimeUpdate = (audio: HTMLAudioElement, progress: HTMLDivElement) => { // 音频变动
        if(!duration) return ;
        const progressNum = 100 * audio.currentTime / duration;
        changeProgressStyle(progress, progressNum);
        setCurTime(audio.currentTime);
    }

    const handleEnded = (progress: HTMLDivElement) => { // 播放结束
        changeProgressStyle(progress, 0);
        setPlaying(false);
        setCurTime(0);
    }

    const changeProgress = (event: MouseEvent, progress: HTMLDivElement, audio: HTMLAudioElement) => { // 进度改变
        if(!duration) return ;
        const totalLength = duration * factor > 80 ? duration * factor - 34 : 80 - 34; // 减去的是bubble的内边距跟边框
        const progressNum = 100 * event.offsetX / totalLength; // event.offsetX就是鼠标跟进度条左边的距离
        changeProgressStyle(progress, progressNum);
        audio.currentTime = duration * progressNum / 100;
    }
 
    const handleMouseDown = (event: MouseEvent, progress: HTMLDivElement, audio: HTMLAudioElement) => { // 进度条点击
        moveFlag.current = 1;
        changeProgress(event, progress, audio);
    }

    const handleMouseMove = (event: MouseEvent, progress: HTMLDivElement, audio: HTMLAudioElement) => { // 进度条拖动
        if(!moveFlag.current) return ;
        changeProgress(event, progress, audio);
    }

    const handleMoveCancel = () => { // 拖动失效
        moveFlag.current = 0;
    }

    const handlePlay = () => { // 播放处理
        if(!audioRef || !audioRef.current || !progressRef.current) return ;
        const audios = document.querySelectorAll('audio');
        const progresses = document.querySelectorAll('.progress');
        audios.forEach((value, index)=>{
            handleStop(value, progresses[index] as HTMLDivElement);
        })
        const audio = audioRef.current;
        const progress = progressRef.current;
        audio.play();
        setPlaying(true);
        audio.ontimeupdate = () => handleTimeUpdate(audio, progress)
        audio.onended = () => handleEnded(progress);
        progress.onmousedown = (event) => handleMouseDown(event, progress, audio)
        progress.onmousemove = (event) => handleMouseMove(event, progress, audio)
        window.onmouseup = handleMoveCancel
    }

    const handleStop = (audio: HTMLAudioElement | null, progress: HTMLDivElement | null) => { // 停止处理
        if(!audio || !progress) return ;
        audio.pause();
        setPlaying(false);
    }

    useEffect(()=>{ // 设置进度条颜色
        if(!color || !progressRef.current) return ;
        const newColor = darkenRgb(color, [20, 20, 20]);        
        progressRef.current.style.setProperty('--progress-color', `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`);
    },[color]);

    useEffect(()=>{ // 监听音频播放暂停 目的是在保证在音频停下的时候 图标能对应上
        if(!audioRef.current) return ;
        if(audioRef.current.paused === true){
            setPlaying(false);
        }
    },[audioRef.current?.paused])

  return (
    <div className="bubble AudioPlayer" style={{width: `${duration ? duration*factor : '80'}px`}}>
        <Space>
            {
                playing ? 
                    <PauseOutlined className='icon' onClick={()=>handleStop(audioRef.current, progressRef.current)}/> : 
                    <CaretRightOutlined classID='icon' onClick={handlePlay}/>
            }
            {`${Math.ceil(duration ? duration - curTime : 0)}s`}
        </Space>
        <div className="progress" ref={progressRef}></div>
        <audio src={content} ref={audioRef}/>
    </div>
  )
}
