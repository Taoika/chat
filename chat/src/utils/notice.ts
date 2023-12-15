import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

export const notice = (msg: string) => {
  const openNotification = (placement: NotificationPlacement, msg: string) => {
    notification.info({
      message: msg,
      placement,

      style: {
        width: 300,
        // backgroundColor: "#333", // 设置背景颜色
         // 设置字体颜色
        // 在这里添加其他样式属性
      },

    });
  };
  
  openNotification('topLeft', msg);
};
