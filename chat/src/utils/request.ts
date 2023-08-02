import axios from "axios";

/**
 * 
 * @param url 请求地址 必需
 * @param data 数据 必需
 * @param config 配置 必需
 * @param errorFun 全局错误提示函数
 * @param errMsg 错误提示信息
 * @returns 
 */
export const reqPost = (url: string, data: any, config: any, errorFun?: Function, errMsg?: string) => {
    return new Promise<any>((resolve)=>{
      axios.post(url, data, config).then(
        res=>{
            if(res.data.code === 200){
                resolve(res.data.data)
            }
            else {
                errorFun ? errorFun(res.data.msg) : ''
                console.log('请求出错->', errMsg);
            }
        },
        err=>{
            console.log('err->', err);
            errorFun ? errorFun(errMsg) : ''
        }
      )
    })
  };