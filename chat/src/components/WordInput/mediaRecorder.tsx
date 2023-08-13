import { useRef, useContext } from "react";
import { reqPost } from "../../utils/request";
import { fileUploadUrl } from "../../constant/constant";
import { useAppSelector } from "../../store/hook";
import { AppContext } from '../../App';
import { input } from '../../constant/type'

// 录音
const useMediaRecorder = (
    setRecording: React.Dispatch<React.SetStateAction<boolean>>, // 录音状态
    setWordInput: React.Dispatch<React.SetStateAction<input | null>> // 输入状态
    ) => {

    const { token } = useAppSelector((state) => state.userInfo)

    const { error } = useContext(AppContext)!
    const stream = useRef<MediaStream>();
    const recorder = useRef<MediaRecorder>();
    const mediaBlobs = useRef<Blob[]>([]);

    const startRecord = async() => { // 语音输入开始
        let startTime = 0;
        setRecording(true);

        mediaBlobs.current = [];
        stream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); // 获取音频流
        
        recorder.current = new MediaRecorder(stream.current); // 媒体录制器

        recorder.current.onstart = () => { // 录制开始监听
            startTime = Date.now();
        }

        recorder.current.ondataavailable = (blobEvent) => { // 数据变化监听
            mediaBlobs.current.push(blobEvent.data);
        }

        recorder.current.onstop = () => { // 停止录音监听
            const duration = (Date.now() - startTime) / 1000;

            const blob = new Blob(mediaBlobs.current, { type: 'audio/wav' })
            
            const formData = new FormData();
            formData.append('file', blob);
            
            const config = { // 请求配置
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data', 
                }
            }
            reqPost(fileUploadUrl, formData, config, error, '语音上传失败').then( // 上传到服务器
                res => {
                    setWordInput({
                        data: {
                            content: res,
                            duration,
                        },
                        messageContentType: 10
                    });
                }
            )
        }
        
        recorder.current?.start(); // 开始录音
    }

    const stopRecord = async() => { // 语音输入结束
        setRecording(false);
        recorder.current?.stop()
        stream.current?.getTracks().forEach((track) => track.stop());
    }

    return { startRecord, stopRecord }
} 

export default useMediaRecorder;