import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

// 信息提示
export const notice = (msg: string) => {
  const openNotification = (placement: NotificationPlacement, msg: string) => {
    notification.info({
      message: msg,
      placement,

      style: {
        width: 300,
      },

    });
  };
  
  openNotification('topLeft', msg);
};
