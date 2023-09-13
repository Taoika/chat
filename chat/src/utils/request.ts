import axios from "axios";
import { getTokenUrl} from "../constant/constant";

/**
 * post请求
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
                errorFun ? errorFun(errMsg) : ''
                console.log('请求出错->', res.data.msg);
            }
        },
        err=>{
            console.log('err->', err);
            errorFun ? errorFun(errMsg) : ''
        }
      )
    })
};

/**
 * get请求
 * @param url 请求地址
 * @param config 配置
 * @param errorFun 错误提示函数
 * @param errMsg 错误提示信息
 * @returns data的Promise
 */
export const reqGet = (url: string, token: string, errorFun?: Function, errMsg?: string) => {
  return new Promise<any>((resolve)=>{
    const config = { // 请求配置
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios.get(url, config).then(
      res=>{
        if(res.data.code === 200){
          resolve(res.data.data)
        }
        else {
            errorFun ? errorFun(errMsg) : ''
            console.log('请求出错->', res.data.msg);
        }
      },
      err=>{
        console.log('err->', err);
        errorFun ? errorFun(errMsg) : ''
      }
    )
  })
}

/**
 * token获取
 * @param name 用户名
 * @param color 用户主题色
 * @param icon 用户头像
 * @param errorFun 错误处理
 * @returns userInfo 用户信息
 */
export const reqGetToken = (name: string, color: string, icon: string, errorFun?: Function) => {
  return new Promise<any>(resolve=>{

    const formData= new FormData();
    formData.append('client_secret', 'secret');
    formData.append('client_id', 'c1');
    formData.append('grant_type', 'password');
    formData.append('username', `${name};${color};${icon}`);
    formData.append('password', '123456');
    const config = { // 请求配置
      headers: {
        'Content-Type': 'multipart/form-data', 
      }
    }
  
    reqPost(getTokenUrl, formData, config, errorFun, 'token获取失败!').then(
      res => {
        const token = res.token
        const userId = res.userId;
        const userInfo = { token, userId, color, name, icon };
        resolve(userInfo);
      }
    )
  })
}