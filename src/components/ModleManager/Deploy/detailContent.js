import React from 'react';
import {Table, Button, Icon, Upload} from 'antd';
import {openNotification, props as importFiles} from "./importFiles";
import { EditPage, DeleteBtn } from "./operateBtn";
import './index.less';

const columns = [
  { title: '模型名称', dataIndex: 'address', key: '1' },
  { title: '模型编码', dataIndex: 'address', key: '2' },
  { title: '行业分类', dataIndex: 'address', key: '3' },
  { title: '模型类型', dataIndex: 'address', key: '4' },
  { title: '模型状态', dataIndex: 'address', key: '5' },
  { title: '模型描述', dataIndex: 'address', key: '6' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 300,
    render: () => (
      <div className="operateBox">
        {/*测试*/}
        <Upload {...importFiles} span={3} push={3}>
          <Button size="small" onClick={openNotification}>测试</Button>
        </Upload>
        {/*编辑*/}
        <EditPage />
        <Button size="small" disabled>提交</Button>
        <Button size="small" disabled>导出</Button>
        {/*删除*/}
        <DeleteBtn></DeleteBtn>
      </div>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];

export { columns, data };
