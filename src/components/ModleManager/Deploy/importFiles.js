import React from 'react';
import { message, notification } from 'antd';

const openNotification = () => {
  notification.open({
    message: '导入模型提示',
    description:
      '仅支持上传.zip文件，且大小不能超过5Mb。',
    style: {
      width: 600,
      marginTop: 335 - 600,
    },
  });
};



const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
};

export { openNotification, props };
